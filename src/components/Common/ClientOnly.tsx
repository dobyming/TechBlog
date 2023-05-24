import { useState, useEffect, ReactNode, FunctionComponent } from 'react'

type ClientProps = {
  children: ReactNode
}

const ClientOnly: FunctionComponent<ClientProps> = function ({ children }) {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return children
}

export default ClientOnly
