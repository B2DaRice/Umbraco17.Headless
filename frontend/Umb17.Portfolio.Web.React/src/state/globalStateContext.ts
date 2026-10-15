import { createContext, useContext } from 'react'

export type GlobalStateValue = {
  setUseDarkTheme: (useDarkTheme: boolean) => void
  useDarkTheme: boolean
}

export const GlobalStateContext = createContext<GlobalStateValue | undefined>(undefined)

export function useGlobalState() {
  const context = useContext(GlobalStateContext)

  if (!context) {
    throw new Error('useGlobalState must be used inside GlobalStateProvider')
  }

  return context
}
