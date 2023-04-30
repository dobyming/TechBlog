import React, { useState, useEffect, useCallback } from 'react'
import Sun from '../../assets/sun.svg'
import Moon from '../../assets/moon.svg'
import '../../styles/theme.css'
import styled from '@emotion/styled'

const ThemeHeader = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`

const HeaderTheme = () => {
  const [isDark, setIsDark] = useState<boolean>(false)
  const userTheme = localStorage.getItem('color-theme')

  // Belong to isDark state, store theme in localStorage
  const saveTheme = (it: boolean) => {
    if (it) {
      localStorage.setItem('color-theme', 'dark')
    } else {
      localStorage.setItem('color-theme', 'light')
    }
  }

  // trigger theme change refer localStorage's key-value
  useEffect(() => {
    if (userTheme === 'dark') {
      document.body.classList.add('dark')
      setIsDark(true)
    } else {
      document.body.classList.remove('dark')
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
    <ThemeHeader onClick={handleTheme}>
      {isDark ? (
        <Sun stroke="orange" fill="orange" />
      ) : (
        <Moon fill="yellow" stroke="yellow" />
      )}
    </ThemeHeader>
  )
}

export default HeaderTheme
