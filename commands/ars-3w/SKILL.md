---
name: ars-3w
description: "ARS deep-research `three-way-scan` mode — WHY / HOW / WHAT paper comparison"
disable-model-invocation: true
user-invocable: true
---

The user invoked `/ars-3w` (port of the Claude Code slash command). First call the `skill` tool with name `deep-research` to load that skill (unless it is already loaded in this session), then execute the mode it specifies:

Trigger the `deep-research` skill in `three-way-scan` mode. Produces a compact paper shortlist compared by WHY / HOW / WHAT plus a cross-paper synthesis (common WHY, divergent HOW, strongest WHAT, unresolved gap). Lighter than `lit-review`; escalate to `lit-review` / `systematic-review` for full coverage. Fidelity spectrum, low oversight.

Mode reference: `MODE_REGISTRY.md` § deep-research.
Skill entry: `deep-research/SKILL.md`.

If the skill or a required file cannot be loaded, report the loading failure and stop; do not substitute this command summary for the mode instructions.

Note: this command was ported from the ARS Claude Code plugin (Imbad0202/academic-research-skills, CC-BY-NC-4.0). The deterministic tooling it references (scripts/*.py, MODE_REGISTRY.md, shared/) ships in the upstream repo — clone it alongside this plugin if you need script-based features such as the citation verification gate.
