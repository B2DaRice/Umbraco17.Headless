import type { SiteTheme } from '../components/layout/siteTheme'
import type { HomePageModel } from '../generated/umbraco-content-models'

type HomePageConfig = {
  content: HomePageModel
  siteTheme: SiteTheme
}

export function HomePage({ content, siteTheme }: HomePageConfig) {
  const title = content.title ?? content.name
  const subheader = content.subheader || ''
  const bodyHtml = content.summary?.markup || ''

  return (
    <section className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-5xl flex-col justify-center px-6 py-12">
      <p className={`mb-4 text-sm font-medium uppercase tracking-[0.16em] ${siteTheme.primaryTextClassName}`}>
        Umb17 Portfolio
      </p>

      <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">{title}</h1>

      {subheader ? (
        <p className={`mt-6 max-w-2xl text-lg leading-8 opacity-80 ${siteTheme.textClassName}`}>
          {subheader}
        </p>
      ) : null}

      {bodyHtml ? (
        <div
          className={`prose mt-8 max-w-2xl opacity-80 ${siteTheme.textClassName}`}
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      ) : null}

      <p className={`mt-12 max-w-2xl text-sm opacity-60 ${siteTheme.textClassName}`}>
        Rendered from the generated HomePageModel.
      </p>
    </section>
  )
}
