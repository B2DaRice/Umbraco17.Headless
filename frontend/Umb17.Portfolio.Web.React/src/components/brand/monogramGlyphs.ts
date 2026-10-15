import type { ThemeColorModel } from '../../generated/umbraco-content-models'

export type MonogramGlyph = {
  path: string
  width: number
  height: number
}

const monogramGlyphHeight = 124.8

export const monogramGlyphs: Record<string, MonogramGlyph> = {
  A: {
    width: 88,
    height: monogramGlyphHeight,
    path: 'M0 124.8L31 0h26l31 124.8H63l-5-24H30l-5 24H0Zm35-47h18L44 33 35 77.8Z',
  },
  B: {
    width: 82.03,
    height: monogramGlyphHeight,
    path: 'M0 0h40.63c21.85 0 34.68 12.8 34.68 33.4 0 10.8-4.42 19.8-12.66 25 12.07 4.7 19.38 15.7 19.38 30.6 0 22.5-13.94 35.8-37.31 35.8H0V0Zm24.65 24.3v25.1h15.21c7.99 0 12.58-4.6 12.58-12.8 0-7.9-4.59-12.3-12.58-12.3H24.65Zm0 48.4v28.5h18.96c9.18 0 14.36-5.2 14.36-14.3 0-9-5.18-14.2-14.36-14.2H24.65Z',
  },
  C: {
    width: 92,
    height: monogramGlyphHeight,
    path: 'M91 23L74 40.8c-8-11-17-16-31-16-16 0-25 14-25 37.6S27 100 43 100c14 0 23-5 31-16l17 17.8c-13 15-29 23-48 23-26 0-43-25-43-62.4S17 0 43 0c19 0 35 8 48 23Z',
  },
  D: {
    width: 94,
    height: monogramGlyphHeight,
    path: 'M0 0h40c34 0 54 23 54 62.4s-20 62.4-54 62.4H0V0Zm24 24v76.8h14c20 0 32-14 32-38.4S58 24 38 24H24Z',
  },
  E: {
    width: 80,
    height: monogramGlyphHeight,
    path: 'M0 0h78v24H24v25h48v23H24v28.8h56v24H0V0Z',
  },
  F: {
    width: 76,
    height: monogramGlyphHeight,
    path: 'M0 0h76v24H24v28h46v23H24v49.8H0V0Z',
  },
  G: {
    width: 107.78,
    height: monogramGlyphHeight,
    path: 'M51.51 124.8C21.08 124.8 0 99.02 0 62.14C0 25.78 21.42 0 52.28 0c18.36 0 33.24 8.88 42.67 25.47L77.01 41.74C71.23 32.44 63.33 27.69 53.21 27.69c-17 0-28.47 13.84-28.47 34.45 0 20.92 10.88 34.66 28.14 34.66 11.82 0 20.74-5.6 25.33-15.43H48.12V55.9h59.66v12.58c0 34.77-22.27 56.32-56.27 56.32Z',
  },
  H: {
    width: 94,
    height: monogramGlyphHeight,
    path: 'M0 0h24v49h46V0h24v124.8H70V73H24v51.8H0V0Z',
  },
  I: {
    width: 42,
    height: monogramGlyphHeight,
    path: 'M0 0h42v22h-9v80.8h9v22H0v-22h9V22H0V0Z',
  },
  J: {
    width: 68,
    height: monogramGlyphHeight,
    path: 'M42 0h26v82c0 28-15 42.8-40 42.8-12 0-22-4-28-10l10-22c5 5 10 7 17 7 10 0 15-7 15-19V0Z',
  },
  K: {
    width: 88,
    height: monogramGlyphHeight,
    path: 'M0 0h24v50L61 0h27L46 56l44 68.8H61L30 75l-6 8v41.8H0V0Z',
  },
  L: {
    width: 78,
    height: monogramGlyphHeight,
    path: 'M0 0h24v100.8h54v24H0V0Z',
  },
  M: {
    width: 112,
    height: monogramGlyphHeight,
    path: 'M0 124.8V0h29l27 67 27-67h29v124.8H88V45l-24 58H48L24 45v79.8H0Z',
  },
  N: {
    width: 96,
    height: monogramGlyphHeight,
    path: 'M0 124.8V0h25l47 81V0h24v124.8H71L24 44v80.8H0Z',
  },
  O: {
    width: 100,
    height: monogramGlyphHeight,
    path: 'M0 62.4C0 24 20 0 50 0s50 24 50 62.4-20 62.4-50 62.4S0 100.8 0 62.4Zm24 0c0 24 10 38.4 26 38.4s26-14.4 26-38.4S66 24 50 24 24 38.4 24 62.4Z',
  },
  P: {
    width: 88,
    height: monogramGlyphHeight,
    path: 'M0 0h43c28 0 45 16 45 41s-17 41-45 41H24v42.8H0V0Zm24 24v34h17c14 0 22-6 22-17s-8-17-22-17H24Z',
  },
  Q: {
    width: 102,
    height: monogramGlyphHeight,
    path: 'M0 62.4C0 24 20 0 50 0s50 24 50 62.4c0 17-4 31.1-12 41.4l14 21H72l-4-6c-5.3 4-11.3 6-18 6-30 0-50-24-50-62.4Zm24 0c0 24 10 38.4 26 38.4 2.5 0 4.9-.4 7.1-1.2L45 82h30l1 1.6c0-6.1 0-13.2 0-21.2C76 38.4 66 24 50 24S24 38.4 24 62.4Z',
  },
  R: {
    width: 92,
    height: monogramGlyphHeight,
    path: 'M0 0h43c28 0 45 15 45 39 0 15-7 27-20 34l24 51.8H65L45 80H24v44.8H0V0Zm24 24v33h18c14 0 21-6 21-16.5S56 24 42 24H24Z',
  },
  S: {
    width: 84,
    height: monogramGlyphHeight,
    path: 'M78 18L64 39c-9-9-18-14-29-14-8 0-13 4-13 10 0 8 8 12 25 18 23 8 36 18 36 38 0 22-18 33.8-43 33.8-17 0-32-5-44-17l14-22c10 10 21 15 33 15 10 0 16-4 16-11 0-8-8-12-25-18C12 63 0 53 0 34 0 13 17 0 42 0c15 0 27 5 36 18Z',
  },
  T: {
    width: 82,
    height: monogramGlyphHeight,
    path: 'M0 0h82v24H53v100.8H29V24H0V0Z',
  },
  U: {
    width: 94,
    height: monogramGlyphHeight,
    path: 'M0 0h24v78c0 16 8 24 23 24s23-8 23-24V0h24v78c0 31-18 46.8-47 46.8S0 109 0 78V0Z',
  },
  V: {
    width: 90,
    height: monogramGlyphHeight,
    path: 'M0 0h26l19 86 19-86h26L58 124.8H32L0 0Z',
  },
  W: {
    width: 138,
    height: monogramGlyphHeight,
    path: 'M0 0h24l15 84 20-84h20l20 84 15-84h24l-25 124.8H87L69 50l-18 74.8H25L0 0Z',
  },
  X: {
    width: 94,
    height: monogramGlyphHeight,
    path: 'M0 0h28l18 40L64 0h28L60 62l34 62.8H66L46 82l-20 42.8H0L34 62 0 0Z',
  },
  Y: {
    width: 86,
    height: monogramGlyphHeight,
    path: 'M0 0h28l15 43L58 0h28L55 72v52.8H31V72L0 0Z',
  },
  Z: {
    width: 84,
    height: monogramGlyphHeight,
    path: 'M0 0h82v22l-50 78.8h52v24H0v-22l50-78.8H0V0Z',
  },
}

