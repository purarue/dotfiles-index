// this describes which files in public/ to serve

export const config = {
  // files/directories to serve
  pathsToServe: [
    "dotfiles/.local/scripts/bin/",
    "dotfiles/.local/scripts/system/",
    "dotfiles/.local/share/shortcuts",
    "dotfiles/.config/doom",
    "dotfiles/.config/i3",
    "dotfiles/.config/qtile",
    "dotfiles/.config/ranger",
    "dotfiles/.config/yadm",
    "dotfiles/.config/zsh",
    "dotfiles/.config/directories",
    "dotfiles/.config/fzf_preview",
    "dotfiles/.config/shortcuts.toml",
  ],
  // remove this from the beginning of the path when displaying on the website
  removePrefix: "dotfiles/",
  // username used across the site
  name: "purarue",
  // somewhere where the entire dotfiles repo is hosted
  externalGitDir: "https://github.com/purarue/dotfiles",
};

export const siteTitle = `dotfiles index [${config.name}]`;
