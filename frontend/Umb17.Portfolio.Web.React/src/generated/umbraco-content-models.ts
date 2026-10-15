
    import type { UmbracoContent, UmbracoBlock, RichTextValue, NavLink } from '../types/umbraco'

    export type AboutPageModel = UmbracoContent & {
      contentType: 'aboutPage'
        about?: RichTextValue | null
  title?: string | null
    }

export type HomePageModel = UmbracoContent & {
      contentType: 'homePage'
        subheader?: string | null
  summary?: RichTextValue | null
  title?: string | null
    }

export type MainModel = UmbracoContent & {
      contentType: 'main'
        copyrightLabel?: string | null
  topNav?: UmbracoBlock | null
  useFooter?: boolean
    }

export type MonogramIconModel = UmbracoContent & {
      contentType: 'monogramIcon'
        backgroundColor?: ThemeColorModel[] | null
  borderColor?: ThemeColorModel[] | null
  borderRadius?: number | null
  borderWidth?: number | null
  defLetterBorderColor?: ThemeColorModel[] | null
  defLetterBorderWidth?: number | null
  defLetterColor?: ThemeColorModel[] | null
  flipTheme?: boolean
  letterGap?: number | null
  letters?: UmbracoBlock[]
  padding?: number | null
    }

export type MonogramSvgModel = UmbracoContent & {
      contentType: 'monogramSvg'
        borderColor?: ThemeColorModel[] | null
  borderWidth?: number | null
  color?: ThemeColorModel[] | null
  letter?: string | null
  padding?: number | null
  xAxis?: number | null
  yAxis?: number | null
  zIndex?: number | null
    }

export type NavItemModel = UmbracoContent & {
      contentType: 'navItem'
        navigationLink?: NavLink[] | null
    }

export type RoutesFolderModel = UmbracoContent & {
      contentType: 'routesFolder'
      
    }

export type SiteSettingsModel = UmbracoContent & {
      contentType: 'siteSettings'
        mainBgColor?: ThemeColorModel[] | null
  mainTextColor?: ThemeColorModel[] | null
  primaryColor?: ThemeColorModel[] | null
  siteLogo?: string | null
    }

export type ThemeColorModel = UmbracoContent & {
      contentType: 'themeColor'
        dark?: string | null
  light?: string | null
    }

export type ThemeColorsModel = UmbracoContent & {
      contentType: 'themeColors'
      
    }

export type TopNavigationModel = UmbracoContent & {
      contentType: 'topNavigation'
        hideTopNavigation?: boolean
  navItemAlignment?: string | null
  navItems?: UmbracoBlock[]
    }
  
