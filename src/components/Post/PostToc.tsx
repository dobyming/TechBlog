import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

interface TOCProps {
  toc: string
}

const StyledTOC = styled.div`
  width: 100%;
  position: relative;
  font-size: 1rem;

  ul {
    margin-right: '0px';
    li {
      color: blue;
      a {
        decoration: none;
      }
    }
  }
`
const PostToc: FunctionComponent<TOCProps> = function ({ toc }) {
  return <StyledTOC dangerouslySetInnerHTML={{ __html: toc }} />
}

export default PostToc
