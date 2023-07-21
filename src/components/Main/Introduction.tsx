import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { isBrowser } from '../../util'
import useTheme from 'hooks/useTheme'
import BottomNav from './../Common/Navigation/BottomNav'
import NavBar from 'components/Common/Navigation/NavBar'
import ReorderIcon from '../../assets/reorder.svg'
import CloseIcon from '../../assets/close.svg'

type NavBarExtendendProps = {
  extendNavBar: boolean
}

const Background = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;

  hr {
    width: 768px;
    margin: auto;
    border-color: #fff;
  }

  &.scroll {
    height: 90px;
    hr {
      display: none;
    }
    @media (max-width: 768px) {
      width: 100%;
      height: 80px;
    }
  }

  @media (max-width: 768px) {
    hr {
      display: none;
    }
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 768px;
  height: 100px;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
    height: 80px;
    padding: 0 20px;
  }
`

const Title = styled(Link)`
  position: relative;
  font-size: 35px;
  font-weight: 700;

  &::before {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }

  @media (max-width: 768px) {
    padding-top: 5px;
    font-size: 28px;

    &::before {
      background-color: transparent;
    }
  }
`

const OpenReorderIcon = styled.button`
  position: absolute;
  top: 1.3rem;
  right: 1rem;

  width: 35px;
  height: 35px;
  background: none;
  border: none;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`

/* Spread Links in Tab(Reorder) button */
const NavbarExtendedContainer = styled.div<NavBarExtendendProps>`
  width: 100%;
  height: ${props => (props.extendNavBar ? '25vh' : '')};
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: ${isBrowser() && window.document.body.classList.contains('dark')};
    font-size: 20px;
    text-decoration: none;
    margin: 10px;
  }

  @media (min-width: 768px) {
    display: none;
  }
`

/* Each Link component in Extended Container */
const NavbarLinkExtended = styled(Link)`
  color: ${isBrowser() && window.document.body.classList.contains('dark')};
  font-size: 20px;
  text-decoration: none;
  margin: 10px;
`

const ThemeNavExtended = styled.button`
  font-size: 20px;
  margin: 10px;
  border: none;
  background-color: transparent;
`

const Introduction = () => {
  const [extendNavbar, setExtendNavbar] = useState(false)
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [isDark, setIsDark] = useTheme()

  /* when to trigger scroll event */
  const onScroll = () => setScrolled(window.scrollY > 20)
  useEffect(() => {
    if (!isBrowser) {
      return
    }
    window.addEventListener('scroll', onScroll)
    setScrolled(window.scrollY > 20)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Background className={scrolled ? 'scroll' : ''}>
      <NavBar />
      <OpenReorderIcon onClick={() => setExtendNavbar(cur => !cur)}>
        {extendNavbar ? (
          <CloseIcon className="closeIcon" stroke="#000000" />
        ) : (
          <ReorderIcon className="reOrder" />
        )}
      </OpenReorderIcon>

      <Wrapper>
        <Title to={'/'}>dobyming</Title>
        <BottomNav />
      </Wrapper>

      {extendNavbar && (
        <NavbarExtendedContainer
          className="navBarExtended"
          extendNavBar={extendNavbar}
        >
          <NavbarLinkExtended to="/about">About</NavbarLinkExtended>
          <NavbarLinkExtended to="/Search">Search</NavbarLinkExtended>
          <a href="https://github.com/dobyming">Github</a>
          <ThemeNavExtended onClick={setIsDark}>
            {isDark ? 'Light' : 'Dark'}
          </ThemeNavExtended>
        </NavbarExtendedContainer>
      )}

      <hr />
    </Background>
  )
}

export default Introduction
