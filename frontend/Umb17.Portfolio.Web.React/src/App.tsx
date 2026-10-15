import { useEffect, useState } from 'react'
import { AdminSyncPage } from './admin/AdminSyncPage'
import {
  getApiOrigin,
  getContentByPath,
  getContentByType,
  getContentChildren,
  waitForUmbracoApi,
} from './api/umbraco'
import { ApiStatus } from './components/ApiStatus'
import { SiteFooter } from './components/layout/SiteFooter'
import { siteLayoutConfig } from './components/layout/siteLayoutConfig'
import { getSiteTheme } from './components/layout/siteTheme'
import { TopNav } from './components/navigation/TopNav'
import type {
  MainModel,
  MonogramIconModel,
  SiteSettingsModel,
  ThemeColorModel,
} from './generated/umbraco-content-models'
import { PageRenderer } from './renderers/PageRenderer'
import { useGlobalState } from './state/globalStateContext'
import type { UmbracoContent } from './types/umbraco'

const apiOrigin = getApiOrigin()
const backofficeUrl = `${apiOrigin}/umbraco`
const deliveryEndpoint = `${apiOrigin}/umbraco/delivery/api/v2/content`
const contentPath = '/'
const contentRetryTimeoutMs = 30000
const contentRetryIntervalMs = 1500

function App() {
  if (window.location.pathname === '/admin') {
    return <AdminSyncPage />
  }

  return <SiteApp />
}

