---
name: ars-lit-review
description: "ARS academic-paper `lit-review` mode — annotated bibliography in paper format"
disable-model-invocation: true
user-invocable: true
---

The user invoked `/ars-lit-review` (port of the Claude Code slash command). First call the `skill` tool with name `academic-paper` to load that skill (unless it is already loaded in this session), then execute the mode it specifies:

Trigger the `academic-paper` skill in `lit-review` mode. Produces an annotated bibliography rendered as a literature review section. Fidelity spectrum, medium oversight.

Stay in `academic-paper` `lit-review` mode and do not reopen the choice of workflow: if the papers or sources the request refers to are missing, ask the user for them or offer to search for them within this mode.

The skill's review-form note (#921) belongs to this mode and does not reopen that choice: show it and wait when the skill says to, and continue in `lit-review` mode if the author skips it.

Mode reference: `MODE_REGISTRY.md` § academic-paper.
Skill entry: `academic-paper/SKILL.md`.

If the skill or a required file cannot be loaded, report the loading failure and stop; do not substitute this command summary for the mode instructions.

Note: this command was ported from the ARS Claude Code plugin (Imbad0202/academic-research-skills, CC-BY-NC-4.0). The deterministic tooling it references (scripts/*.py, MODE_REGISTRY.md, shared/) ships in the upstream repo — clone it alongside this plugin if you need script-based features such as the citation verification gate.
