export function RestartSplash() {
  return (
    <main className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
      <section className="flex flex-col items-center text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-cyan-300" />
        <h1 className="mt-6 text-2xl font-semibold">Please Wait While the Application Restarts</h1>
        <p className="mt-3 max-w-md leading-7 text-slate-400">
          The Umbraco models are being regenerated and the frontend dev server is reloading.
        </p>
      </section>
    </main>
  )
}
