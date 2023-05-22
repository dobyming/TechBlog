import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import HeaderTheme from 'components/Common/HeaderTheme'
import GithubIcon from '../../assets/github.svg'
import { Link } from 'gatsby'
import { isBrowser } from '../../util'

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

  @media (max-width: 768px) {
    width: 100%;
    height: 80px;
    padding: 0 20px;
  }
`

const Title = styled(Link)`
  font-size: 35px;
  font-weight: 700;
  @media (max-width: 768px) {
    padding-top: 5px;
    font-size: 28px;
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
        <Title to={'/'}>dobyming</Title>
        <a
          href="https://github.com/dobyming"
          aria-label="Github"
          target={'_blank'}
        >
          <GithubIcon className="githubIcon" />
        </a>
      </Wrapper>
      <hr />
    </Background>
  )
}

export default Introduction
