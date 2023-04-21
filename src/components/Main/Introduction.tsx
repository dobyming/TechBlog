import React, { FunctionComponent } from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import HomeIcon from '../../assets/home.svg'
import ProfileImage from './ProfileImage'

type IntroductionProps = {
  profileImage: IGatsbyImageData
}

const Background = styled.div`
  width: 100%;
  background-image: radial-gradient(
    circle at 1.8% 4.8%,
    rgb(17, 23, 58) 0%,
    rgb(58, 85, 148) 90%
  );
  color: #ffffff;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 768px;
  height: 400px;
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
        <div>
          <SubTitle>Good to See you!</SubTitle>
          <Title>I'm Junior FE Developer dobyming.</Title>
        </div>
        <Link to="https://damin-kim-portfolio.web.app/" target={'_blank'}>
          <HomeIcon />
        </Link>
      </Wrapper>
    </Background>
  )
}

export default Introduction
