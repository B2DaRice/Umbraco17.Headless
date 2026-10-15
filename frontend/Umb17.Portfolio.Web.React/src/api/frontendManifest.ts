import { getApiOrigin } from './umbraco'
import type { UmbracoManifest } from '../types/umbracoManifest'

export async function getUmbracoManifest() {
  const response = await fetch(`${getApiOrigin()}/api/frontend/manifest`)

  if (!response.ok) {
    throw new Error(`Manifest endpoint returned ${response.status}`)
  }

  return (await response.json()) as UmbracoManifest
}
