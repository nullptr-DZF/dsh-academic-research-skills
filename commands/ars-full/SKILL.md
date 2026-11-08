---
name: ars-full
description: "ARS full pipeline — research → write → review → revise → finalize"
disable-model-invocation: true
user-invocable: true
---

The user invoked `/ars-full` (port of the Claude Code slash command). First call the `skill` tool with name `academic-pipeline` to load that skill (unless it is already loaded in this session), then execute the mode it specifies:

Trigger the `academic-pipeline` orchestrator (`(pipeline)` in `MODE_REGISTRY.md` — the orchestrator has no named mode of its own). Loads the skill and executes the complete academic research workflow (10-stage orchestration: deep-research → academic-paper → integrity → academic-paper-reviewer → revision → re-review → final integrity → finalize).

Mode reference: `MODE_REGISTRY.md` § academic-pipeline.
Skill entry: `academic-pipeline/SKILL.md`.

If the skill or a required file cannot be loaded, report the loading failure and stop; do not substitute this command summary for the mode instructions.

Note: this command was ported from the ARS Claude Code plugin (Imbad0202/academic-research-skills, CC-BY-NC-4.0). The deterministic tooling it references (scripts/*.py, MODE_REGISTRY.md, shared/) ships in the upstream repo — clone it alongside this plugin if you need script-based features such as the citation verification gate.