function SiteApp() {
  const { useDarkTheme } = useGlobalState()
  const [mainContent, setMainContent] = useState<MainModel | null>(null)
  const [monogramIcon, setMonogramIcon] = useState<MonogramIconModel | null>(null)
  const [siteSettings, setSiteSettings] = useState<SiteSettingsModel | null>(null)
  const [themeColors, setThemeColors] = useState<ThemeColorModel[]>([])
  const [content, setContent] = useState<UmbracoContent | null>(null)
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState('Waiting for the Umbraco API.')
  const [emptyMessage, setEmptyMessage] = useState('No Main content found yet.')

  useEffect(() => {
    let isCurrent = true

    function wait(ms: number) {
      return new Promise((resolve) => window.setTimeout(resolve, ms))
    }

    async function loadContentWithRetry() {
      const startedAt = Date.now()
      let lastError: unknown

      while (Date.now() - startedAt < contentRetryTimeoutMs) {
        try {
          const mainResult = await getContentByPath(contentPath)

          if (!mainResult) {
            return {
              emptyMessage: 'No Main content found yet.',
              main: null,
              monogramIcon: null,
              page: null,
              siteSettings: null,
              themeColors: [],
            }
          }

          if (mainResult.contentType !== 'main') {
            return {
              emptyMessage: 'Expected Main content at /.',
              main: null,
              monogramIcon: null,
              page: null,
              siteSettings: null,
              themeColors: [],
            }
          }

          const children = await getContentChildren(contentPath)
          const homePage = children?.items.find((item) => item.contentType === 'homePage') ?? null
          const siteSettingsResult = await getContentByType('siteSettings')
          const firstSiteSettings =
            siteSettingsResult?.items.find((item) => item.contentType === 'siteSettings') ?? null
          const monogramIconResult = await getContentByType('monogramIcon')
          const firstMonogramIcon =
            monogramIconResult?.items.find((item) => item.contentType === 'monogramIcon') ?? null
          const themeColorResult = await getContentByType('themeColor')

          console.log("*** monogramIconResult\n", firstMonogramIcon)

          return {
            emptyMessage: homePage
              ? undefined
              : 'No Home Page child found under Main yet.',
            main: mainResult as MainModel,
            monogramIcon: firstMonogramIcon as MonogramIconModel | null,
            page: homePage,
            siteSettings: firstSiteSettings as SiteSettingsModel | null,
            themeColors: (themeColorResult?.items ?? []) as ThemeColorModel[],
          }
        } catch (caughtError) {
          lastError = caughtError
          await wait(contentRetryIntervalMs)
        }
      }

      throw lastError instanceof Error ? lastError : new Error('Unable to load content')
    }

    async function loadContent() {
      try {
        setLoadingMessage('Waiting for the Umbraco API.')
        await waitForUmbracoApi()

        if (isCurrent) {
          setLoadingMessage('Checking the API for content.')
        }

        const contentResult = await loadContentWithRetry()

        if (isCurrent) {
          setMainContent(contentResult.main)
          setMonogramIcon(contentResult.monogramIcon)
          setContent(contentResult.page)
          setSiteSettings(contentResult.siteSettings)
          setThemeColors(contentResult.themeColors)

          if (contentResult.emptyMessage) {
            setEmptyMessage(contentResult.emptyMessage)
          }
        }
      } catch (caughtError) {
        if (isCurrent) {
          setError(caughtError instanceof Error ? caughtError.message : 'Unable to load content')
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false)
        }
      }
    }

    void loadContent()

    return () => {
      isCurrent = false
    }
  }, [])

  if (mainContent && content) {
    const siteTheme = getSiteTheme({ siteSettings, themeColors })
    const shellClassName = [
      siteLayoutConfig.shell,
      siteTheme.bgClassName,
      siteTheme.textClassName,
    ].join(' ')
    const headerClassName = [
      siteLayoutConfig.header,
      siteTheme.bgClassName,
      siteTheme.textClassName,
    ].join(' ')
    const contentClassName = [
      siteLayoutConfig.content,
      siteTheme.bgClassName,
      siteTheme.textClassName,
    ].join(' ')
    const footerClassName = [
      siteTheme.bgClassName,
      siteTheme.borderClassName,
      siteTheme.textClassName,
    ].join(' ')

    return (
      <div
        className={shellClassName}
        data-theme={useDarkTheme ? 'dark' : 'light'}
      >
        <div className={headerClassName} data-theme={useDarkTheme ? 'dark' : 'light'}>
          <TopNav
            mainContent={mainContent}
            monogramIcon={monogramIcon}
            siteSettings={siteSettings}
            themeColors={themeColors}
          />
        </div>
        <main className={contentClassName} data-theme={useDarkTheme ? 'dark' : 'light'}>
          <PageRenderer content={content} siteTheme={siteTheme} />
        </main>
        <SiteFooter
          className={footerClassName}
          mainContent={mainContent}
          useDarkTheme={useDarkTheme}
        />
      </div>
    )
  }

  return (
    <main
      className="min-h-screen bg-site-bg-light text-site-text-light dark:bg-site-bg-dark dark:text-site-text-dark"
      data-theme={useDarkTheme ? 'dark' : 'light'}
    >
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-12">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.16em] text-site-primary-light dark:text-site-primary-dark">
          Umb17 Portfolio
        </p>

        {isLoading ? (
          <div className="mb-8 h-12 w-12 animate-spin rounded-full border-4 border-site-text-light/20 border-t-site-primary-light dark:border-site-text-dark/20 dark:border-t-site-primary-dark" />
        ) : null}

        <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
          {isLoading ? loadingMessage : emptyMessage}
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-site-text-light/80 dark:text-site-text-dark/80">
          {isLoading
            ? 'The React app is asking Umbraco for the SPA shell and initial content page.'
            : 'Create and publish Main at / with a Home Page child, then refresh this frontend to render it through the React page registry.'}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            className="rounded-md bg-site-primary-light px-4 py-2.5 text-sm font-medium text-site-bg-light transition hover:bg-site-text-light hover:text-site-bg-light dark:bg-site-primary-dark dark:text-site-bg-dark dark:hover:bg-site-text-dark dark:hover:text-site-bg-dark"
            href={backofficeUrl}
          >
            Open Backoffice
          </a>
          <a
            className="rounded-md border border-site-text-light/40 px-4 py-2.5 text-sm font-medium text-site-text-light transition hover:border-site-primary-light hover:text-site-primary-light dark:border-site-text-dark/40 dark:text-site-text-dark dark:hover:border-site-primary-dark dark:hover:text-site-primary-dark"
            href={deliveryEndpoint}
          >
            Delivery API
          </a>
        </div>

        <dl className="mt-12 grid gap-4 sm:grid-cols-3">
          {mainContent ? (
            <div>
              <dt className="text-sm font-medium text-site-text-light/60 dark:text-site-text-dark/60">SPA Shell</dt>
              <dd className="mt-1 text-base font-semibold">{mainContent.name}</dd>
            </div>
          ) : null}
          <div>
            <dt className="text-sm font-medium text-site-text-light/60 dark:text-site-text-dark/60">Frontend</dt>
            <dd className="mt-1 text-base font-semibold">React + TypeScript</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-site-text-light/60 dark:text-site-text-dark/60">Styling</dt>
            <dd className="mt-1 text-base font-semibold">Tailwind CSS</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-site-text-light/60 dark:text-site-text-dark/60">CMS</dt>
            <dd className="mt-1 text-base font-semibold">Umbraco 17 LTS</dd>
          </div>
        </dl>

        <ApiStatus apiOrigin={apiOrigin} error={error} isLoading={isLoading} path={contentPath} />
      </section>
    </main>
  )
}

export default App
