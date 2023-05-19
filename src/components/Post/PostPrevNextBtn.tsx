import React, { FunctionComponent } from 'react'
import Left from '../../assets/left-icon.svg'
import Right from '../../assets/right-icon.svg'
import styled from '@emotion/styled'
import { Link } from 'gatsby-link'
import { isBrowser } from '../../util'

const StyledPager = styled.nav`
  height: 56px;
  margin-bottom: 30px;

  ul {
    text-align: center;
  }

  li {
    display: inline-block;
    *display: block;
    *zoom: 1;
    height: 56px;
    line-height: 56px;
    white-space: nowrap;
    margin: 0 10px;
  }
  svg {
    margin-top: -3px;
    width: 21px;
    height: 21px;
    vertical-align: middle;
  }

  a {
    color: ${isBrowser() && window.document.body.classList.contains('dark')};
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  span {
    cursor: not-allowed;
    color: #888;
  }
`
type PrevNextProps = {
  previousPagePath: string | null
  nextPagePath: string | null
}

const PostPrevNextBtn: FunctionComponent<PrevNextProps> = function ({
  previousPagePath,
  nextPagePath,
}) {
  return (
    <StyledPager>
      <ul>
        <li>
          {previousPagePath !== null ? (
            <Link to={previousPagePath}>
              <Left className="LeftPrev" />
              다음글
            </Link>
          ) : (
            <span>
              <Left fill="gray" /> 다음글
            </span>
          )}
        </li>

        <li>
          {nextPagePath !== null ? (
            <Link to={nextPagePath}>
              이전글
              <Right className="RightNext" />
            </Link>
          ) : (
            <span>
              이전글 <Right fill="gray" />
            </span>
          )}
        </li>
      </ul>
    </StyledPager>
  )
}

export default PostPrevNextBtn
