A static site generator which displays blob/raw (similar to github) pages for my scripts/configuration files from my dotfiles.

This doesn't update automatically, you have to rebuild the entire site to update it; with `rebuild.sh`.

To configure which files are served, and some other options, edit `config.tsx`.

The `build` command (`npm run build`/`yarn build`) builds and exports this site to a static site at `out`, which can then be served without a node backend.

If you'd like to use this, run:

```sh
./rebuild.sh <your_dotfiles_repo_url>
```
