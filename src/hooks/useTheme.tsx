import { useState, useLayoutEffect, useCallback } from 'react'
import { isBrowser } from '../util'

const useTheme = () => {
  const [theme, setTheme] = useState<boolean>(false)

  const saveTheme = (it: boolean) => {
    if (isBrowser()) {
      if (it) {
        window.localStorage.setItem('color-theme', 'dark')
      } else {
        window.localStorage.setItem('color-theme', 'light')
      }
    }
  }

  /* Trigger theme modification by refering localStorage */
  if (isBrowser()) {
    const userTheme = window.localStorage.getItem('color-theme')
    useLayoutEffect(() => {
      if (userTheme === 'dark') {
        document.body.classList.remove('light')
        document.body.classList.add('dark')
        setTheme(true)
      } else {
        document.body.classList.remove('dark')
        document.body.classList.add('light')
        setTheme(false)
      }
    }, [userTheme])
  }

  /* Theme Change Button logic */
  const handleTheme = useCallback(() => {
    setTheme(prev => {
      saveTheme(!prev)
      return !prev
    })
  }, [])

  return [theme, handleTheme] as const
}

export default useTheme
