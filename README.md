A static site generator which displays blob/raw (similar to github) pages for my scripts/configuration files from my dotfiles.

<img src="https://raw.githubusercontent.com/purarue/dotfiles-index/master/.images/home.png" height=400>

<img src="https://raw.githubusercontent.com/purarue/dotfiles-index/master/.images/blob.png" height=400>

This doesn't update automatically, you have to rebuild the entire site to update it; with `rebuild`.

To configure which files are served, and some other options, edit `config.tsx`.

The `build` command (`npm run build`/`yarn build`) builds and exports this site to a static site at `out`, which can then be served without a node backend.

On its own, this site works fine, though when I first wrote this, I expected to be able to deploy this to my site under `./dotfiles`. Deploying to a different base path seems to be relatively [experimental](https://github.com/vercel/next.js/pull/9872), so unless you plan to host this elsewhere, have to wait for better support for dynamic SSGs with next.js before I plan to use this. I wrote [this](https://github.com/purarue/subpath-serve.git
) project, hosted [here](https://sean.fish/d/) to do something similar to this.

If you'd like to use this, run:

```sh
./rebuild <your_dotfiles_repo_url>
```

I should note that the `raw` pages aren't really raw, I dont want to blind myself looking at a white background, so they're still rendered `next.js` pages. One could always use something like `lynx`/`w3m` to get the text from the page:

```sh
lynx -dump https://sean.fish/dotfiles/rc.conf
```
