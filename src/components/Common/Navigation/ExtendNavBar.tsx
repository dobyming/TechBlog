import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { isBrowser } from './../../../util'
import useTheme from 'hooks/useTheme'

type NavBarExtendendProps = {
  extendNavBar: boolean
}

const NavbarContainer = styled.div<NavBarExtendendProps>`
  width: 100%;
  height: ${props => (props.extendNavBar ? '100vh' : '')};

  @media (min-width: 768px) {
    display: none;
  }
`

const NavbarLinks = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
    color: ${isBrowser() && window.document.body.classList.contains('dark')};
    font-size: 20px;
    text-decoration: none;
    margin: 10px;
  }
`

const NavLink = styled(Link)`
  color: ${isBrowser() && window.document.body.classList.contains('dark')};
  text-decoration: none;
`

const NavThemeLink = styled.button`
  font-size: 20px;
  margin: 10px;
  border: none;
  cursor: pointer;
  background-color: transparent;
`

const ExtendNavBar: FunctionComponent<NavBarExtendendProps> = function ({
  extendNavBar,
}) {
  const [isDark, setIsDark] = useTheme()
  return (
    <>
      {extendNavBar && (
        <NavbarContainer className="navBarExtended" extendNavBar={extendNavBar}>
          <NavbarLinks>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/Search">Search</NavLink>
            <a href="https://github.com/dobyming">GitHub</a>
            <NavThemeLink onClick={setIsDark}>
              {isDark ? 'Light' : 'Dark'}
            </NavThemeLink>
          </NavbarLinks>
        </NavbarContainer>
      )}
    </>
  )
}

export default ExtendNavBar
