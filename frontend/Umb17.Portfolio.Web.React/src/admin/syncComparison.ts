import type {
  SyncStatus,
  UmbracoManifest,
  UmbracoManifestContentType,
} from '../types/umbracoManifest'

function byAlias(items: UmbracoManifestContentType[]) {
  return new Map(items.map((item) => [item.alias, item]))
}

function normalizeValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(normalizeValue)
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, childValue]) => [key, normalizeValue(childValue)]),
    )
  }

  return value
}

function getPropertySignature(property: UmbracoManifestContentType['properties'][number]) {
  return normalizeValue({
    alias: property.alias,
    dataTypeConfiguration: property.dataTypeConfiguration,
    dataTypeEditorAlias: property.dataTypeEditorAlias,
    dataTypeEditorUiAlias: property.dataTypeEditorUiAlias,
    dataTypeId: property.dataTypeId,
    dataTypeName: property.dataTypeName,
    mandatory: property.mandatory,
    name: property.name,
    propertyEditorAlias: property.propertyEditorAlias,
    sortOrder: property.sortOrder,
    valueStorageType: property.valueStorageType,
    variesByCulture: property.variesByCulture,
    variesBySegment: property.variesBySegment,
  })
}

function getContentTypeSignature(contentType: UmbracoManifestContentType) {
  const properties = [...contentType.properties]
    .sort((left, right) => left.alias.localeCompare(right.alias))
    .map(getPropertySignature)

  return JSON.stringify({
    alias: contentType.alias,
    isElement: contentType.isElement,
    name: contentType.name,
    properties,
  })
}

function getContentTypeChangeReasons(
  reactContentType: UmbracoManifestContentType,
  umbracoContentType: UmbracoManifestContentType,
) {
  const reactProperties = byPropertyAlias(reactContentType.properties)
  const umbracoProperties = byPropertyAlias(umbracoContentType.properties)
  const reasons: string[] = []

  if (reactContentType.name !== umbracoContentType.name) {
    reasons.push('Changed content type name')
  }

  if (reactContentType.isElement !== umbracoContentType.isElement) {
    reasons.push('Changed content type element/document setting')
  }

  for (const property of reactContentType.properties) {
    if (!umbracoProperties.has(property.alias)) {
      reasons.push(`Removed property ${property.alias}`)
    }
  }

  for (const property of umbracoContentType.properties) {
    const reactProperty = reactProperties.get(property.alias)

    if (!reactProperty) {
      reasons.push(`Added property ${property.alias}`)
      continue
    }

    for (const field of propertyComparisonFields) {
      if (JSON.stringify(normalizeValue(reactProperty[field])) !== JSON.stringify(normalizeValue(property[field]))) {
        reasons.push(`Changed property ${property.alias} ${field}`)
      }
    }
  }

  return reasons
}

function byPropertyAlias(properties: UmbracoManifestContentType['properties']) {
  return new Map(properties.map((property) => [property.alias, property]))
}

const propertyComparisonFields = [
  'name',
  'propertyEditorAlias',
  'valueStorageType',
  'dataTypeId',
  'dataTypeName',
  'dataTypeEditorAlias',
  'dataTypeEditorUiAlias',
  'dataTypeConfiguration',
  'mandatory',
  'variesByCulture',
  'variesBySegment',
  'sortOrder',
] as const

export function compareManifests(
  reactManifest: UmbracoManifest,
  umbracoManifest: UmbracoManifest,
): SyncStatus {
  const reactByAlias = byAlias(reactManifest.contentTypes)
  const umbracoByAlias = byAlias(umbracoManifest.contentTypes)
  const staleReactModels = reactManifest.contentTypes.filter(
    (contentType) => !umbracoByAlias.has(contentType.alias),
  )
  const missingReactModels = umbracoManifest.contentTypes.filter(
    (contentType) => !reactByAlias.has(contentType.alias),
  )
  const changedModels = umbracoManifest.contentTypes.flatMap((umbracoContentType) => {
    const reactContentType = reactByAlias.get(umbracoContentType.alias)

    if (!reactContentType) {
      return []
    }

    if (getContentTypeSignature(reactContentType) === getContentTypeSignature(umbracoContentType)) {
      return []
    }

    return [
      {
        alias: umbracoContentType.alias,
        reasons: getContentTypeChangeReasons(reactContentType, umbracoContentType),
        react: reactContentType,
        umbraco: umbracoContentType,
      },
    ]
  })
  const changedAliases = new Set(changedModels.map((model) => model.alias))
  const syncedModels = umbracoManifest.contentTypes.filter(
    (contentType) => reactByAlias.has(contentType.alias) && !changedAliases.has(contentType.alias),
  )

  return {
    staleReactModels,
    missingReactModels,
    changedModels,
    syncedModels,
  }
}
