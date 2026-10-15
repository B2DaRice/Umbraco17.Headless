# Umb17.Portfolio.Web.React

Independent React frontend for the portfolio project.

## Purpose

This app is the first frontend client for the Umbraco Delivery API. It should remain deployable separately from the Umbraco API/backoffice host, including future containerized deployment.

## Stack

- Vite 8
- React 19
- TypeScript 6
- Tailwind CSS 4
- HTTPS dev server via `@vitejs/plugin-basic-ssl`
- Oxlint from the Vite template

## Local Development

The frontend runs at:

```text
https://localhost:6317
```

The admin sync route runs at:

```text
https://localhost:6317/admin
```

The API origin is configured in `.env.development`:

```text
VITE_UMBRACO_API_ORIGIN=https://localhost:63177
```

## Scripts

Run the dev server:

```powershell
npm.cmd run dev
```

Build for production:

```powershell
npm.cmd run build
```

Preview the production build:

```powershell
npm.cmd run preview
```

Run the linter:

```powershell
npm.cmd run lint
```

Use `npm.cmd` from PowerShell because plain `npm` may be blocked by script execution policy.

Wait for the local Umbraco API before starting frontend tooling:

```powershell
node .\scripts\wait-for-umbraco-api.mjs
```

The wait script checks `https://localhost:63177/api/frontend/manifest` by default. Override with `VITE_UMBRACO_API_ORIGIN`, `UMBRACO_API_WAIT_INTERVAL_MS`, or `UMBRACO_API_WAIT_TIMEOUT_MS` when needed.

## API And Rendering Pattern

The frontend has a small Delivery API foundation:

- `src/api/umbraco.ts` - fetch helpers for Umbraco Delivery API content.
- `src/api/normalizeUmbracoContent.ts` - normalizes Delivery API responses into flattened frontend models at the API boundary.
- `src/state/globalState.tsx` and `src/state/globalStateContext.ts` - app-wide user UI state provider and hook; currently starts with `useDarkTheme`, defaulting to light theme.
- `src/types/umbraco.ts` - practical TypeScript shapes for content, collections, blocks, and stable reusable Delivery API value types such as `NavLink`.
- `src/components/layout/siteLayoutConfig.ts` - Tailwind class configuration for the full-height site shell, page content slot, and footer.
- `src/components/layout/siteTheme.ts` - resolves site-level theme color picker values from `SiteSettingsModel` into generated Tailwind theme utility classes.
- `src/components/layout/SiteFooter.tsx` - renders the global footer from `MainModel`; includes a local `isSticky` wiring stub for future content-driven sticky footer behavior.
- `src/components/brand/MonogramIcon.tsx` - renders `MonogramIconModel` content as an SVG logo assembled from individual `MonogramSvgModel` letter blocks.
- `src/components/brand/monogramGlyphs.ts` - glyph registry for supported monogram letters; includes normalized SVG path geometry for A-Z with custom-refined `B` and `G` paths.
- `src/components/brand/monogramTheme.ts` - resolves theme color picker references to generated Tailwind theme utility class names, with raw CSS color fallback only for default local glyph values.
- `src/components/navigation/TopNav.tsx` - renders the global top navigation from the generated `TopNavigationModel` block on `MainModel.topNav`.
- `src/renderers/PageRenderer.tsx` - maps Umbraco content type aliases to React page components.
- `src/renderers/BlockRenderer.tsx` - placeholder block component registry.
- `src/pages` - page components that replace Razor-style templates in React.
- `src/admin/AdminSyncPage.tsx` - dev-only sync dashboard for comparing React model metadata to Umbraco document type metadata and applying selected model updates.
- `src/generated/umbraco-model-manifest.ts` - generated manifest representing the current React model shape.
- `src/generated/umbraco-content-models.ts` - generated TypeScript content models for templates/components.
- `src/generated/umbraco-theme-colors.css` - generated Tailwind theme color tokens from published Umbraco `themeColor` content.

`App.tsx` waits for the Umbraco API manifest endpoint before checking the Delivery API for `/`. The `/` route is expected to be `main`, which acts as the SPA/global metadata shell for global tags, scripts, header/footer, and SEO-level concerns. The initial renderable content page is expected to be a direct `homePage` child of `main`; that child renders through `PageRenderer`. If `main` or its `homePage` child is missing after the API is ready, the splash resolves to a specific no-content placeholder.

When `main.topNav` includes a `topNavigation` block, the site shell renders `TopNav` before the current page. The generated Umbraco model remains the source of truth for the component properties; TopNav owns its default Tailwind classes locally until content-driven header style variants are added.

TopNav also includes a hardcoded settings dropdown stub with a controlled native checkbox styled as a dark theme switch. The switch updates `useDarkTheme`, which sets `data-theme` on the shell, header, page body, footer, and theme-aware component surfaces; persistence is future work.

The public site uses `siteSettings.mainBgColor`, `siteSettings.mainTextColor`, and `siteSettings.primaryColor` to resolve generated Tailwind theme utility classes for background, text, border, and primary colors. Header, footer, and body apply those classes and their own `data-theme` attributes directly so each surface can later receive dedicated content-driven theme settings without relying on shell inheritance.

Public site pages, renderers, and shared public components should use generated `theme-*` Tailwind utilities or values from `siteTheme` instead of fixed palette colors so they follow the Umbraco-managed theme. The dev-only `/admin` sync UI intentionally keeps its own fixed dark utility palette.