export const defaultTransparentThemeColor = {
  id: 'default-monogram-bg-color',
  contentType: 'themeColor',
  name: 'Default Transparent',
  dark: 'transparent',
  light: 'transparent',
} as ThemeColorModel

export const defaultMonogramGColor = {
  id: 'default-monogram-g-color',
  contentType: 'themeColor',
  name: 'Default Monogram G Color',
  dark: '#172033',
  light: '#172033',
} as ThemeColorModel

export const defaultMonogramBColor = {
  id: 'default-monogram-b-color',
  contentType: 'themeColor',
  name: 'Default Monogram B Color',
  dark: '#8fc7ff',
  light: '#8fc7ff',
} as ThemeColorModel

export const defaultMonogramIconLetters = [
  {
    letter: 'G',
    color: [defaultMonogramGColor],
    xAxis: -36.33,
    yAxis: 0,
    zIndex: 0,
  },
  {
    letter: 'B',
    color: [defaultMonogramBColor],
    xAxis: 0,
    yAxis: 32.2,
    zIndex: 1,
  },
]

export const defaultMonogramIconSettings = {
  backgroundColor: [defaultTransparentThemeColor],
  borderColor: [defaultTransparentThemeColor],
  borderRadius: 0,
  borderWidth: 0,
  padding: 0,
}
