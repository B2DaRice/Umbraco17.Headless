import type {
  UmbracoBlock,
  UmbracoContent,
  UmbracoContentCollection,
  UmbracoRawBlock,
  UmbracoRawBlockContent,
  UmbracoRawContent,
  UmbracoRawContentCollection,
} from '../types/umbraco'

type UnknownRecord = Record<string, unknown>

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isRawBlock(value: unknown): value is UmbracoRawBlock {
  return (
    isRecord(value) &&
    isRecord(value.content) &&
    typeof value.content.contentType === 'string' &&
    isRecord(value.content.properties)
  )
}

function isRawContent(value: unknown): value is UmbracoRawContent {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.contentType === 'string' &&
    typeof value.name === 'string' &&
    isRecord(value.properties)
  )
}

function isItemsContainer(value: unknown): value is { items: unknown[] } {
  return isRecord(value) && Array.isArray(value.items)
}

function normalizePropertyValue(value: unknown): unknown {
  if (isRawBlock(value)) {
    return normalizeBlock(value)
  }

  if (isRawContent(value)) {
    return normalizeContent(value)
  }

  if (isItemsContainer(value)) {
    return value.items.map((item) => normalizePropertyValue(item))
  }

  if (Array.isArray(value)) {
    return value.map((item) => (isRawBlock(item) ? normalizeBlock(item) : normalizePropertyValue(item)))
  }

  if (!isRecord(value)) {
    return value
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, propertyValue]) => [key, normalizePropertyValue(propertyValue)]),
  )
}

function normalizeProperties(properties: UnknownRecord) {
  return Object.fromEntries(
    Object.entries(properties).map(([key, value]) => [key, normalizePropertyValue(value)]),
  )
}

export function normalizeContent<TContent extends UmbracoContent = UmbracoContent>(
  content: UmbracoRawContent | null,
) {
  if (!content) {
    return null
  }

  const properties = normalizeProperties(content.properties)

  return {
    ...content,
    ...properties,
    properties,
  } as TContent
}

export function normalizeContentCollection<
  TContent extends UmbracoContent = UmbracoContent,
>(collection: UmbracoRawContentCollection | null) {
  if (!collection) {
    return null
  }

  return {
    ...collection,
    items: collection.items
      .map((item) => normalizeContent<TContent>(item))
      .filter((item): item is TContent => item !== null),
  } satisfies UmbracoContentCollection
}

export function normalizeBlockContent<TContent extends UmbracoContent = UmbracoContent>(
  content: UmbracoRawBlockContent,
) {
  return normalizeContent<TContent>({
    id: content.id ?? '',
    contentType: content.contentType,
    name: content.name ?? '',
    properties: content.properties,
  })
}

export function normalizeBlock<TContent extends UmbracoContent = UmbracoContent>(
  block: UmbracoRawBlock,
) {
  const content = normalizeBlockContent<TContent>(block.content)

  if (!content) {
    return null
  }

  return {
    ...content,
    settings: block.settings ? normalizeBlockContent(block.settings) ?? undefined : undefined,
  } satisfies UmbracoBlock<TContent>
}

export function findBlockContent<TContent extends UmbracoContent = UmbracoContent>(
  blocks: UmbracoBlock[] | UmbracoBlock | null | undefined,
  contentType: TContent['contentType'],
) {
  console.log("*** findBlockContent\n", blocks, contentType)

  if (!blocks) {
    return undefined
  }

  if (Array.isArray(blocks)) {
    return blocks.find((block) => block.contentType === contentType) as TContent | undefined
  }

  return blocks.contentType === contentType ? (blocks as TContent) : undefined
}
