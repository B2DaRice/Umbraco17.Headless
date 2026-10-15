import type { SiteSettingsModel, ThemeColorModel } from '../../generated/umbraco-content-models'
import { resolveThemeColorClass } from '../brand/monogramTheme'

export type SiteTheme = {
  bgClassName: string
  borderClassName: string
  primaryBgClassName: string
  primaryTextClassName: string
  textClassName: string
}

export function getSiteTheme({
  siteSettings,
  themeColors,
}: {
  siteSettings?: SiteSettingsModel | null
  themeColors?: ThemeColorModel[]
}) {
  return {
    bgClassName: resolveThemeColorClass({
      fallbackClassName: 'bg-site-bg-light dark:bg-site-bg-dark',
      themeColors,
      utility: 'bg',
      value: siteSettings?.mainBgColor,
    }),
    borderClassName: resolveThemeColorClass({
      fallbackClassName: 'border-site-text-light dark:border-site-text-dark',
      themeColors,
      utility: 'border',
      value: siteSettings?.mainTextColor,
    }),
    primaryBgClassName: resolveThemeColorClass({
      fallbackClassName: 'bg-site-primary-light dark:bg-site-primary-dark',
      themeColors,
      utility: 'bg',
      value: siteSettings?.primaryColor,
    }),
    primaryTextClassName: resolveThemeColorClass({
      fallbackClassName: 'text-site-primary-light dark:text-site-primary-dark',
      themeColors,
      utility: 'text',
      value: siteSettings?.primaryColor,
    }),
    textClassName: resolveThemeColorClass({
      fallbackClassName: 'text-site-text-light dark:text-site-text-dark',
      themeColors,
      utility: 'text',
      value: siteSettings?.mainTextColor,
    }),
  } as SiteTheme
}
