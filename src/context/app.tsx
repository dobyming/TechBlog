import React, {
  createContext,
  SetStateAction,
  useState,
  ReactNode,
  FunctionComponent,
} from 'react'
import { Dispatch } from 'react'

interface AppContext {
  fuseData: any
  setFuseData: Dispatch<SetStateAction<any>>
}

export const AppContext = createContext<AppContext>({
  fuseData: null,
  setFuseData: () => {},
})

type AppProps = {
  children: ReactNode
}

// Provide Props to Search
const AppProvider: FunctionComponent<AppProps> = function ({ children }) {
  const [fuseData, setFuseData] = useState(null)

  return (
    <AppContext.Provider value={{ fuseData, setFuseData }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
