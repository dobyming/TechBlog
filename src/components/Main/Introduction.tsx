import React from 'react'
import styled from '@emotion/styled'
import HeaderTheme from 'components/Common/HeaderTheme'
import GithubIcon from '../../assets/github.svg'
import { Link } from 'gatsby'

const Background = styled.div`
  width: 100%;
  background: rgb(238, 174, 202);
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
  color: #f6f6f6;
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
    height: 95px;
    padding: 0 20px;
  }
`

const Title = styled(Link)`
  font-size: 35px;
  font-weight: 700;
  @media (max-width: 768px) {
    font-size: 25px;
  }
`

const Introduction = () => {
  return (
    <Background>
      <Wrapper>
        <HeaderTheme />
        <Title to={'/'}>dobyming</Title>
        <a
          href="https://github.com/dobyming"
          aria-label="Github"
          target={'_blank'}
        >
          <GithubIcon />
        </a>
      </Wrapper>
    </Background>
  )
}

export default Introduction
