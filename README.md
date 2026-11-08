# dsh-academic-research-skills

[English](#english) · [中文](#中文)

DeepSeek Harness（DSH）插件：把 Claude Code 的
[Academic Research Skills (ARS)](https://github.com/Imbad0202/academic-research-skills)
（v3.24.2，CC-BY-NC-4.0）移植为 DSH 技能。

安装后自动获得：

- **5 个模型可调用技能**：`deep-research`（13-agent 调研团队，8 种模式）、
  `academic-paper`（12-agent 论文写作，11 种模式）、`academic-paper-reviewer`
  （5 席位同行评审面板）、`academic-pipeline`（10 阶段全流水线编排）、
  `sr-screener`（协议驱动的系统综述记录筛选，8 种模式）
- **16 个用户可调用命令**：`/ars-full`、`/ars-plan`、`/ars-reviewer`、
  `/ars-lit-review`、`/ars-abstract`、`/ars-revision`、`/ars-outline`、
  `/ars-citation-check`、`/ars-disclosure`、`/ars-format-convert`、
  `/ars-rebuttal-audit`、`/ars-revision-coach`、`/ars-cache-invalidate`、
  `/ars-mark-read`、`/ars-unmark-read`、`/ars-3w`

> **署名 / Attribution**：本项目为 ARS 的 DSH 移植，技能内容与命令衍生自
> Cheng-I Wu（[Imbad0202](https://github.com/Imbad0202)）的
> [academic-research-skills](https://github.com/Imbad0202/academic-research-skills)，
> 全部内容（含移植层）遵循 **CC-BY-NC-4.0**（非商业用途），详见
> [NOTICE.md](NOTICE.md) 与 [LICENSE](LICENSE)。

## 安装

要求：DeepSeek Harness（`dsh`）0.1.x，pnpm 可用。

```bash
# 方式一：GitHub 仓库（公开后可用）
dsh plugin --profile web add github:nullptr-DZF/dsh-academic-research-skills

# 方式二：本地路径（开发调试）
dsh plugin --profile web add <本仓库绝对路径>

# 重启 dsh web 后生效（技能目录会自动出现）
```

安装后 `dsh.profile.bundles` 会追加 `dsh-academic-research-skills`，启动时
`lib/startup.js` 把 21 个技能注册进 `ctx.skills`。

## 使用

| 用法 | 操作 |
| --- | --- |
| 模型自动路由 | 直接说“做学术研究 / 文献综述 / 帮我审稿 / 写论文”等（技能描述带触发词） |
| 技能注入 | 输入 `/deep-research`、`/academic-pipeline` 等技能名 |
| 斜杠命令 | 输入 `/ars-full`（全流程）、`/ars-reviewer`（审稿）、`/ars-plan`（规划）等 |

## 与上游的差异

- **hooks 不移植**：上游 `hooks/hooks.json`（写保护 guard、SessionStart 播报）
  是 Claude Code 专属；DSH 无 hook 系统，写保护由 DSH 自身文件沙箱承担。
- **确定性脚本与共享材料**：引用核验 gate 等 `scripts/*.py` 与 `shared/`
  参考资料不在本包内（`sr-screener` 自带的纯标准库筛选脚本随技能包分发）；
  需要时 clone 上游仓库并按 README 安装 Python 依赖（`pypdf` 等）。
- **子代理**：上游 43 个提示角色默认内联运行；4 个插件级 agent 文件随技能包
  分发，需要时可把其内容作为 `subagent` 工具的 prompt 使用。
- **命令包装为 DSH 适配版**：由上游 `commands/ars-*.md` 再生成并去掉 Claude
  Code 专属的 `Skill` 工具调用与 `${CLAUDE_PLUGIN_ROOT}` 路径，产物可直接在
  DSH 中执行（见下节）。

## 重新生成命令包装

`commands/` 由上游 `commands/ars-*.md` 转换而来（加入
`disable-model-invocation: true` + `user-invocable: true`）：

```bash
node scripts/regenerate-commands.mjs <上游仓库路径>
```

再生成时会自动去掉 Claude Code 专属的 `Skill` 工具调用和
`${CLAUDE_PLUGIN_ROOT}` 路径。

---

<a name="english"></a>

# English

A [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) plugin
port of Claude Code's
[Academic Research Skills (ARS)](https://github.com/Imbad0202/academic-research-skills)
(v3.24.2, CC-BY-NC-4.0).

Provides, out of the box:

- **5 model-invocable skills**: `deep-research`, `academic-paper`,
  `academic-paper-reviewer`, `academic-pipeline`, `sr-screener`
- **16 user-invocable commands**: `/ars-full`, `/ars-plan`, `/ars-reviewer`,
  `/ars-lit-review`, `/ars-abstract`, `/ars-revision`, `/ars-outline`,
  `/ars-citation-check`, `/ars-disclosure`, `/ars-format-convert`,
  `/ars-rebuttal-audit`, `/ars-revision-coach`, `/ars-cache-invalidate`,
  `/ars-mark-read`, `/ars-unmark-read`, `/ars-3w`

> **Attribution**: this is a DSH port of ARS; skill content and commands are
> derived from Cheng-I Wu's
> [academic-research-skills](https://github.com/Imbad0202/academic-research-skills).
> Everything in this repo (including the porting layer) is licensed
> **CC-BY-NC-4.0** — non-commercial use only. See [NOTICE.md](NOTICE.md) and
> [LICENSE](LICENSE).

## Install

Requires DeepSeek Harness 0.1.x and pnpm.

```bash
dsh plugin --profile web add github:nullptr-DZF/dsh-academic-research-skills
# or from a local checkout:
dsh plugin --profile web add /path/to/this/repo
# restart `dsh web`; the skills then appear in the session catalog
```

The bundle patch mounts `lib/startup.js`, which registers the 21 skills into
`ctx.skills` at boot.

## Differences from upstream

- **Hooks are not ported**: upstream `hooks/` are Claude Code specific; DSH has
  no hook system (write protection is DSH's file sandbox).
- **Deterministic scripts and shared material**: `scripts/*.py` (citation
  verification gate, etc.) and `shared/` references are not bundled, except
  `sr-screener`'s standard-library screening scripts, which ship with the
  skill; clone the upstream repo for the rest.
- **Subagents**: the 43 prompt roles run inline by default; the 4 plugin-level
  agent files ship with the skill bundles and can be used as `subagent` prompts.
- **Command wrappers are DSH-adapted**: the wrappers are regenerated from the
  upstream `commands/ars-*.md` and stripped of Claude Code's `Skill` tool calls
  and `${CLAUDE_PLUGIN_ROOT}` paths, so they run as-is under DSH.

## Regenerating command wrappers

`commands/` is generated from upstream `commands/ars-*.md`:

```bash
node scripts/regenerate-commands.mjs <upstream-checkout-path>
```

Regeneration also strips Claude Code's `Skill` tool call and
`${CLAUDE_PLUGIN_ROOT}` paths.
