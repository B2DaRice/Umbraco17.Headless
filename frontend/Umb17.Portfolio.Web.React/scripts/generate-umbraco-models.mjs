import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const projectRoot = process.cwd()
const generatedRoot = path.join(projectRoot, 'src', 'generated')
const manifestPath = path.join(generatedRoot, 'umbraco-model-manifest.ts')
const modelsPath = path.join(generatedRoot, 'umbraco-content-models.ts')

function readStdin() {
  return new Promise((resolve, reject) => {
    let input = ''

    process.stdin.setEncoding('utf8')
    process.stdin.on('data', (chunk) => {
      input += chunk
    })
    process.stdin.on('end', () => resolve(input))
    process.stdin.on('error', reject)
  })
}

function toPascalCase(value) {
  const fallback = 'Generated'
  const parts = String(value)
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)

  const name = parts
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')

  return name || fallback
}

function sortManifest(contentTypes) {
  return [...contentTypes]
    .map((contentType) => ({
      ...contentType,
      properties: [...contentType.properties].sort((left, right) =>
        left.alias.localeCompare(right.alias),
      ),
    }))
    .sort((left, right) => left.alias.localeCompare(right.alias))
}

function getPropertyType(property) {
  const editorAlias = property.propertyEditorAlias.toLowerCase()
  const dataTypeName = property.dataTypeName.toLowerCase()
  const storageType = property.valueStorageType.toLowerCase()

  if (editorAlias.includes('singleblock')) {
    return 'UmbracoBlock | null'
  }

  if (editorAlias.includes('block')) {
    return 'UmbracoBlock[]'
  }

  if (editorAlias.includes('multinodetreepicker') && dataTypeName.includes('theme color')) {
    return 'ThemeColorModel[] | null'
  }

  if (editorAlias.includes('multiurlpicker')) {
    return 'NavLink[] | null'
  }

  if (editorAlias.includes('richtext')) {
    return 'RichTextValue | null'
  }

  if (editorAlias.includes('truefalse')) {
    return 'boolean'
  }

  if (storageType === 'integer' || storageType === 'decimal') {
    return 'number | null'
  }

  if (storageType === 'date') {
    return 'string | null'
  }

  return 'string | null'
}

function renderManifestFile(contentTypes) {
  return `import type { UmbracoManifest } from '../types/umbracoManifest'

export const reactModelManifest: UmbracoManifest = ${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      contentTypes,
    },
    null,
    2,
  )}
`
}

function renderModelsFile(contentTypes) {
  const usesBlocks = contentTypes.some((contentType) =>
    contentType.properties.some((property) => getPropertyType(property).startsWith('UmbracoBlock')),
  )
  const usesRichText = contentTypes.some((contentType) =>
    contentType.properties.some((property) => getPropertyType(property) === 'RichTextValue | null'),
  )
  const usesNavLinks = contentTypes.some((contentType) =>
    contentType.properties.some((property) => getPropertyType(property) === 'NavLink[] | null'),
  )
  const models = contentTypes
    .map((contentType) => {
      const interfaceName = `${toPascalCase(contentType.alias)}Model`
      const properties = contentType.properties
        .map((property) => `  ${property.alias}?: ${getPropertyType(property)}`)
        .join('\n')

      return `export type ${interfaceName} = UmbracoContent & {
      contentType: '${contentType.alias}'
      ${properties || ''}
    }`
    })
    .join('\n\n')

  return `
    import type { UmbracoContent${usesBlocks ? ', UmbracoBlock' : ''}${usesRichText ? ', RichTextValue' : ''}${usesNavLinks ? ', NavLink' : ''} } from '../types/umbraco'

    ${models || 'export type NoGeneratedModels = never'}
  `
}

function applySync(payload) {
  const selectedAliases = new Set(payload.models.map((model) => model.alias))
  const currentByAlias = new Map(
    payload.reactManifest.contentTypes.map((contentType) => [contentType.alias, contentType]),
  )

  if (payload.action === 'remove-stale') {
    for (const alias of selectedAliases) {
      currentByAlias.delete(alias)
    }
  } else {
    for (const model of payload.models) {
      currentByAlias.set(model.alias, model)
    }
  }

  return sortManifest([...currentByAlias.values()])
}

async function main() {
  const payload = JSON.parse(await readStdin())
  const contentTypes = applySync(payload)

  await mkdir(generatedRoot, { recursive: true })
  await writeFile(manifestPath, renderManifestFile(contentTypes), 'utf8')
  await writeFile(modelsPath, renderModelsFile(contentTypes), 'utf8')

  process.stdout.write(
    JSON.stringify({
      contentTypeCount: contentTypes.length,
      files: [manifestPath, modelsPath],
    }),
  )
}

await main()
