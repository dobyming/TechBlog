import React from 'react'
import styled from '@emotion/styled'
import GithubIcon from '../../../assets/github.svg'
import RSS from '../../../assets/rss.svg'
import { Link } from 'gatsby'

const BottomWrapper = styled.div`
  display: flex;
  padding-top: 5px;
  justify-content: center;

  .rssFeed {
    margin: 5px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

function BottomNav() {
  return (
    <BottomWrapper>
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
    </BottomWrapper>
  )
}

export default BottomNav
