---
name: ars-outline
description: "ARS academic-paper `outline-only` mode — detailed outline + evidence map"
disable-model-invocation: true
user-invocable: true
---

The user invoked `/ars-outline` (port of the Claude Code slash command). First call the `skill` tool with name `academic-paper` to load that skill (unless it is already loaded in this session), then execute the mode it specifies:

Trigger the `academic-paper` skill in `outline-only` mode. Produces a detailed paper outline with evidence map, no full draft. Balanced spectrum, high oversight.

Mode reference: `MODE_REGISTRY.md` § academic-paper.
Skill entry: `academic-paper/SKILL.md`.

If the skill or a required file cannot be loaded, report the loading failure and stop; do not substitute this command summary for the mode instructions.

Note: this command was ported from the ARS Claude Code plugin (Imbad0202/academic-research-skills, CC-BY-NC-4.0). The deterministic tooling it references (scripts/*.py, MODE_REGISTRY.md, shared/) ships in the upstream repo — clone it alongside this plugin if you need script-based features such as the citation verification gate.
