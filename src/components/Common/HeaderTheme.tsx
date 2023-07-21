import React from 'react'
import useTheme from 'hooks/useTheme'
import Sun from '../../assets/sun.svg'
import Moon from '../../assets/moon.svg'
import '../../styles/theme.css'
import styled from '@emotion/styled'
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
  const [isDark, setIsDark] = useTheme()

  return (
    <ClientOnly>
      <ThemeHeader className="themeIcon" onClick={setIsDark}>
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
