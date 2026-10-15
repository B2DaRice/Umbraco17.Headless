import type { SyncAction } from './syncActions'

const actionLabels: Record<SyncAction, string> = {
  'add-missing': 'add missing React models',
  'remove-stale': 'remove stale React models',
  'update-changed': 'update changed React models',
}

type ConfirmSyncDialogProps = {
  action: SyncAction
  count: number
  onCancel: () => void
  onContinue: () => void
}

export function ConfirmSyncDialog({
  action,
  count,
  onCancel,
  onContinue,
}: ConfirmSyncDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4">
      <section className="w-full max-w-md rounded-md border border-slate-700 bg-slate-900 p-6 shadow-2xl">
        <h2 className="text-xl font-semibold text-slate-100">Restart Frontend?</h2>
        <p className="mt-3 leading-7 text-slate-300">
          This will {actionLabels[action]} for {count} model{count === 1 ? '' : 's'} and
          restart the frontend application.
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Continue only if you are ready for the dev server to regenerate files and reload.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 hover:border-slate-500"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className="rounded-md bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-200"
            onClick={onContinue}
            type="button"
          >
            Continue
          </button>
        </div>
      </section>
    </div>
  )
}
