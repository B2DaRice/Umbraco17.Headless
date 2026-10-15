export type UmbracoRawContent = {
  id: string
  contentType: string
  name: string
  route?: {
    path: string
    startItem?: {
      id: string
      path: string
    }
  }
  properties: Record<string, unknown>
}

export type UmbracoContent = UmbracoRawContent & Record<string, unknown>

export type UmbracoRawContentCollection = {
  total: number
  items: UmbracoRawContent[]
}

export type UmbracoContentCollection = {
  total: number
  items: UmbracoContent[]
}

export type UmbracoRawBlockContent = {
  contentType: string
  id?: string
  name?: string
  properties: Record<string, unknown>
}

export type UmbracoRawBlock = {
  content: UmbracoRawBlockContent
  settings?: UmbracoRawBlockContent
}

export type UmbracoBlock<
  TContent extends UmbracoContent = UmbracoContent,
  TSettings extends UmbracoContent = UmbracoContent,
> = TContent & {
  settings?: TSettings
}

export type RichTextValue = {
  markup?: string | null
  blocks?: UmbracoBlock[]
}

export type NavLink = {
  destinationId?: string | null
  destinationType?: string | null
  linkType?: string | null
  queryString?: string | null
  route: {
    path: string
    startItem?: {
      id: string
      path: string
    }
  }
  target?: string | null
  title?: string | null
  url?: string | null
}
