import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import HeaderTheme from '../HeaderTheme'
import SearchIcon from '../../../assets/search.svg'

const NavBarContainer = styled.div`
  flex: 30%;
  display: flex;
  align-items: center;
  padding-right: 5%;

  .searchIcon {
    position: absolute;
    top: 1.3rem;
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
    display: none;
  }
`

const NavBar = () => {
  return (
    <NavBarContainer>
      <HeaderTheme />
      <Link to="/Search" aria-label="Search">
        <SearchIcon fill="black" className="searchIcon" />
      </Link>
      <Link to="/about" aria-label="About">
        <p className="about">About</p>
      </Link>
    </NavBarContainer>
  )
}

export default NavBar
