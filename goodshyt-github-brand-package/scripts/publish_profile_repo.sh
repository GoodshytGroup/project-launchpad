#!/usr/bin/env bash
set -euo pipefail

REPO_NAME="${1:-GoodshytGroup}"
VISIBILITY="${2:-public}"

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI (gh) is required." >&2
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Authenticate first with: gh auth login" >&2
  exit 1
fi

if [ ! -d .git ]; then
  git init
fi

git add .
git commit -m "Initial GitHub profile repo" || true
git branch -M main

if ! gh repo view "$REPO_NAME" >/dev/null 2>&1; then
  gh repo create "$REPO_NAME" --"$VISIBILITY" --source=. --remote=origin --push
else
  if ! git remote get-url origin >/dev/null 2>&1; then
    git remote add origin "https://github.com/$(gh api user -q .login)/$REPO_NAME.git"
  fi
  git push -u origin main
fi
