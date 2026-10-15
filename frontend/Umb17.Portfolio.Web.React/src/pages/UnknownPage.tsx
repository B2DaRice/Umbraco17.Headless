import type { SiteTheme } from '../components/layout/siteTheme'
import type { UmbracoContent } from '../types/umbraco'

type UnknownPageProps = {
  content: UmbracoContent
  siteTheme: SiteTheme
}

export function UnknownPage({ content, siteTheme }: UnknownPageProps) {
  const codeClassName = [
    'rounded px-1.5 py-1 text-sm',
    siteTheme.textClassName,
    'bg-site-text-light/10 dark:bg-site-text-dark/10',
  ].join(' ')

  return (
    <main className={`min-h-screen ${siteTheme.bgClassName} ${siteTheme.textClassName}`}>
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-12">
        <p className={`mb-4 text-sm font-medium uppercase tracking-[0.16em] ${siteTheme.primaryTextClassName}`}>
          Umb17 Portfolio
        </p>

        <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
          {content.name}
        </h1>

        <p className={`mt-6 max-w-2xl text-lg leading-8 opacity-80 ${siteTheme.textClassName}`}>
          No React page component is registered for the Umbraco content type{' '}
          <code className={codeClassName}>{content.contentType}</code>
          .
        </p>
      </section>
    </main>
  )
}
