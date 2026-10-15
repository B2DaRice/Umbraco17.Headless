import type { MainModel } from '../../generated/umbraco-content-models'
import { siteLayoutConfig } from './siteLayoutConfig'

type SiteFooterProps = {
  className?: string
  mainContent: MainModel
  useDarkTheme?: boolean
}

export function SiteFooter({ className, mainContent, useDarkTheme = false }: SiteFooterProps) {
  if (mainContent.useFooter === false) {
    return null
  }

  const isSticky = false
  const footerClassName = [
    siteLayoutConfig.footer,
    className,
    isSticky ? siteLayoutConfig.footerSticky : '',
  ]
    .filter(Boolean)
    .join(' ')
  const copyrightLabel =
    mainContent.copyrightLabel || `Copyright ${new Date().getFullYear()} Umb17 Portfolio`

  return (
    <footer className={footerClassName} data-theme={useDarkTheme ? 'dark' : 'light'}>
      <div className={siteLayoutConfig.footerInner}>
        <p className={siteLayoutConfig.footerText}>{copyrightLabel}</p>
      </div>
    </footer>
  )
}
