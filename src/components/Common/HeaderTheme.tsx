import React, { useState, useLayoutEffect, useCallback } from 'react'
import Sun from '../../assets/sun.svg'
import Moon from '../../assets/moon.svg'
import '../../styles/theme.css'
import styled from '@emotion/styled'
import { isBrowser } from '../../util'
import ClientOnly from './ClientOnly'

const ThemeHeader = styled.button`
  position: absolute;
  border: 0;
  background-color: transparent;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`

const HeaderTheme = () => {
  const [isDark, setIsDark] = useState<boolean>(false)
  if (!isBrowser()) return null
  const userTheme = window.localStorage.getItem('color-theme')

  // Belong to isDark state, store theme in localStorage
  const saveTheme = (it: boolean) => {
    if (it) {
      window.localStorage.setItem('color-theme', 'dark')
    } else {
      window.localStorage.setItem('color-theme', 'light')
    }
  }

  // trigger theme change refer localStorage's key-value
  useLayoutEffect(() => {
    if (userTheme === 'dark') {
      document.body.classList.remove('light')
      document.body.classList.add('dark')
      setIsDark(true)
    } else {
      document.body.classList.remove('dark')
      document.body.classList.add('light')
      setIsDark(false)
    }
  }, [userTheme])

  // while clicking button, what to show svg logo
  const handleTheme = useCallback(() => {
    setIsDark(prev => {
      saveTheme(!prev)
      return !prev
    })
  }, [])

  return (
    <ClientOnly>
      <ThemeHeader className="themeIcon" onClick={handleTheme}>
        {isDark ? (
          <Sun stroke="#FF5733" fill="#FF5733" />
        ) : (
          <Moon fill="#FFD700" stroke="#FFD700" />
        )}
      </ThemeHeader>
    </ClientOnly>
  )
}

export default HeaderTheme
