import React, { createContext, SetStateAction, useState } from 'react'
import { Dispatch } from 'react'

interface AppContext {
  fuseData: any
  setFuseData: Dispatch<SetStateAction<any>>
}

export const AppContext = createContext<AppContext>({
  fuseData: null,
  setFuseData: () => {},
})

// Provide Props to Search
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [fuseData, setFuseData] = useState(null)

  return (
    <AppContext.Provider value={{ fuseData, setFuseData }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
