import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import HomeIcon from '../../assets/home.svg'
import ProfileImage from './ProfileImage'
import HeaderTheme from 'components/Common/HeaderTheme'

type IntroductionProps = {
  profileImage: IGatsbyImageData
}

const Background = styled.div`
  width: 100%;
  background-color: #393e46;
  color: #f6f6f6;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 768px;
  height: 320px;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
    padding: 0 20px;
  }
`
const SubTitle = styled.div`
  font-size: 20px;
  font-weight: 400;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`

const Title = styled.div`
  margin-top: 5px;
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
          <SubTitle>제 개발 블로그에 방문 해주셔서 감사해요😘</SubTitle>
          <Title>I'm Junior FE Developer dobyming.</Title>
        </div>
        <a href="https://damin-kim-portfolio.web.app/" target={'_blank'}>
          <HomeIcon />
        </a>
      </Wrapper>
    </Background>
  )
}

export default Introduction
