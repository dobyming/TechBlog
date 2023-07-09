import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import HeaderTheme from 'components/Common/HeaderTheme'
import GithubIcon from '../../assets/github.svg'
import RSS from '../../assets/rss.svg'
import { Link } from 'gatsby'
import { isBrowser } from '../../util'
import SearchIcon from '../../assets/search.svg'

const Background = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 3;

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

  .searchIcon {
    position: absolute;
    top: 1.5rem;
    right: 5rem;
    cursor: pointer;
  }

  .about {
    position: absolute;
    top: 1.5rem;
    right: 8.3rem;
    font-size: 17px;
    cursor: pointer;

    &:hover {
      color: gray;
    }
  }

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

const SvgNav = styled.div`
  display: flex;
  padding-top: 5px;
  justify-content: center;

  .rssFeed {
    margin: 5px;
  }
`

const Introduction = () => {
  const [scrolled, setScrolled] = useState<boolean>(false)
  // when to trigger event
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
      <Wrapper>
        <HeaderTheme />
        <Link to="/Search" aria-label="Search">
          <SearchIcon fill="black" className="searchIcon" />
        </Link>
        <Link to="/about" aria-label="About">
          <p className="about">About</p>
        </Link>

        <Title to={'/'}>dobyming</Title>
        <SvgNav>
          <a
            href="https://github.com/dobyming"
            aria-label="GitHub"
            target={'_blank'}
          >
            <GithubIcon className="githubIcon" />
          </a>
          <Link to="/rss.xml" className="rssFeed" aria-label="RSS">
            <RSS fill="black" />
          </Link>
        </SvgNav>
      </Wrapper>
      <hr />
    </Background>
  )
}

export default Introduction
