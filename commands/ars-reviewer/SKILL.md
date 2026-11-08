---
name: ars-reviewer
description: "ARS academic-paper-reviewer `full` mode — simulated peer-review panel"
disable-model-invocation: true
user-invocable: true
---

The user invoked `/ars-reviewer` (port of the Claude Code slash command). First call the `skill` tool with name `academic-paper-reviewer` to load that skill (unless it is already loaded in this session), then execute the mode it specifies:

Trigger the `academic-paper-reviewer` skill in `full` mode. Honor explicit alternate modes when present: `quick`, `methodology-focus`, `re-review`, `guided`, or `calibration`. Runs on the inherited session model — the v3.7.0 `opus` frontmatter floor was retired in the 2026-06 harness pass so a stronger session model is never silently downgraded.

Mode reference: `MODE_REGISTRY.md` § academic-paper-reviewer.
Skill entry: `academic-paper-reviewer/SKILL.md`.

If the skill or a required file cannot be loaded, report the loading failure and stop; do not substitute this command summary for the mode instructions.

Note: this command was ported from the ARS Claude Code plugin (Imbad0202/academic-research-skills, CC-BY-NC-4.0). The deterministic tooling it references (scripts/*.py, MODE_REGISTRY.md, shared/) ships in the upstream repo — clone it alongside this plugin if you need script-based features such as the citation verification gate.
