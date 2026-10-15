import type { ThemeColorModel } from '../../generated/umbraco-content-models'

type ThemeColorValue = ThemeColorModel[] | null | undefined
type ThemeColorUtility = 'bg' | 'border' | 'fill' | 'stroke' | 'text'

export function toThemeColorSlug(value: string | null | undefined) {
  const slug = String(value ?? '')
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return slug || 'unnamed'
}

function resolveThemeColorModel(
  value: ThemeColorValue,
  themeColors: ThemeColorModel[] | undefined,
) {
  const selectedColor = value?.[0]

  if (!selectedColor) {
    return undefined
  }

  return selectedColor.light || selectedColor.dark
    ? selectedColor
    : themeColors?.find((themeColor) => themeColor.id === selectedColor.id) ?? selectedColor
}

export function resolveThemeColorClass({
  fallbackClassName,
  themeColors,
  utility,
  value,
}: {
  fallbackClassName?: string
  themeColors?: ThemeColorModel[]
  utility: ThemeColorUtility
  value: ThemeColorValue
}) {
  const resolvedColor = resolveThemeColorModel(value, themeColors)

  if (!resolvedColor) {
    return fallbackClassName ?? null
  }

  return `${utility}-theme-${toThemeColorSlug(resolvedColor.name)}`
}

export function resolveThemeColor(
  value: ThemeColorValue,
  themeColors: ThemeColorModel[] | undefined,
  fallback: ThemeColorModel,
  useDarkTheme?: boolean,
): string
export function resolveThemeColor(
  value: ThemeColorValue,
  themeColors: ThemeColorModel[] | undefined,
  fallback?: ThemeColorModel | null,
  useDarkTheme?: boolean,
): string | null
export function resolveThemeColor(
  value: ThemeColorValue,
  themeColors: ThemeColorModel[] | undefined,
  fallback?: ThemeColorModel | null,
  useDarkTheme = false,
) {
  const resolvedColor = resolveThemeColorModel(value, themeColors)
  const resolvedModeColor = useDarkTheme ? resolvedColor?.dark : resolvedColor?.light
  const fallbackModeColor = fallback ? (useDarkTheme ? fallback.dark : fallback.light) : undefined

  return (
    resolvedModeColor ||
    resolvedColor?.light ||
    resolvedColor?.dark ||
    fallbackModeColor ||
    fallback?.light ||
    fallback?.dark ||
    null
  )
}
