import { useState } from 'react'
import { findBlockContent } from '../../api/normalizeUmbracoContent'
import { useGlobalState } from '../../state/globalStateContext'
import { MonogramIcon } from '../brand/MonogramIcon'
import { getSiteTheme } from '../layout/siteTheme'
import type {
  MainModel,
  MonogramIconModel,
  NavItemModel,
  SiteSettingsModel,
  ThemeColorModel,
  TopNavigationModel,
} from '../../generated/umbraco-content-models'

type TopNavProps = {
  mainContent: MainModel
  monogramIcon?: MonogramIconModel | null
  siteSettings?: SiteSettingsModel | null
  themeColors?: ThemeColorModel[]
}

const topNavClasses = {
  root: 'sticky top-0 z-30 border-b backdrop-blur',
  inner: 'mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-6 px-6 py-3',
  brand: 'text-sm font-semibold uppercase',
  list: 'flex flex-wrap items-center gap-2',
  link: 'rounded-md px-3 py-2 text-sm font-medium transition',
  actions: 'relative flex items-center gap-2',
  iconButton:
    'inline-flex h-10 w-10 items-center justify-center rounded-md border shadow-sm transition',
  settingsPanel:
    'absolute right-0 top-12 z-40 w-64 rounded-md border p-4 shadow-xl',
  settingsPanelTitle: 'text-sm font-semibold',
  settingsRow: 'mt-4 flex items-center justify-between gap-4',
  settingsLabel: 'text-sm font-medium',
  switchRoot: 'relative inline-flex h-6 w-11 cursor-pointer items-center',
  switchInput: 'peer sr-only',
  switchTrack:
    'absolute inset-0 rounded-full border border-site-text-light/50 bg-site-bg-light shadow-inner transition-colors peer-checked:border-site-primary-light peer-checked:bg-site-primary-light dark:border-site-text-dark/50 dark:bg-site-bg-dark dark:peer-checked:border-site-primary-dark dark:peer-checked:bg-site-primary-dark',
  switchThumb:
    'pointer-events-none relative z-10 ml-0.5 h-5 w-5 rounded-full border border-site-text-light/30 bg-site-text-light shadow-sm transition-transform peer-checked:translate-x-5 peer-checked:border-site-bg-light/30 peer-checked:bg-site-bg-light dark:border-site-text-dark/30 dark:bg-site-text-dark dark:peer-checked:border-site-bg-dark/30 dark:peer-checked:bg-site-bg-dark',
}

function getTopNavigation(blocks: MainModel['topNav']) {
  const normalized = findBlockContent<TopNavigationModel>(blocks, 'topNavigation')
  console.log("*** topNav Normalized\n", normalized)
  return normalized
}

function getNavigationHref(navItem: NavItemModel) {
  return navItem.navigationLink?.[0]?.route.path || '#'
}

function getNavigationLabel(navItem: NavItemModel) {
  return navItem.navigationLink?.[0]?.title || navItem.name || 'Navigation item'
}

function getTopNavAlignmentClass(
  alignment: TopNavigationModel['navItemAlignment'],
) {
  switch (alignment) {
    case 'Left':
      return 'justify-start'
    case 'Center':
      return 'justify-center'
    case 'Full':
      return 'flex-1 justify-between'
    case 'Right':
    default:
      return 'justify-end'
  }
}

export function TopNav({ mainContent, monogramIcon, siteSettings, themeColors }: TopNavProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const { useDarkTheme, setUseDarkTheme } = useGlobalState()
  const topNavigation = getTopNavigation(mainContent.topNav)

  if (!topNavigation || topNavigation.hideTopNavigation) {
    return null
  }

  const alignmentClass = getTopNavAlignmentClass(topNavigation.navItemAlignment)
  const siteLogo = siteSettings?.siteLogo
  const siteTheme = getSiteTheme({ siteSettings, themeColors })
  const rootClassName = [
    topNavClasses.root,
    siteTheme.bgClassName,
    siteTheme.borderClassName,
    siteTheme.textClassName,
  ].join(' ')
  const interactiveClassName = [
    siteTheme.bgClassName,
    siteTheme.borderClassName,
    siteTheme.textClassName,
    'hover:bg-site-text-light hover:text-site-bg-light dark:hover:bg-site-text-dark dark:hover:text-site-bg-dark',
  ].join(' ')
  const panelClassName = [
    topNavClasses.settingsPanel,
    siteTheme.bgClassName,
    siteTheme.borderClassName,
    siteTheme.textClassName,
  ].join(' ')
  const navItems = topNavigation.navItems ?? []

  return (
    <header className={rootClassName} data-theme={useDarkTheme ? 'dark' : 'light'}>
      <nav aria-label="Primary navigation" className={topNavClasses.inner}>
        <a className={topNavClasses.brand} href="/">
          {siteLogo ? (
            <img alt="Home" className="h-10 w-auto" src={siteLogo} />
          ) : (
            <MonogramIcon
              className="h-10 w-auto"
              icon={monogramIcon}
              themeColors={themeColors}
              useDarkTheme={useDarkTheme}
            />
          )}
        </a>

        <div className={topNavClasses.actions}>
          {navItems.length ? (
            <div className={`${topNavClasses.list} ${alignmentClass}`}>
              {navItems.map((block, index) => {
                const navItem = block as NavItemModel
                const href = getNavigationHref(navItem)
                const label = getNavigationLabel(navItem)
                console.log("*** navItem\n", navItem)
                return (
                  <a
                    className={`${topNavClasses.link} ${siteTheme.textClassName}`}
                    href={href}
                    key={navItem.id ?? index}
                  >
                    {label}
                  </a>
                )
              })}
            </div>
          ) : null}

          <button
            aria-expanded={isSettingsOpen}
            aria-label="Open display settings"
            className={`${topNavClasses.iconButton} ${interactiveClassName}`}
            onClick={() => setIsSettingsOpen((current) => !current)}
            type="button"
          >
            <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
              <path
                d="M12 8.25A3.75 3.75 0 1 0 12 15.75 3.75 3.75 0 0 0 12 8.25Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M19.43 12.98c.04-.32.07-.65.07-.98s-.02-.66-.07-.98l2.04-1.58-1.94-3.36-2.4.97a7.63 7.63 0 0 0-1.7-.98L15.06 3.5h-3.88l-.36 2.57c-.61.24-1.18.57-1.7.98l-2.4-.97-1.94 3.36 2.04 1.58c-.04.32-.07.65-.07.98s.02.66.07.98l-2.04 1.58 1.94 3.36 2.4-.97c.52.41 1.09.74 1.7.98l.36 2.57h3.88l.36-2.57c.61-.24 1.18-.57 1.7-.98l2.4.97 1.94-3.36-2.04-1.58Z"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            </svg>
          </button>

          {isSettingsOpen ? (
            <div className={panelClassName}>
              <p className={topNavClasses.settingsPanelTitle}>Display settings</p>
              <div className={topNavClasses.settingsRow}>
                <span className={topNavClasses.settingsLabel}>Dark theme</span>
                <label className={topNavClasses.switchRoot}>
                  <input
                    aria-label="Use dark theme"
                    checked={useDarkTheme}
                    className={topNavClasses.switchInput}
                    onChange={(event) => setUseDarkTheme(event.currentTarget.checked)}
                    role="switch"
                    type="checkbox"
                  />
                  <span aria-hidden="true" className={topNavClasses.switchTrack} />
                  <span aria-hidden="true" className={topNavClasses.switchThumb} />
                </label>
              </div>
            </div>
          ) : null}
        </div>
      </nav>
    </header>
  )
}
