import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import ProfileImage from './ProfileImage'
import HeaderTheme from 'components/Common/HeaderTheme'
import GithubIcon from '../../assets/github.svg'

type IntroductionProps = {
  profileImage: IGatsbyImageData
}

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
  height: 230px;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
    height: 150px;
    padding: 0 20px;
  }
`

const Title = styled.div`
  font-size: 35px;
  font-weight: 700;
  @media (max-width: 768px) {
    font-size: 25px;
  }
`

const Introduction: FunctionComponent<IntroductionProps> = function ({
  profileImage,
}) {
  return (
    <Background>
      <Wrapper>
        <ProfileImage profileImage={profileImage} />
        <HeaderTheme />
        <div>
          <Title>dobyming</Title>
          <a href="https://github.com/dobyming" target={'_blank'}>
            <GithubIcon />
          </a>
        </div>
      </Wrapper>
    </Background>
  )
}

export default Introduction
