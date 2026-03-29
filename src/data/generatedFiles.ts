export const generatedFiles: Record<string, string> = {
  "LICENSE": `MIT License

Copyright (c) 2025 Deonte Watts

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,

  "SECURITY.md": `# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 1.x     | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

**Do not open a public issue for security vulnerabilities.**

Please report security vulnerabilities via GitHub's private vulnerability reporting:

1. Go to the **Security** tab of this repository
2. Click **Report a vulnerability**
3. Provide a detailed description of the vulnerability

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Affected component (\`core/\`, \`platforms/\`, \`integrations/\`)
- Potential impact (especially for automotive/safety-critical deployments)
- Suggested fix (if any)

### Response Timeline

- **Acknowledgment**: Within 48 hours
- **Assessment**: Within 7 days
- **Fix (critical)**: Within 14 days
- **Fix (non-critical)**: Within 30 days

### Automotive Safety Note

OctaTouch includes safety-critical gesture gating for in-vehicle HMI deployments.
Vulnerabilities that could bypass \`IntentResolver\` driving-mode gates are treated
as **critical severity** regardless of other factors.

## Security Best Practices

- Never bypass \`IntentResolver\` safety gates in adapter code
- Keep \`PlatformContext.vehicleState\` current on every frame
- Validate all touch input bounds before processing
- Run \`make test\` before every release — latency regressions can indicate injection vectors`,

  "CONTRIBUTING.md": `# Contributing to OctaTouch SDK Core

Thank you for your interest in contributing! This guide will help you get started.

## Getting Started

\`\`\`bash
# Clone the repository
git clone https://github.com/deontewatts/octatouch-sdk-core.git
cd octatouch-sdk-core

# Build
make init
make build

# Run tests
make test
\`\`\`

## Architecture

The gesture pipeline has three stages — changes must respect this order:

\`\`\`
FingerTracker → GestureRecognizer → IntentResolver
\`\`\`

- **Core logic** lives in \`core/\` — no platform APIs allowed here
- **Adapters** live in \`platforms/<target>/\` — capture, translate, feed only
- **Integrations** live in \`integrations/\` — domain-specific extensions

## Rules

1. \`IntentResolver\` is the **only** place that blocks or remaps intents
2. Never introduce platform APIs into \`core/\`
3. Keep each pipeline stage under 1ms
4. Treat latency regressions as release blockers
5. Update \`docs/gesture-vocabulary.md\` when adding gestures

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

\`\`\`
feat(core): add EightFingerRotate recognition
fix(in-vehicle): gate ThreeFingerPinchIn on parked state
perf(web-adapter): reduce debounce from 8ms to 4ms
\`\`\`

## Pull Request Process

1. Run \`make build && make test\` — both must pass
2. Ensure no platform symbols leaked into \`core/\`
3. Update docs if gesture vocabulary changed
4. Fill out the PR template completely
5. Request review from a maintainer

## Adding a New Gesture

1. Add enum to \`core/include/Types.h\`
2. Add recognition in \`GestureRecognizer::recognize()\`
3. Add intent mapping in \`IntentResolver::mapPrimitiveToIntent()\`
4. Update \`docs/gesture-vocabulary.md\`
5. Add smoke test in \`tests/unit/smoke_test.cpp\`

## Adding a Platform Adapter

See \`.claude/skills/add-platform-adapter.md\` for the full guide.`,

  ".github/dependabot.yml": `version: 2
updates:
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
    commit-message:
      prefix: "chore(ci)"`,

  ".github/ISSUE_TEMPLATE/bug_report.md": `---
name: Bug Report
about: Report a bug in the gesture engine
title: "[BUG] "
labels: bug
assignees: ''
---

## Describe the Bug
A clear description of the bug.

## Pipeline Stage
Which stage is affected?
- [ ] FingerTracker
- [ ] GestureRecognizer
- [ ] IntentResolver
- [ ] Platform Adapter (specify)
- [ ] Integration (specify)

## To Reproduce
1. Input frame with...
2. Expected gesture: ...
3. Actual gesture: ...

## Environment
- Platform: [e.g., web, iOS, automotive]
- Vehicle State: [driving/parked/N/A]
- Touch Count: [number]

## Additional Context
Add any other context about the problem here.`,

  ".github/ISSUE_TEMPLATE/feature_request.md": `---
name: Feature Request
about: Suggest a new gesture, adapter, or improvement
title: "[FEATURE] "
labels: enhancement
assignees: ''
---

## Summary
One-sentence description of the feature.

## Motivation
Why is this needed? What use case does it serve?

## Proposed Implementation
- Which pipeline stage(s) would this affect?
- Would this require a new GestureType or GestureIntent?
- Any latency budget concerns?

## Alternatives Considered
Other approaches you've considered.`,

  ".github/PULL_REQUEST_TEMPLATE.md": `## What
<!-- One paragraph: what changed and why. -->

## Pipeline Impact
- [ ] FingerTracker
- [ ] GestureRecognizer
- [ ] IntentResolver
- [ ] Platform Adapter
- [ ] Integration
- [ ] None (docs/CI only)

## Test Coverage
- [ ] New tests added
- [ ] Existing tests updated
- [ ] No tests needed

## Checklist
- [ ] \`make test\` passes
- [ ] No \`build/\` artifacts committed
- [ ] No platform APIs in \`core/\`
- [ ] \`docs/gesture-vocabulary.md\` updated (if gestures changed)
- [ ] Commit messages follow Conventional Commits

## Breaking Changes
<!-- ABI changes? Gesture vocabulary changes? None? -->`,
};
