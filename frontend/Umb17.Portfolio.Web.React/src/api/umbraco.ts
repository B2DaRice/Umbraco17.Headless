import type { UmbracoRawContent, UmbracoRawContentCollection } from '../types/umbraco'
import { normalizeContent, normalizeContentCollection } from './normalizeUmbracoContent'

const apiOrigin = import.meta.env.VITE_UMBRACO_API_ORIGIN ?? 'https://localhost:63177'
const deliveryApiBase = `${apiOrigin}/umbraco/delivery/api/v2`
const manifestEndpoint = `${apiOrigin}/api/frontend/manifest`

type QueryValue = string | number | boolean | undefined

type WaitForUmbracoApiOptions = {
  intervalMs?: number
  timeoutMs?: number
}

function delay(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

function buildUrl(path: string, query?: Record<string, QueryValue>) {
  const url = new URL(`${deliveryApiBase}${path}`)

  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined) {
      url.searchParams.set(key, String(value))
    }
  }

  return url
}

async function getJson<T>(path: string, query?: Record<string, QueryValue>) {
  const response = await fetch(buildUrl(path, query))

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Umbraco Delivery API returned ${response.status}`)
  }

  return (await response.json()) as T
}

export function getApiOrigin() {
  return apiOrigin
}

export async function waitForUmbracoApi({
  intervalMs = 1500,
  timeoutMs = 120000,
}: WaitForUmbracoApiOptions = {}) {
  const startedAt = Date.now()
  let lastError: unknown

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(manifestEndpoint, { cache: 'no-store' })

      if (response.ok) {
        return
      }

      lastError = new Error(`Umbraco API returned ${response.status}`)
    } catch (caughtError) {
      lastError = caughtError
    }

    await delay(intervalMs)
  }

  throw lastError instanceof Error
    ? lastError
    : new Error('Timed out waiting for the Umbraco API')
}

export async function getContentByPath(path: string) {
  return normalizeContent(await getJson<UmbracoRawContent>('/content/item', { path }))
}

export async function getContentChildren(path: string) {
  return normalizeContentCollection(
    await getJson<UmbracoRawContentCollection>('/content', { fetch: 'children:' + path }),
  )
}

export async function getContentByType(contentType: string) {
  return normalizeContentCollection(
    await getJson<UmbracoRawContentCollection>('/content', { filter: `contentType:${contentType}` }),
  )
}
