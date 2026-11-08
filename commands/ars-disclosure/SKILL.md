---
name: ars-disclosure
description: "ARS academic-paper `disclosure` mode — venue applicability/status bundle or policy-anchor render"
disable-model-invocation: true
user-invocable: true
---

The user invoked `/ars-disclosure` (port of the Claude Code slash command). First call the `skill` tool with name `academic-paper` to load that skill (unless it is already loaded in this session), then execute the mode it specifies:

Trigger the `academic-paper` skill in standalone `disclosure` mode. Agent 9 must load `academic-paper/references/disclosure_mode_protocol.md` before rendering; the generic formatter disclosure is not a fallback. The default venue path returns `REQUIRED`, `ACTION_ONLY`, `NOT_REQUIRED`, or `UNKNOWN` applicability plus an explicit typed halt status when needed (15 policy targets supported: ICLR / NeurIPS / Nature / Science / ACL / EMNLP plus medical-publishing targets — ICMJE / NEJM / The Lancet / JAMA / BMJ / PLOS / Frontiers / publisher-wide 中华护理杂志社 / journal-level 国际眼科杂志). The `--policy-anchor` path uses its separate anchor-specific renderer. Fidelity spectrum, low oversight.

Mode reference: `MODE_REGISTRY.md` § academic-paper.
Skill entry: `academic-paper/SKILL.md`.

If the skill or a required file cannot be loaded, report the loading failure and stop; do not substitute this command summary for the mode instructions.

Note: this command was ported from the ARS Claude Code plugin (Imbad0202/academic-research-skills, CC-BY-NC-4.0). The deterministic tooling it references (scripts/*.py, MODE_REGISTRY.md, shared/) ships in the upstream repo — clone it alongside this plugin if you need script-based features such as the citation verification gate.
