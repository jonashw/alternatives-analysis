# alternatives.jonashw.dev

Source for the Alternatives Analysis Specification site.

- `docs/software.md`: software variant (primary), served at `/software/` and raw at `/software.md`
- `docs/general.md`: general variant, served at `/general/` and raw at `/general.md`
- `docs/index.md`: landing page, served at `/` and raw at `/index.md`
- `llms.txt`: agent index at `/llms.txt`

Cross-links in the Markdown use absolute `https://alternatives.jonashw.dev/<name>.md` URLs so an agent reading the raw source can follow them. The HTML build rewrites them to `/<name>/`.

Build locally with `build/build.sh` (needs pandoc); output goes to `_site/`. Pushes to `main` deploy via GitHub Actions.
