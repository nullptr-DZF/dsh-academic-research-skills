#!/usr/bin/env node
// Regenerate the 16 user-invocable command wrappers in ./commands from an
// upstream Academic Research Skills checkout.
//
// Usage:
//   node scripts/regenerate-commands.mjs <upstream-repo-path>
//
// Each wrapper is a DSH skill (name = upstream command name) marked
// `disable-model-invocation: true` + `user-invocable: true`, so it fires only
// when the user types /ars-<name>.
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const upstream = resolve(process.argv[2] ?? '');
if (!upstream) {
  console.error('usage: node scripts/regenerate-commands.mjs <upstream-repo-path>');
  process.exit(1);
}

// Tiny YAML-subset frontmatter read: our wrapper source files use
// single-line quoted `name` / `description`.
function readFrontmatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
  if (!match) return null;
  const fields = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line || /^\s/.test(line) || line.trim().startsWith('#')) continue;
    const idx = line.indexOf(':');
    if (idx <= 0) continue;
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    fields[line.slice(0, idx).trim()] = value;
  }
  return fields;
}

// Upstream command bodies target the Claude Code plugin runtime: they tell the
// agent to call the Skill tool and to resolve plugin files from
// ${CLAUDE_PLUGIN_ROOT}. DSH has neither, and the wrapper header below already
// names the skill to load — so drop those Claude-specific instructions and
// leave the remaining paths relative (the footer points at the upstream repo).
function sanitizeBody(body) {
  return body
    .replace(/^First invoke the Skill tool with `skill: "[^"]+"`.*\n?/m, '')
    .replace(
      /^Resolve plugin resources from `\$\{CLAUDE_PLUGIN_ROOT\}`, not from the paper project's working directory\. /m,
      ''
    )
    .replace(/\$\{CLAUDE_PLUGIN_ROOT\}\//g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const sourceDir = join(upstream, 'commands');
const outputRoot = fileURLToPath(new URL('../commands/', import.meta.url));
mkdirSync(outputRoot, { recursive: true });

const files = readdirSync(sourceDir).filter((f) => /^ars-.*\.md$/.test(f)).sort();
let count = 0;
for (const file of files) {
  const raw = readFileSync(join(sourceDir, file), 'utf8');
  const fm = readFrontmatter(raw);
  if (!fm?.name) {
    console.warn(`skip (no frontmatter): ${file}`);
    continue;
  }
  const name = fm.name;
  const description = fm.description ?? '';
  let body = sanitizeBody(raw.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').trim());
  const trigger = body.match(/Trigger the `([a-z0-9-]+)`/);
  if (trigger) {
    body =
      `The user invoked \`/${name}\` (port of the Claude Code slash command). ` +
      `First call the \`skill\` tool with name \`${trigger[1]}\` to load that skill ` +
      '(unless it is already loaded in this session), then execute the mode it specifies:\n\n' +
      body;
  }
  const content =
    `---\nname: ${name}\ndescription: ${JSON.stringify(description)}\n` +
    `disable-model-invocation: true\nuser-invocable: true\n---\n\n${body}\n\n` +
    'Note: this command was ported from the ARS Claude Code plugin ' +
    '(Imbad0202/academic-research-skills, CC-BY-NC-4.0). The deterministic ' +
    'tooling it references (scripts/*.py, MODE_REGISTRY.md, shared/) ships in ' +
    'the upstream repo — clone it alongside this plugin if you need script-based ' +
    'features such as the citation verification gate.\n';
  mkdirSync(join(outputRoot, name), { recursive: true });
  writeFileSync(join(outputRoot, name, 'SKILL.md'), content, 'utf8');
  count += 1;
  console.log(`wrapper: ${name}`);
}
console.log(`regenerated ${count} wrappers into ${outputRoot}`);
