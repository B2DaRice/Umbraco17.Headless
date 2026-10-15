import type {
  MonogramIconModel,
  MonogramSvgModel,
  ThemeColorModel,
} from '../../generated/umbraco-content-models'
import {
  defaultMonogramBColor,
  defaultMonogramGColor,
  defaultMonogramIconLetters,
  defaultMonogramIconSettings,
  defaultTransparentThemeColor,
  monogramGlyphs,
  type MonogramGlyph,
} from './monogramGlyphs'
import { resolveThemeColor, resolveThemeColorClass } from './monogramTheme'

type MonogramIconProps = {
  className?: string
  icon?: MonogramIconModel | null
  themeColors?: ThemeColorModel[]
  title?: string
  useDarkTheme?: boolean
}

type MonogramLetterInput = Pick<
  MonogramSvgModel,
  'borderColor' | 'borderWidth' | 'color' | 'letter' | 'padding' | 'xAxis' | 'yAxis' | 'zIndex'
>

type PlacedMonogramLetter = MonogramLetterInput & {
  glyph: MonogramGlyph
  height: number
  index: number
  width: number
  x: number
  y: number
}

function getLetters(icon: MonogramIconModel | null | undefined) {
  return icon?.letters?.map((block) => block as MonogramSvgModel) ?? defaultMonogramIconLetters
}

function placeLetters(letters: MonogramLetterInput[]) {
  let cursorX = 0
  let maxHeight = 0

  const placedLetters = letters
    .map((letterSettings, index) => {
      const glyph = monogramGlyphs[(letterSettings.letter ?? '').toUpperCase()]

      if (!glyph) {
        return null
      }

      const padding = letterSettings.padding ?? 0
      const width = glyph.width + padding * 2
      const height = glyph.height + padding * 2
      const x = cursorX + (letterSettings.xAxis ?? 0)
      const y = letterSettings.yAxis ?? 0

      cursorX = x + width
      maxHeight = Math.max(maxHeight, y + height)

      return {
        ...letterSettings,
        glyph,
        height,
        index,
        width,
        x,
        y,
      }
    })
    .filter((letter): letter is PlacedMonogramLetter => letter !== null)

  return {
    height: maxHeight,
    letters: placedLetters,
    width: placedLetters.reduce((maxRight, letter) => Math.max(maxRight, letter.x + letter.width), 0),
  }
}

function sortByStackingOrder(letters: PlacedMonogramLetter[]) {
  return [...letters].sort((left, right) => {
    const zIndexDifference = (left.zIndex ?? 0) - (right.zIndex ?? 0)

    if (zIndexDifference !== 0) {
      return zIndexDifference
    }

    return left.index - right.index
  })
}

function toFramePixelClassValue(value: number | null | undefined) {
  return Math.min(200, Math.max(0, Math.round(value ?? 0)))
}

export function MonogramIcon({
  className,
  icon,
  themeColors,
  title = 'BG monogram',
  useDarkTheme = false,
}: MonogramIconProps) {
  const iconSettings = icon ?? defaultMonogramIconSettings
  const resolvedUseDarkTheme = icon?.flipTheme ? !useDarkTheme : useDarkTheme
  const containerPadding = toFramePixelClassValue(iconSettings.padding)
  const borderWidth = toFramePixelClassValue(iconSettings.borderWidth)
  const borderRadius = toFramePixelClassValue(iconSettings.borderRadius)
  const placed = placeLetters(getLetters(icon))
  const glyphWidth = placed.width
  const glyphHeight = placed.height
  const backgroundClass =
    resolveThemeColorClass({
      fallbackClassName: 'bg-theme-default-bg',
      themeColors,
      utility: 'bg',
      value: icon?.backgroundColor,
    }) ?? ''
  const borderColorClass = resolveThemeColorClass({
    themeColors,
    utility: 'border',
    value: icon?.borderColor,
  })
  const wrapperClassName = [
    'inline-flex items-center justify-center',
    `p-[${containerPadding}px]`,
    `rounded-[${borderRadius}px]`,
    borderWidth > 0 ? `border-[${borderWidth}px]` : undefined,
    borderWidth > 0 ? 'border-solid' : undefined,
    borderWidth > 0 ? borderColorClass : undefined,
    backgroundClass,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span
      aria-label={title}
      className={wrapperClassName}
      data-theme={resolvedUseDarkTheme ? 'dark' : 'light'}
      role="img"
    >
      <svg
        aria-hidden="true"
        className={className}
        viewBox={`0 0 ${glyphWidth} ${glyphHeight}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {sortByStackingOrder(placed.letters).map((letterSettings) => {
          const letterPadding = letterSettings.padding ?? 0
          const defaultFill =
            letterSettings.letter?.toUpperCase() === 'B' ? defaultMonogramBColor : defaultMonogramGColor
          const fillClassName = resolveThemeColorClass({
            themeColors,
            utility: 'fill',
            value: icon ? letterSettings.color : undefined,
          })
          const strokeClassName = resolveThemeColorClass({
            themeColors,
            utility: 'stroke',
            value: icon ? letterSettings.borderColor : undefined,
          })
          const fill = fillClassName
            ? undefined
            : resolveThemeColor(letterSettings.color, themeColors, defaultFill, resolvedUseDarkTheme)
          const stroke = strokeClassName
            ? undefined
            : resolveThemeColor(
            letterSettings.borderColor,
            themeColors,
            defaultTransparentThemeColor,
            resolvedUseDarkTheme,
          )
          const strokeWidth = letterSettings.borderWidth ?? 0
          const x = letterSettings.x + letterPadding
          const y = glyphHeight - letterSettings.y - letterSettings.height + letterPadding

          return (
            <path
            d={letterSettings.glyph.path}
            className={[fillClassName, strokeClassName].filter(Boolean).join(' ') || undefined}
            fill={fill}
              fillRule="evenodd"
              key={`${letterSettings.letter}-${letterSettings.index}`}
              stroke={stroke}
              strokeWidth={strokeWidth}
              transform={`translate(${x} ${y})`}
            />
          )
        })}
      </svg>
    </span>
  )
}
