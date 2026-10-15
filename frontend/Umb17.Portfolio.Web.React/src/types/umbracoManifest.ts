export type UmbracoManifestProperty = {
  alias: string
  name?: string
  propertyEditorAlias: string
  valueStorageType: string
  dataTypeId?: number
  dataTypeName?: string
  dataTypeEditorAlias?: string
  dataTypeEditorUiAlias?: string
  dataTypeConfiguration?: unknown
  mandatory?: boolean
  variesByCulture?: boolean
  variesBySegment?: boolean
  sortOrder?: number
}

export type UmbracoManifestContentType = {
  alias: string
  name?: string
  isElement: boolean
  properties: UmbracoManifestProperty[]
}

export type UmbracoManifest = {
  generatedAt: string
  contentTypes: UmbracoManifestContentType[]
}

export type SyncStatus = {
  staleReactModels: UmbracoManifestContentType[]
  missingReactModels: UmbracoManifestContentType[]
  changedModels: Array<{
    alias: string
    reasons: string[]
    react: UmbracoManifestContentType
    umbraco: UmbracoManifestContentType
  }>
  syncedModels: UmbracoManifestContentType[]
}
