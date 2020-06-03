#!/bin/bash

THIS_DIR="$(dirname "${BASH_SOURCE[0]}")"
DOTFILES_DIR="${THIS_DIR}/dotfiles"

[ -d "$DOTFILES_DIR" ] || { 
  FROM_GIT_URL="${1:?'Pass the git url to clone from as the first argument'}"
}

if [ -d "$DOTFILES_DIR" ]; then
  cd "$DOTFILES_DIR" || exit 1
  git pull --rebase
else
  git clone "$FROM_GIT_URL" "$DOTFILES_DIR"
fi

cd "$THIS_DIR"
yarn
exec yarn build
