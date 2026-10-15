type ApiStatusProps = {
  apiOrigin: string
  error?: string
  isLoading: boolean
  path: string
}

export function ApiStatus({ apiOrigin, error, isLoading, path }: ApiStatusProps) {
  return (
    <aside className="mt-12 rounded-md border border-site-text-light/20 bg-site-text-light/5 p-4 text-sm text-site-text-light/70 dark:border-site-text-dark/20 dark:bg-site-text-dark/5 dark:text-site-text-dark/70">
      <p>
        API origin:{' '}
        <code className="rounded bg-site-text-light/10 px-1.5 py-1 text-site-text-light dark:bg-site-text-dark/10 dark:text-site-text-dark">
          {apiOrigin}
        </code>
      </p>
      <p className="mt-2">
        Content path:{' '}
        <code className="rounded bg-site-text-light/10 px-1.5 py-1 text-site-text-light dark:bg-site-text-dark/10 dark:text-site-text-dark">
          {path}
        </code>
      </p>
      <p className="mt-2">
        Status:{' '}
        <span
          className={
            error
              ? 'font-medium text-site-primary-light dark:text-site-primary-dark'
              : 'font-medium text-site-text-light dark:text-site-text-dark'
          }
        >
          {error ?? (isLoading ? 'checking' : 'complete')}
        </span>
      </p>
    </aside>
  )
}
