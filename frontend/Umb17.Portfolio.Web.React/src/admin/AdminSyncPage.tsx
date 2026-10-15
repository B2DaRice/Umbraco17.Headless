import { useEffect, useMemo, useState } from 'react'
import { getApiOrigin, getContentByType } from '../api/umbraco'
import { getUmbracoManifest } from '../api/frontendManifest'
import type { ThemeColorModel } from '../generated/umbraco-content-models'
import { reactModelManifest } from '../generated/umbraco-model-manifest'
import { ConfirmSyncDialog } from './ConfirmSyncDialog'
import { RestartSplash } from './RestartSplash'
import { compareManifests } from './syncComparison'
import {
  runUmbracoSync,
  runUmbracoThemeColorSync,
  waitForFrontendRestart,
  type SyncAction,
} from './syncActions'
import type { SyncStatus, UmbracoManifest } from '../types/umbracoManifest'

function SyncList({
  action,
  actionId,
  description,
  isDisabled,
  items,
  models,
  onSync,
  reasonMap,
  title,
}: {
  action: string
  actionId?: SyncAction
  description: string
  isDisabled?: boolean
  items: string[]
  models?: SyncListModel[]
  onSync?: (action: SyncAction, models: SyncListModel[]) => void
  reasonMap?: Map<string, string[]>
  title: string
}) {
  const canRun = Boolean(actionId && models?.length && onSync && !isDisabled)

  return (
    <section className="rounded-md border border-slate-800 bg-slate-900 p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p>
        </div>
        <button
          className={
            canRun
              ? 'rounded-md bg-cyan-300 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-200'
              : 'rounded-md border border-slate-700 px-3 py-2 text-sm font-medium text-slate-500'
          }
          disabled={!canRun}
          onClick={() => {
            if (actionId && models?.length && onSync) {
              onSync(actionId, models)
            }
          }}
          type="button"
        >
          {action}
        </button>
      </div>

      {items.length ? (
        <ul className="mt-4 space-y-2">
          {items.map((item) => (
            <li className="rounded bg-slate-950 px-3 py-2 font-mono text-sm text-cyan-200" key={item}>
              <p>{item}</p>
              {reasonMap?.get(item)?.length ? (
                <ul className="mt-2 space-y-1 font-sans text-xs leading-5 text-slate-400">
                  {reasonMap.get(item)?.map((reason) => (
                    <li key={reason}>{reason}</li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 rounded bg-slate-950 px-3 py-2 text-sm text-slate-500">None</p>
      )}
    </section>
  )
}

type SyncListModel = SyncStatus['staleReactModels'][number]

function ThemeColorSyncPanel({
  isDisabled,
  onSync,
  themeColors,
}: {
  isDisabled?: boolean
  onSync: () => void
  themeColors: ThemeColorModel[]
}) {
  const canRun = themeColors.length > 0 && !isDisabled

  return (
    <section className="rounded-md border border-slate-800 bg-slate-900 p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-100">Theme Colors</h2>
          <p className="mt-1 text-sm leading-6 text-slate-400">
            Generate Tailwind theme color tokens from published Umbraco Theme Color content.
          </p>
        </div>
        <button
          className={
            canRun
              ? 'rounded-md bg-cyan-300 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-200'
              : 'rounded-md border border-slate-700 px-3 py-2 text-sm font-medium text-slate-500'
          }
          disabled={!canRun}
          onClick={onSync}
          type="button"
        >
          Sync theme colors
        </button>
      </div>

      {themeColors.length ? (
        <ul className="mt-4 space-y-2">
          {themeColors.map((themeColor) => (
            <li className="rounded bg-slate-950 px-3 py-2 font-mono text-sm text-cyan-200" key={themeColor.id}>
              {themeColor.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 rounded bg-slate-950 px-3 py-2 text-sm text-slate-500">
          No published Theme Color content found.
        </p>
      )}
    </section>
  )
}

function getSyncStatus(umbracoManifest: UmbracoManifest | null): SyncStatus | null {
  if (!umbracoManifest) {
    return null
  }

  return compareManifests(reactModelManifest, umbracoManifest)
}

export function AdminSyncPage() {
  const [umbracoManifest, setUmbracoManifest] = useState<UmbracoManifest | null>(null)
  const [themeColors, setThemeColors] = useState<ThemeColorModel[]>([])
  const [pendingSync, setPendingSync] = useState<{
    action: SyncAction
    models: SyncListModel[]
  }>()
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(true)
  const [isRestarting, setIsRestarting] = useState(false)
  const syncStatus = useMemo(() => getSyncStatus(umbracoManifest), [umbracoManifest])
  const changedModelReasons = useMemo(
    () =>
      new Map(syncStatus?.changedModels.map((model) => [model.alias, model.reasons]) ?? []),
    [syncStatus],
  )

  useEffect(() => {
    let isCurrent = true

    async function loadManifest() {
      try {
        const [manifest, themeColorResult] = await Promise.all([
          getUmbracoManifest(),
          getContentByType('themeColor'),
        ])

        if (isCurrent) {
          setUmbracoManifest(manifest)
          setThemeColors((themeColorResult?.items ?? []) as ThemeColorModel[])
        }
      } catch (caughtError) {
        if (isCurrent) {
          setError(caughtError instanceof Error ? caughtError.message : 'Unable to load manifest')
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false)
        }
      }
    }

    void loadManifest()

    return () => {
      isCurrent = false
    }
  }, [])

  async function confirmSync() {
    if (!pendingSync) {
      return
    }

    setIsRestarting(true)
    setError(undefined)

    try {
      await runUmbracoSync(pendingSync.action, pendingSync.models)
      await waitForFrontendRestart()
      window.location.assign('/admin')
    } catch (caughtError) {
      setIsRestarting(false)
      setPendingSync(undefined)
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to sync models')
    }
  }

  async function syncThemeColors() {
    setIsRestarting(true)
    setError(undefined)

    try {
      await runUmbracoThemeColorSync(themeColors)
      await waitForFrontendRestart()
      window.location.assign('/admin')
    } catch (caughtError) {
      setIsRestarting(false)
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to sync theme colors')
    }
  }

  if (isRestarting) {
    return <RestartSplash />
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="flex flex-wrap items-start justify-between gap-6 border-b border-slate-800 pb-8">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-cyan-300">
              Admin
            </p>
            <h1 className="text-3xl font-semibold sm:text-5xl">Umbraco Sync</h1>
            <p className="mt-4 max-w-2xl leading-7 text-slate-400">
              Compare generated React models against Umbraco document type metadata and sync
              selected changes into the local generated TypeScript models.
            </p>
          </div>
          <a
            className="rounded-md border border-slate-700 px-3 py-2 text-sm font-medium text-slate-300 hover:border-cyan-300 hover:text-cyan-200"
            href="/"
          >
            View site
          </a>
        </div>

        <div className="mt-6 grid gap-3 text-sm text-slate-400 sm:grid-cols-3">
          <p>
            API origin: <span className="font-mono text-slate-200">{getApiOrigin()}</span>
          </p>
          <p>
            React models:{' '}
            <span className="font-mono text-slate-200">
              {reactModelManifest.contentTypes.length}
            </span>
          </p>
          <p>
            Umbraco models:{' '}
            <span className="font-mono text-slate-200">
              {umbracoManifest?.contentTypes.length ?? 0}
            </span>
          </p>
          <p>
            Theme colors: <span className="font-mono text-slate-200">{themeColors.length}</span>
          </p>
        </div>

        {isLoading ? (
          <div className="mt-10 flex items-center gap-4 rounded-md border border-slate-800 bg-slate-900 p-5">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-cyan-300" />
            <p className="text-slate-300">Checking Umbraco for document type metadata.</p>
          </div>
        ) : null}

        {error ? (
          <div className="mt-10 rounded-md border border-red-900 bg-red-950/40 p-5 text-red-200">
            {error}
          </div>
        ) : null}

        {syncStatus ? (
          <div className="mt-10 grid gap-4">
            <ThemeColorSyncPanel
              isDisabled={isRestarting}
              onSync={() => void syncThemeColors()}
              themeColors={themeColors}
            />
            <SyncList
              action="Remove stale"
              actionId="remove-stale"
              description="React models that no longer have a matching Umbraco content type."
              isDisabled={isRestarting}
              items={syncStatus.staleReactModels.map((model) => model.alias)}
              models={syncStatus.staleReactModels}
              onSync={(actionId, models) => setPendingSync({ action: actionId, models })}
              title="Stale React Models"
            />
            <SyncList
              action="Add missing"
              actionId="add-missing"
              description="Umbraco content types that do not have generated React models yet."
              isDisabled={isRestarting}
              items={syncStatus.missingReactModels.map((model) => model.alias)}
              models={syncStatus.missingReactModels}
              onSync={(actionId, models) => setPendingSync({ action: actionId, models })}
              title="Missing React Models"
            />
            <SyncList
              action="Update changed"
              actionId="update-changed"
              description="Aliases found in both places with different property structure."
              items={syncStatus.changedModels.map((model) => model.alias)}
              isDisabled={isRestarting}
              models={syncStatus.changedModels.map((model) => model.umbraco)}
              onSync={(actionId, models) => setPendingSync({ action: actionId, models })}
              reasonMap={changedModelReasons}
              title="Changed Models"
            />
            <SyncList
              action="No action"
              description="Models that currently match between React and Umbraco."
              items={syncStatus.syncedModels.map((model) => model.alias)}
              title="Synced Models"
            />
          </div>
        ) : null}

        {pendingSync ? (
          <ConfirmSyncDialog
            action={pendingSync.action}
            count={pendingSync.models.length}
            onCancel={() => setPendingSync(undefined)}
            onContinue={() => void confirmSync()}
          />
        ) : null}
      </section>
    </main>
  )
}
