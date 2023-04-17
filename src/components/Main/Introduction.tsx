import React, { FunctionComponent } from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import ProfileImage from 'components/Main/ProfileImage'
import HomeIcon from '../../assets/home.svg'

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
`
const SubTitle = styled.div`
  font-size: 20px;
  font-weight: 400;
`

const Title = styled.div`
  margin-top: 5px;
  font-size: 35px;
  font-weight: 700;
`
const Introduction: FunctionComponent = function () {
  return (
    <Background>
      <Wrapper>
        <ProfileImage />
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
