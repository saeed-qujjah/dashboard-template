import { Theme, ThemeOptions } from '@mui/material/styles'

declare module '@mui/material/styles' {
  
  interface Palette {
    Highlight?: PaletteColor
    Grey?: PaletteColor
  }

  interface PaletteOptions {
    Highlight?: PaletteColorOptions,
    Grey?: PaletteColorOptions
  }

}