Themeable UI should prefer Tailwind utility classes and generated theme tokens over inline styles. Avoid `style={...}` for color, spacing, border, radius, or other presentation values that can be represented by Tailwind classes. When a runtime CMS value must become a class, generate or safelist the corresponding Tailwind token through the admin sync workflow instead of injecting an inline CSS value. Tailwind arbitrary pixel utilities that depend on CMS numeric settings should be clamped to a safelisted range.

Top navigation logo rendering follows this fallback order:

- `siteSettings.siteLogo` when a site logo is configured.
- The first published `monogramIcon` content item when available.
- The built-in default BG monogram assembled by `MonogramIcon`.

`MonogramIcon` uses block-list order for left-to-right letter layout. Each letter's `xAxis` shifts that letter and the following flow position, so negative values overlap the previous letter and pull later letters left with it. Each letter's `yAxis` shifts only that letter. `zIndex` controls SVG stacking order; missing values behave as `0`, and same-`zIndex` letters preserve block-list order so later letters render on top of earlier ones.

Monogram glyphs are height-normalized in `monogramGlyphs.ts` so each letter renders at the same relative height without parent-level scaling that could distort individual letter widths. `MonogramIcon` renders a wrapper element for icon-level background, border, radius, padding, and page placement, then nests an inner SVG viewport for glyph sizing and layout. The alphabet is path-based so each `MonogramSvgModel.letter` value maps directly to SVG geometry from the glyph registry.

Monogram color properties currently use content picker values that reference `themeColor` nodes. The frontend resolves those references to generated Tailwind theme utility classes such as `fill-theme-purple`, `stroke-theme-purple`, `bg-theme-purple`, and `border-theme-purple`. The wrapper sets a local `data-theme` so generated theme tokens resolve according to the monogram's selected mode. When `MonogramIconModel.flipTheme` is true, the monogram intentionally resolves the opposite theme mode from the active site theme.

Monogram wrapper sizing styles use generated Tailwind utility classes instead of inline styles. `src/index.css` safelists wrapper padding, border radius, and border width classes from `0px` through `200px`; CMS values for those wrapper settings are rounded and clamped to that range. When the monogram has no background color selected in content, the wrapper falls back to `bg-theme-default-bg`, which resolves through the wrapper's local `data-theme`.

The site shell uses a Tailwind column layout so the header stays at the top, the current page renders in a flexible middle slot, and the footer sits at the bottom of short pages. Footer rendering currently follows `main.useFooter` and `main.copyrightLabel`; sticky footer behavior is wired locally as a stub until an Umbraco content property is added for it.

VS Code `Frontend: Dev` launch also runs `scripts/wait-for-umbraco-api.mjs` before starting Vite so the frontend browser tab does not open before the API/backoffice host is ready. The raw `dev: all` task starts API and frontend dependencies in parallel, so prefer the debug compound for normal full-stack local startup.

`/admin` calls `https://localhost:63177/api/frontend/manifest`, compares that response to the generated React manifest, and groups models into stale, missing, changed, and synced lists. The changed-model comparison includes property aliases, editor/storage type, data type identity/editor UI/configuration, mandatory flags, variation flags, and sort order.

The admin page also loads published `themeColor` content from the Delivery API. The Theme Colors sync writes `src/generated/umbraco-theme-colors.css`, which defines one semantic Tailwind `@theme inline` color token per Theme Color name, such as `--color-theme-purple`. Generated `[data-theme="light"]` and `[data-theme="dark"]` blocks set the underlying CSS variable value for each mode, for example `--theme-color-purple`. `@theme inline` is required so emitted utilities such as `fill-theme-purple` read the scoped `data-theme` variable directly. The file also includes `@source inline(...)` utility references so Vite/Tailwind emits the corresponding background, border, fill, stroke, and text utilities.

The apply buttons run a local dev-only sync flow:

- The user confirms that the frontend will regenerate files and restart.
- The admin page posts selected model metadata to `POST /__admin/umbraco-sync`.
- A custom Vite plugin runs `scripts/generate-umbraco-models.mjs`.
- The generator updates files in `src/generated/`.
- Vite restarts and the admin page reloads back to `/admin`.

The Theme Colors sync posts the current Theme Color content to `POST /__admin/theme-color-sync`. A custom Vite plugin runs `scripts/generate-umbraco-theme-colors.mjs`, updates `src/generated/umbraco-theme-colors.css`, restarts Vite, and returns to `/admin`.

The sync endpoint is only provided by the Vite dev server. It is not part of the production frontend.

The Vite sync plugin also exposes `GET /__admin/health` so the admin page can wait for the dev server to come back after a model sync restart.

## Generated Model Conventions

Umbraco should be the source of truth for content structure. The React app keeps the shared API handshake types intentionally loose, then relies on generated concrete models for template IntelliSense.

- Raw Delivery API content keeps Umbraco values under `properties`, but `src/api/normalizeUmbracoContent.ts` flattens those values at the frontend boundary.
- Generated document and block models expose typed Umbraco properties at the top level, alongside published content fields like `id`, `contentType`, and `name`.
- Reusable Delivery API value types that are not document types, such as `NavLink`, live in `src/types/umbraco.ts` so generated model syncs can import them without overwriting their definitions.
- `KnownContentType` and `KnownBlockType` unions are not generated for now.
- Rich text fields generate as `RichTextValue | null`. `RichTextValue` represents the Delivery API shape with `markup` and optional `blocks`; templates should render the `markup` value.
- Templates should prefer direct typed property access, such as `content.title` or `topNavigation.navItemAlignment`, instead of reading nested Delivery API properties directly.

## Notes

- Do not build this app into the API project's `wwwroot` unless the deployment direction changes.
- The API/backoffice runs separately at `https://localhost:63177`.
- Backoffice URL: `https://localhost:63177/umbraco`.
