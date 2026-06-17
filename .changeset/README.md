# Changesets

Versioning and release notes for `@tomscaria/lore-design-system`.

## Workflow

1. **Make changes** (edit themes, tokens, components, verbal files).
2. **Add a changeset**: `pnpm changeset` — pick the bump type (patch/minor/major) and write a one-line description.
3. **Commit** the generated `.md` file alongside your changes.
4. **PR**: open against `main`.
5. **Release**: the GitHub workflow (`.github/workflows/release.yml`) versions and publishes on merge to `main`.

## Bump heuristics

- **patch**: token value tweaks, copy edits in verbal/, theme readme updates, component-internal refactors that don't change the API
- **minor**: new component, new theme, new brand, new exports path
- **major**: breaking changes to the public API — renamed exports, removed themes, changed CSS var names that consumers rely on

The atomic kit is designed so that most editorial changes (color tweaks, copy edits) are patches. Only the export contract and CSS var names are stable surface.
