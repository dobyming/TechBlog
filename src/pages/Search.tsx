import React, { useState } from 'react'
import styled from '@emotion/styled'
import CloseIcon from '../assets/close.svg'
import { graphql, useStaticQuery, Link } from 'gatsby'
// import { useGatsbyPluginFusejs } from 'react-use-fusejs'

const StyledSearch = styled.div`
  position: fixed;
  inset: 0;
  overflow-y: scroll;
  overscroll-behavior: none;

  .content {
    padding: 4rem 2rem;
    max-width: 800px;
    margin: 9rem auto 0 auto;
    position: relative;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 1.5rem;

    form {
      display: flex;
      flex-grow: 1;
      position: relative;
    }
  }

  .inp {
    width: 100%;
    font-size: 3rem;
    border: none;
    outline: none;
    background-color: transparent;
    padding: 0;
  }

  .closeBtn {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`

// interface SearchStaticQuery {
//   fusejs: { index: string; data: string }
// }

// interface SearchItem {
//   id: string
//   path: string
//   title: string
//   body: string
// }

const Search = () => {
  // const data = useStaticQuery<SearchStaticQuery>(getSearchResult)

  // const [query, setQuery] = useState('')
  // const { fusejs, setFusejs } = useState(null)
  // const result = useGatsbyPluginFusejs<SearchItem>(query, fusejs)

  return (
    <StyledSearch>
      <div className="content">
        <div className="header">
          <form className="form">
            <input
              className="inp"
              type="text"
              placeholder="검색어를 입력하세요"
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
            />
          </form>
          <button className="closeBtn" type="button">
            <Link to={'/'}>
              <CloseIcon className="closeIcon" stroke="#000000" />
            </Link>
          </button>
        </div>
      </div>
    </StyledSearch>
  )
}

export default Search

// export const getSearchResult = graphql`
//   query getSearch {
//     fusejs {
//       index
//       data
//     }
//   }
// `
