import { reactModelManifest } from '../generated/umbraco-model-manifest'
import type { ThemeColorModel } from '../generated/umbraco-content-models'
import type { UmbracoManifestContentType } from '../types/umbracoManifest'

export type SyncAction = 'remove-stale' | 'add-missing' | 'update-changed'

export async function runUmbracoSync(action: SyncAction, models: UmbracoManifestContentType[]) {
  const response = await fetch('/__admin/umbraco-sync', {
    body: JSON.stringify({
      action,
      models,
      reactManifest: reactModelManifest,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  if (!response.ok) {
    const body = (await response.json().catch(() => undefined)) as { error?: string } | undefined

    throw new Error(body?.error ?? `Sync endpoint returned ${response.status}`)
  }
}

export async function runUmbracoThemeColorSync(themeColors: ThemeColorModel[]) {
  const response = await fetch('/__admin/theme-color-sync', {
    body: JSON.stringify({ themeColors }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  if (!response.ok) {
    const body = (await response.json().catch(() => undefined)) as { error?: string } | undefined

    throw new Error(body?.error ?? `Theme color sync endpoint returned ${response.status}`)
  }
}

export async function waitForFrontendRestart() {
  const deadline = Date.now() + 30000

  while (Date.now() < deadline) {
    try {
      const response = await fetch('/__admin/health', { cache: 'no-store' })

      if (response.ok) {
        return
      }
    } catch {
      // The dev server is expected to disappear briefly while Vite restarts.
    }

    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  throw new Error('Timed out waiting for the frontend dev server to restart')
}
