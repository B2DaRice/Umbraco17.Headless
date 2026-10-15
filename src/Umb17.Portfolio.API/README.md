# Umb17.Portfolio.API

Umbraco 17 LTS backoffice and headless API host for the portfolio project.

## Purpose

This project owns the Umbraco backoffice, content database, media, and Delivery API. It should stay separate from frontend clients so React and future frontend frameworks can build and deploy independently.

## Local URLs

- API root/info page: `https://localhost:63177`
- Backoffice: `https://localhost:63177/umbraco`
- Delivery API content endpoint: `https://localhost:63177/umbraco/delivery/api/v2/content`
- Frontend manifest endpoint: `https://localhost:63177/api/frontend/manifest`
- Swagger, in development: `https://localhost:63177/umbraco/swagger`

## Database

Database setup currently uses local SQLite through `appsettings.json`. There is no local SQL Server connection string.

The configured connection string is:

```text
Data Source=|DataDirectory|/Umb17.Portfolio.sqlite.db;Cache=Shared;Foreign Keys=True;Pooling=True
```

For the current local install, SQLite files are created under:

```text
umbraco/Data/
```

Those SQLite files are ignored by the project `.gitignore`.

## Key Config

- `Program.cs` includes `.AddDeliveryApi()`.
- `appsettings.json` enables the public Delivery API for content and media.
- `appsettings.json` sets `RichTextOutputAsJson` to `false`, though rich text Delivery API values may still arrive as structured `markup`/`blocks` objects.
- CORS allows the React dev frontend origin: `https://localhost:6317`.
- The API root route renders a small dark-mode info page for local setup links.
- `launchSettings.json` runs the API/backoffice at `https://localhost:63177`.
- `/api/frontend/manifest` exposes Umbraco document type metadata for the React admin sync and TypeScript model generation workflow, including property aliases, editor/storage type, data type identity/editor UI/configuration, mandatory flags, variation flags, and sort order.
- Rich text Delivery API output may arrive as a structured object with `markup` and `blocks`; React templates should render the `markup` value.

## Current Content Model Reference

This reference was checked against the local `/api/frontend/manifest` shape on July 31, 2026. It is intentionally lightweight and should move to more formal model docs once the content architecture settles.

### Document Types

- `homePage` / Home Page - Route-rendered page model for the site homepage.
  - `title` - Textstring, `Umbraco.TextBox`.
  - `subheader` - Textstring, `Umbraco.TextBox`.
  - `summary` - Richtext editor, `Umbraco.RichText`; frontend should render `summary.markup`.
- `aboutPage` / About Page - Route-rendered page model for about content.
  - `title` - Textstring, `Umbraco.TextBox`.
  - `about` - Richtext editor, `Umbraco.RichText`; frontend should render `about.markup`.
- `main` / Main - SPA entry at `/` and global metadata shell for global tags, scripts, header/footer, and SEO-level concerns. Renderable content starts from its direct `homePage` child.
  - `copyrightLabel` - Textstring, `Umbraco.TextBox`.
  - `useFooter` - True/false, `Umbraco.TrueFalse`.
  - `topNav` - Top Navigation Component, `Umbraco.SingleBlock`; allows the `topNavigation` element type.
- `siteSettings` / Site Settings - Site-wide settings and branding/content picker model.
  - `siteLogo` - Image Media Picker, `Umbraco.MediaPicker3`; configured for one image.
  - `primaryColor` - Theme Color Picker, `Umbraco.MultiNodeTreePicker`; configured for one `themeColor` content item nearest under `themeColors`.
- `themeColor` / Theme Color - Content item representing a color pair.
  - `light` - Theme Color Pallet Picker, `Umbraco.ColorPicker.EyeDropper`.
  - `dark` - Theme Color Pallet Picker, `Umbraco.ColorPicker.EyeDropper`.
- `themeColors` / Theme Colors - Organizational content folder for theme color entries.
- `routesFolder` / Routes - Organizational content folder for route/page entries.

### Element Types

- `topNavigation` / Top Navigation - Single-block global navigation component.
  - `navItems` - Navigation Item List, `Umbraco.BlockList`; allows `navItem` blocks.
  - `hideTopNavigation` - True/false, `Umbraco.TrueFalse`.
  - `navItemAlignment` - Component Alignment, `Umbraco.DropDown.Flexible`; options are `Left`, `Center`, `Right`, and `Full`.
- `navItem` / Navigation Item - Reusable navigation link block.
  - `navigationLink` - Navigation Item - Navigation Link - Multi URL Picker, `Umbraco.MultiUrlPicker`; configured for one URL.

### Custom Data Types

- `Image Media Picker` - `Umbraco.MediaPicker3`, one image, image-only filter.
- `Navigation Item - Navigation Link - Multi URL Picker` - `Umbraco.MultiUrlPicker`, one URL.
- `Navigation Item List` - `Umbraco.BlockList`, allows `navItem`.
- `Top Navigation Component` - `Umbraco.SingleBlock`, allows `topNavigation`.
- `Component Alignment` - `Umbraco.DropDown.Flexible`, options `Left`, `Center`, `Right`, `Full`.
- `Theme Color Picker` - `Umbraco.MultiNodeTreePicker`, one `themeColor` content item.
- `Theme Color Pallet Picker` - `Umbraco.ColorPicker.EyeDropper`, palette enabled.

## Commands

Build from the solution root:

```powershell
dotnet build .\Umb17.Portfolio.slnx --no-restore
```

Run from the solution root:

```powershell
dotnet run --project .\src\Umb17.Portfolio.API\Umb17.Portfolio.API.csproj --launch-profile Umb17.Portfolio.API
```

## Known Warnings

The build currently emits NU1903 warnings for upstream/transitive packages:

- `Microsoft.OpenApi 2.4.1`
- `SQLitePCLRaw.lib.e_sqlite3 2.1.11`
