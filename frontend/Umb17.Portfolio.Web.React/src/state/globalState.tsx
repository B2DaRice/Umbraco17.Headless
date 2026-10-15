import { useMemo, useState, type ReactNode } from 'react'
import { GlobalStateContext } from './globalStateContext'

type GlobalStateProviderProps = {
  children: ReactNode
}

export function GlobalStateProvider({ children }: GlobalStateProviderProps) {
  const [useDarkTheme, setUseDarkTheme] = useState(false)
  const value = useMemo(
    () => ({
      setUseDarkTheme,
      useDarkTheme,
    }),
    [useDarkTheme],
  )

  return <GlobalStateContext.Provider value={value}>{children}</GlobalStateContext.Provider>
}
