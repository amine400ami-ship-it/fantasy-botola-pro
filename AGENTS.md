<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Fantasy app architecture
- Keep pure fantasy validation and scoring in src/lib/fantasy/rules.ts so UI actions and tests use identical rules.
- Use a shared root FantasyProvider for runtime catalog and visit-scoped discovery squad so navigation preserves team selections without pretending they were saved.
- Use separate public French screen routes with leaf metadata and shared FantasyShell; commissioner operations and account persistence must remain unavailable until the existing backend is connected and its authorization is verified.
- Kit colors are external domain data rendered as SVG attributes; application surface colors and interactive variants are semantic tokens in the global design system.
- Fetch catalogs from the supplied runtime URLs first, falling back to same-origin JSON snapshots because the upstream host does not permit browser cross-origin reads.
