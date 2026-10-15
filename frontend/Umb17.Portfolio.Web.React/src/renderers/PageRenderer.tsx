import type { ComponentType } from 'react'
import type { SiteTheme } from '../components/layout/siteTheme'
import type { HomePageModel } from '../generated/umbraco-content-models'
import { HomePage } from '../pages/HomePage'
import { UnknownPage } from '../pages/UnknownPage'
import type { UmbracoContent } from '../types/umbraco'

type PageComponent = ComponentType<{ content: UmbracoContent; siteTheme: SiteTheme }>

const pageComponents: Record<string, PageComponent> = {
  homePage: ({ content, siteTheme }) => (
    <HomePage content={content as HomePageModel} siteTheme={siteTheme} />
  ),
}

type PageRendererProps = {
  content: UmbracoContent
  siteTheme: SiteTheme
}

export function PageRenderer({ content, siteTheme }: PageRendererProps) {
  const Component = pageComponents[content.contentType] ?? UnknownPage

  return <Component content={content} siteTheme={siteTheme} />
}
