# Umb17 Portfolio

Personal portfolio workspace with an Umbraco 17 LTS headless/backoffice API and an independently deployable React frontend.

## Project Shape

- `Umb17.Portfolio.slnx` - solution file for the API project.
- `src/Umb17.Portfolio.API` - Umbraco 17 API/backoffice host.
- `frontend/Umb17.Portfolio.Web.React` - React frontend client.
- `.vscode` - local VS Code launch/tasks for running both projects together.
- `skills.yaml` - concise project handoff instructions for future Codex/chatbot sessions.

## Local Development

Use VS Code **Run and Debug** with the compound launch:

```text
Full Stack: API + React
```

That starts both local servers:

- React frontend: `https://localhost:6317`
- React admin sync route: `https://localhost:6317/admin`
- Umbraco API host: `https://localhost:63177`
- Umbraco backoffice: `https://localhost:63177/umbraco`

The frontend launch waits for the API manifest endpoint before starting Vite. The React app also keeps its splash screen active while waiting for Umbraco, then separately checks for published homepage content.

If the browser warns about local certificates, trust/accept the development certs. For the .NET dev certificate:

```powershell
dotnet dev-certs https --trust
```

## Build Commands

Build the API:

```powershell
dotnet build .\Umb17.Portfolio.slnx --no-restore
```

Build the React frontend:

```powershell
cd .\frontend\Umb17.Portfolio.Web.React
npm.cmd run build
```

Use `npm.cmd` from PowerShell because plain `npm` may be blocked by script execution policy.

VS Code also includes `build: all` and `dev: all` tasks. The debug compound is the preferred full-stack startup path because `Frontend: Dev` waits for the API manifest endpoint before Vite opens the browser; the raw `dev: all` task starts its dependencies in parallel.

## Current Decisions

- Umbraco 17 is used because it is the long-term support line.
- The API and frontend are intentionally separate so the frontend can build and deploy in its own container.
- The API is intrinsically tied only to Umbraco/backoffice and the Delivery API.
- Local dev uses HTTPS for both projects because Umbraco backoffice auth rejects plain HTTP.
- Database configuration uses local SQLite in `appsettings.json`; no local SQL Server connection string is configured.
- Umbraco is the intended source of truth for content structure.
- `main` is expected at `/` as the SPA/global metadata shell for global tags, scripts, header/footer, and SEO-level concerns; the first renderable content page is expected to be a direct `homePage` child.
- The React `/admin` route includes a dev-only Umbraco Sync workflow that compares generated TypeScript model metadata against Umbraco document type metadata, regenerates selected models, restarts Vite, and returns to `/admin`.
- React keeps base Umbraco handshake types loose while generated document/block models provide concrete property typing for page templates.

## Known Warnings

The API build currently emits NU1903 warnings for upstream/transitive packages:

- `Microsoft.OpenApi 2.4.1`
- `SQLitePCLRaw.lib.e_sqlite3 2.1.11`

## Project READMEs

- [API README](src/Umb17.Portfolio.API/README.md)
- [React README](frontend/Umb17.Portfolio.Web.React/README.md)
