import React, { useState, FunctionComponent } from 'react'
import styled from '@emotion/styled'
import CloseIcon from '../assets/close.svg'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { useGatsbyPluginFusejs } from 'react-use-fusejs'

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

  .list {
    position: relative;
    padding-top: 20px;

    ul {
      padding-left: 0;
      margin: 0 0 0 0.5rem;
      list-style-type: none;

      li {
        position: relative;
        margin-bottom: 1.5rem;
      }
    }
  }
`
type SearchProps = {
  fusejs: {
    index: string
    data: Array<object>
  }
}

const Search: FunctionComponent<SearchProps> = function () {
  const [query, setQuery] = useState<string>('')
  const data = useStaticQuery<SearchProps>(graphql`
    {
      fusejs {
        index
        data
      }
    }
  `)

  // fusejs 객체를 가공 없이 그대로 넘긴다
  const result = useGatsbyPluginFusejs(query, data.fusejs)

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
              onChange={e => setQuery(e.target.value)}
            />
          </form>
          <button className="closeBtn" type="button">
            <Link to={'/'}>
              <CloseIcon className="closeIcon" stroke="#000000" />
            </Link>
          </button>
        </div>
        <div className="list">
          <ul className="searchResult">
            {result.map(({ item }) => (
              <li key={item.id}>
                <Link to={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </StyledSearch>
  )
}

export default Search
