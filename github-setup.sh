#!/usr/bin/env bash
# One-shot: log into GitHub (once), create repo, push, enable Pages.
# Usage:
#   ./github-setup.sh              # public repo named Cursor-Prototypes
#   ./github-setup.sh my-repo-name # custom repo name
#   ./github-setup.sh my-repo private

set -euo pipefail
cd "$(dirname "$0")"

REPO_NAME="${1:-Cursor-Prototypes}"
VISIBILITY="${2:-public}"

if ! command -v gh >/dev/null 2>&1; then
  echo "Install GitHub CLI first: brew install gh"
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "You are not logged into GitHub yet."
  echo "Run this in Terminal (browser will open):"
  echo "  gh auth login -h github.com -p https -w"
  echo "Then run this script again:"
  echo "  $0 $*"
  exit 1
fi

LOGIN="$(gh api user -q .login)"
if [[ -z "${LOGIN}" ]]; then
  echo "Could not read GitHub username from gh."
  exit 1
fi

# Ensure this repo has a commit identity (does not touch global config if already set).
if ! git config user.email >/dev/null 2>&1; then
  git config user.email "${LOGIN}@users.noreply.github.com"
fi
if ! git config user.name >/dev/null 2>&1; then
  git config user.name "${LOGIN}"
fi

if git remote get-url origin >/dev/null 2>&1; then
  echo "Remote origin already exists: $(git remote get-url origin)"
  git push -u origin main
else
  case "${VISIBILITY}" in
    public|private) ;;
    *)
      echo "Second arg must be 'public' or 'private' (got: ${VISIBILITY})"
      exit 1
      ;;
  esac

  echo "Creating GitHub repo ${LOGIN}/${REPO_NAME} (${VISIBILITY}) and pushing..."
  gh repo create "${REPO_NAME}" \
    --"${VISIBILITY}" \
    --source=. \
    --remote=origin \
    --description="Cursor UI prototypes" \
    --push
fi

echo ""
echo "Repository: https://github.com/${LOGIN}/${REPO_NAME}"
echo ""

# Enable GitHub Pages from root of main (best-effort).
if gh api "repos/${LOGIN}/${REPO_NAME}/pages" >/dev/null 2>&1; then
  echo "GitHub Pages already configured."
else
  echo "Enabling GitHub Pages (branch main, /)..."
  if gh api --method POST "repos/${LOGIN}/${REPO_NAME}/pages" --input - <<'JSON' >/dev/null 2>&1
{"source":{"branch":"main","path":"/"}}
JSON
  then
    echo "Pages enabled."
  else
    echo "Could not enable Pages via API (permissions or API change). Enable manually:"
    echo "  Repo → Settings → Pages → Deploy from branch → main → / (root)"
  fi
fi

echo ""
echo "When Pages finishes building, open:"
echo "  https://${LOGIN}.github.io/${REPO_NAME}/marquee-hero/index.html"
echo "  https://${LOGIN}.github.io/${REPO_NAME}/ai-governance-hero/index.html"
echo "  https://${LOGIN}.github.io/${REPO_NAME}/promo-cards/index.html"
