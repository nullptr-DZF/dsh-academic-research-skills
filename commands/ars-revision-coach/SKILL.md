---
name: ars-revision-coach
description: "ARS academic-paper `revision-coach` — peer-review roadmap or source-accounted real-committee response skeleton"
disable-model-invocation: true
user-invocable: true
---

The user invoked `/ars-revision-coach` (port of the Claude Code slash command). First call the `skill` tool with name `academic-paper` to load that skill (unless it is already loaded in this session), then execute the mode it specifies:

Trigger the `academic-paper` skill in `revision-coach` mode. Ordinary reviewer comments produce a Revision Roadmap plus Response Letter skeleton without writing the revision. If and only if the user explicitly identifies a real committee or institutional review office, use the #668 committee-correspondence variant: preserve the UTF-8 source, emit the separate concern tracker and placeholder response skeleton, and run its deterministic completeness checker. Never infer committee authority from tone, and never emit priority, severity, determination, or Schema 11 on that branch. Runs on the inherited session model — the v3.7.0 `opus` frontmatter floor was retired in the 2026-06 harness pass so a stronger session model is never silently downgraded.

Mode reference: `MODE_REGISTRY.md` § academic-paper.
Skill entry: `academic-paper/SKILL.md`.

If the skill or a required file cannot be loaded, report the loading failure and stop; do not substitute this command summary for the mode instructions.

Note: this command was ported from the ARS Claude Code plugin (Imbad0202/academic-research-skills, CC-BY-NC-4.0). The deterministic tooling it references (scripts/*.py, MODE_REGISTRY.md, shared/) ships in the upstream repo — clone it alongside this plugin if you need script-based features such as the citation verification gate.
