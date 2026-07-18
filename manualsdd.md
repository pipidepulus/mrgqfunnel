# RDV® Funnel — SDD Commands & Skills Manual

Comprehensive reference for all Spec-Driven Development (SDD) commands and available skills in this project.

---

## Table of Contents

1. [SDD Workflow Commands](#sdd-workflow-commands)
2. [PR Management Skills](#pr-management-skills)
3. [Code Quality Skills](#code-quality-skills)
4. [Skill Management](#skill-management)
5. [Quick Reference Table](#quick-reference-table)

---

## SDD Workflow Commands

The SDD workflow follows this sequence: **proposal → spec → design → tasks → apply → verify → archive**

### `/sdd-init` — Initialize Project Context

**What:** Detects the project stack, testing capabilities, and bootstraps persistence (Engram/OpenSpec).

**When to use:** First command before any SDD change. Run once per project.

**Usage:**
```
/sdd-init
```

**What it does:**
- Inspects `package.json`, config files, CI setup
- Detects test runner, coverage tools, linter, type checker
- Resolves Strict TDD mode (enabled if test runner exists)
- Initializes Engram or OpenSpec persistence
- Builds skill registry index

**Output:** Project context envelope with stack, testing capabilities, persistence mode, and Strict TDD status.

---

### `/sdd-explore <topic>` — Investigate Before Committing

**What:** Codebase investigation without creating any artifacts (except `exploration.md` when tied to a named change).

**When to use:** Before committing to a change — to understand scope, architecture impact, and risks.

**Usage:**
```
/sdd-explore add-dark-mode
/sdd-explore fix-login-timeout
```

**What it does:**
- Reads entry points and key files
- Maps affected modules and dependencies
- Compares approaches (pros/cons)
- Returns structured analysis with risk assessment

**Output:** Exploration report with findings, approach comparison, and recommendations.

---

### `/sdd-new <change>` — Start a New Change

**What:** Meta-command that kicks off the full SDD pipeline for a new feature or fix.

**When to use:** Starting any substantial change (not trivial one-file fixes).

**Usage:**
```
/sdd-new add-user-authentication
/sdd-new fix-payment-calculations
```

**What it does:**
- Asks artifact store mode: `engram` | `openspec` | `hybrid` | `none`
- Asks execution mode: `interactive` (steer each step) | `automatic` (run all phases)
- Launches exploration → proposal automatically

---

### `/sdd-ff <name>` — Fast-Forward Planning

**What:** Runs the planning phases back-to-back without pausing: proposal → spec → design → tasks.

**When to use:** When you want full planning done at once, then decide on implementation later.

**Usage:**
```
/sdd-ff add-dark-mode
```

**What it does:**
- Explores the codebase
- Creates proposal with scope and approach
- Writes delta specs (requirements)
- Produces technical design
- Breaks into implementation tasks
- Stops before apply — you decide when to implement

---

### `/sdd-status [change]` — Check Current State

**What:** Read-only structured status showing current progress, artifacts, tasks, and next recommended action.

**When to use:** Anytime to check where a change stands in the pipeline.

**Usage:**
```
/sdd-status add-dark-mode
```

**Output:** Change name, phase, task progress (checked/unchecked), dependency states, blocked reasons, next recommended action.

---

### `/sdd-continue [change]` — Continue to Next Phase

**What:** Meta-command that runs the next dependency-ready phase via sub-agent.

**When to use:** After reviewing a phase result and wanting to proceed.

**Usage:**
```
/sdd-continue add-dark-mode
```

**What it does:**
- Checks dependency graph (proposal → spec → design → tasks → apply → verify → archive)
- Launches the next available phase via sub-agent
- Returns result for your review (interactive mode) or continues automatically

---

### `/sdd-propose` — Create Change Proposal

**What:** Produces a `proposal.md` with intent, scope, approach, and capabilities.

**When to use:** After exploration, before writing specs. Or directly from user description.

**Usage:**
```
/sdd-propose add-dark-mode
```

**What it does:**
- Creates change directory structure
- Writes proposal with: problem statement, target users, scope boundaries, non-goals
- In interactive mode: asks 3-5 product questions to clarify requirements
- Returns structured proposal envelope

---

### `/sdd-spec` — Write Specifications

**What:** Produces delta specs — structured requirements describing what's being ADDED, MODIFIED, or REMOVED.

**When to use:** After proposal is approved, before design.

**Usage:**
```
/sdd-spec add-dark-mode
```

**What it does:**
- Reads the proposal's Capabilities section
- Creates delta specs for each capability (new or modified)
- Defines requirements and scenarios
- Returns spec artifacts with compliance criteria

---

### `/sdd-design` — Technical Design

**What:** Produces a `design.md` capturing HOW the change will be implemented — architecture decisions, data flow, file changes.

**When to use:** After specs are written, before task breakdown.

**Usage:**
```
/sdd-design add-dark-mode
```

**What it does:**
- Reads actual codebase (entry points, patterns, dependencies)
- Produces design document with: architecture decisions, file changes, data flow, technical rationale
- Returns design artifact for review

---

### `/sdd-tasks` — Task Breakdown

**What:** Breaks the design into concrete, actionable implementation tasks organized by phase.

**When to use:** After design is complete, before implementation.

**Usage:**
```
/sdd-tasks add-dark-mode
```

**What it does:**
- Analyzes design for files to create/modify/delete
- Determines dependency order (what must come first)
- Creates `tasks.md` with numbered tasks per phase
- Returns task list with progress tracking

---

### `/sdd-apply [change]` — Implement Tasks

**What:** Implements the tasks from `tasks.md` in batches, marking items as complete.

**When to use:** After tasks are defined and you're ready to write code.

**Usage:**
```
/sdd-apply add-dark-mode
# Or implement a specific batch:
/sdd-apply add-dark-mode phase-1
```

**What it does:**
- Reads spec + design + tasks for context
- Implements tasks in dependency order
- Marks completed tasks with `[x]`
- Saves apply-progress for continuity across sessions
- Returns progress summary

**Note:** In Strict TDD mode, tests must pass before implementation is considered complete.

---

### `/sdd-verify [change]` — Validate Implementation

**What:** Validates that the implementation matches specs, design, and tasks. Runs tests and checks compliance.

**When to use:** After apply completes, before archive.

**Usage:**
```
/sdd-verify add-dark-mode
```

**What it does:**
- Maps each spec requirement to implementation evidence
- Checks design decisions against changed code
- Verifies task completion (all `[x]` checked)
- Runs tests/build/type-check
- Returns verdict: `PASS`, `PASS WITH WARNINGS`, or `FAIL`

---

### `/sdd-archive [change]` — Close a Change

**What:** Merges delta specs into main specs, moves change folder to archive, and persists the final state.

**When to use:** After verification passes and you want to close the change.

**Usage:**
```
/sdd-archive add-dark-mode
```

**What it does:**
- Validates all tasks are checked (blocks if incomplete)
- Syncs delta specs into main spec files
- Moves change folder to `openspec/changes/archive/`
- Records archive report with traceability
- Returns closure summary

---

### `/sdd-onboard` — Guided Walkthrough

**What:** Interactive end-to-end walkthrough of the entire SDD cycle using your real codebase.

**When to use:** First time learning SDD, or onboarding a new team member.

**Usage:**
```
/sdd-onboard
```

**What it does:**
- Scans codebase for small improvement opportunities
- Presents 2-3 options (real value, low risk, completable in one session)
- Guides you through the full cycle: explore → propose → spec → design → tasks → apply → verify → archive
- Explains each step as it goes

---

## PR Management Skills

### `branch-pr` — Create Pull Requests

**Trigger:** Creating, opening, or preparing PRs for review.

**What it does:**
- Verifies linked issue has `status:approved` label
- Creates branch with conventional naming: `type/description`
- Implements changes with conventional commits
- Opens PR using the project template
- Adds exactly one `type:*` label (`feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `revert`)

**Branch naming format:**
```
type/description
Examples: feat/add-dark-mode, fix/login-timeout, docs/update-readme
```

**Critical rules:**
1. Every PR MUST link an approved issue
2. Every PR MUST have exactly one `type:*` label
3. Automated checks must pass before merge
4. Blank PRs without issue linkage are blocked

---

### `chained-pr` — Split Large Changes into Chained PRs

**Trigger:** PRs over 400 lines, stacked PRs, review slices.

**What it does:**
- Splits oversized changes into focused, reviewable PRs
- Each PR stays under ~60 minutes review time
- Supports two chain strategies:
  - **Stacked to main:** Each PR merges to main in order (fast iteration)
  - **Feature branch chain:** Feature/tracker branch accumulates final integration (rollback control)

**Decision gates:**
| Condition | Action |
|-----------|--------|
| PR ≤400 lines and focused | Keep single PR |
| PR >400, slices independent | Use Stacked PRs to main |
| PR >400, coordinated release needed | Use Feature Branch Chain |

---

## Code Quality Skills

### `judgment-day` — Adversarial Dual Review

**Trigger:** `juzgar`, dual review, adversarial review.

**What it does:**
- Launches two blind judges in parallel with identical criteria
- Synthesizes findings into: confirmed, suspect, contradiction, INFO buckets
- Asks before fixing Round 1 confirmed issues
- Re-judges after fixes
- Final verdict: `JUDGMENT: APPROVED` or `JUDGMENT: ESCALATED`

**When to use:** After SDD design or apply phase completes (high-stakes verification).

---

### `cognitive-doc-design` — Reduce Cognitive Load in Docs

**Trigger:** Writing guides, READMEs, RFCs, onboarding docs, architecture docs.

**What it does:**
- Designs documentation that's easy to scan and retain
- Applies: progressive disclosure, chunking, signposting, recognition over recall
- Default structure: outcome title → quick path → details table → checklist → next step

---

### `comment-writer` — Warm Collaboration Comments

**Trigger:** PR feedback, issue replies, reviews, Slack messages.

**What it does:**
- Writes direct, warm comments that get to the point fast
- Formula: observation/request → why it matters → concrete next action
- Matches target context language (Spanish for Spanish threads, English for English)
- No em dashes, no corporate bot tone

---

### `work-unit-commits` — Reviewable Commit Planning

**Trigger:** Implementation, commit splitting, chained PRs.

**What it does:**
- Plans commits as deliverable work units (not by file type)
- Keeps tests with code, docs with user-visible changes
- Each commit tells a story a reviewer can understand
- Checklist: one clear purpose, repo makes sense after this commit, rollback reasonable

---

### `go-testing` — Go Testing Patterns

**Trigger:** Go tests, test coverage, Bubbletea/TUI testing, golden files.

**What it does:**
- Table-driven tests for multiple cases
- Test behavior and state transitions (not implementation trivia)
- Golden file patterns, teatest for TUI flows
- Decision gate: pure function → table-driven, error behavior → success/failure cases, TUI → `teatest`

---

## Skill Management

### `skill-creator` — Create New Skills

**Trigger:** New skills, agent instructions, documenting AI usage patterns.

**What it does:**
- Creates LLM-first skills with valid frontmatter
- Structure: `SKILL.md` + optional `assets/` + `references/`
- Target 180-450 tokens per skill body
- Includes: name, description (with trigger words), license, metadata

### `skill-improver` — Audit & Upgrade Skills

**Trigger:** Improve skills, audit skills, refactor skills.

**What it does:**
- Audits existing `SKILL.md` files against style guide
- Returns issues grouped by severity
- Preserves author intent; moves long content to supporting files
- Recommends registry refresh when paths change

### `skill-registry` — Index Available Skills

**Trigger:** Update skills, skill registry, after skill changes.

**What it does:**
- Scans all skill directories for `*/SKILL.md`
- Writes `.atl/skill-registry.md` index with name, trigger, scope, exact path
- Persists to Engram when available
- Deduplicates by skill name (project-level > user-level)

---

## Issue Creation

### `issue-creation` — Create GitHub Issues

**Trigger:** Creating GitHub issues, bug reports, feature requests.

**What it does:**
- Searches for duplicate issues first
- Uses correct template (Bug Report or Feature Request)
- Auto-labels with `bug`/`feature-request` + `status:needs-review`
- Maintainer must add `status:approved` before PR can be opened

---

## Quick Reference Table

| Command/Skill | Purpose | When to Use |
|---------------|---------|-------------|
| `/sdd-init` | Bootstrap project context | First time, per project |
| `/sdd-explore <topic>` | Investigate codebase | Before committing to change |
| `/sdd-new <name>` | Start new SDD change | Any substantial feature/fix |
| `/sdd-ff <name>` | Fast-forward planning | Full planning in one go |
| `/sdd-status [change]` | Check progress | Anytime |
| `/sdd-continue [change]` | Next phase | After reviewing previous result |
| `/sdd-propose` | Create proposal | After exploration |
| `/sdd-spec` | Write specs | After proposal approved |
| `/sdd-design` | Technical design | After specs written |
| `/sdd-tasks` | Task breakdown | After design complete |
| `/sdd-apply [change]` | Implement code | After tasks defined |
| `/sdd-verify [change]` | Validate implementation | After apply completes |
| `/sdd-archive [change]` | Close change | After verification passes |
| `/sdd-onboard` | Guided walkthrough | First time learning SDD |
| `branch-pr` | Create PR with issue link | Opening any PR |
| `chained-pr` | Split large PRs | >400 changed lines |
| `judgment-day` | Adversarial review | After design or apply phase |
| `cognitive-doc-design` | Low-load docs | Writing guides/READMEs/RFCs |
| `comment-writer` | Warm comments | PR feedback, issue replies |
| `work-unit-commits` | Reviewable commits | Implementation planning |
| `go-testing` | Go test patterns | Go testing work |
| `skill-creator` | Create new skills | Documenting reusable patterns |
| `skill-improver` | Audit skills | Improving existing skills |
| `skill-registry` | Index skills | After skill changes |
| `issue-creation` | Create GitHub issues | Bug reports, feature requests |

---

## SDD Dependency Graph

```
proposal → specs --> tasks → apply → verify → archive
             |
           design
```

**Rules:**
- Each phase depends on the previous one completing successfully
- Specs and design can run in parallel (both depend on proposal)
- Tasks requires both spec AND design
- Apply implements tasks
- Verify validates against specs + design + tasks
- Archive closes the cycle (requires verify to pass)

---

## Artifact Store Modes

| Mode | Description | Best For |
|------|-------------|----------|
| `engram` | Fast, no files created. Artifacts in Engram memory only. | Solo work, quick iteration |
| `openspec` | File-based. Creates `openspec/` directory with full artifact trail. | Team sharing, git history |
| `hybrid` | Both — files for team + Engram for cross-session recovery. | Team + persistence needs |
| `none` | Inline results only. No artifacts persisted. | Quick exploration, no commitment |

---

*This manual is the operational reference for all SDD commands and skills in the RDV® funnel project.*
