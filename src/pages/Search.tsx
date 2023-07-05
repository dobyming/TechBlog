import React, {
  useState,
  FunctionComponent,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from 'react'
import styled from '@emotion/styled'
import CloseIcon from '../assets/close.svg'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { useGatsbyPluginFusejs } from 'react-use-fusejs'
import { AppContext } from '../context/app'
// import { navigate } from 'gatsby'

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

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .inp {
      font-size: 1.5rem;
    }
    .closeIcon {
      width: 35px;
      height: 35px;
    }
  }
`
type SearchProps = {
  fusejs: {
    publicUrl: string
  }
}

type SearchItem = {
  id: string
  path: string
  title: string
  body: string
}

const Search: FunctionComponent<SearchProps> = function () {
  // index.js(최상위)로부터 다운 후 파싱하여 검색을 수행
  const data = useStaticQuery<SearchProps>(graphql`
    {
      fusejs {
        publicUrl
      }
    }
  `)

  /**
   * 1. Get User Search Input value
   * 2. Collect all Index data and store in context
   * 3. Based on fuseData find query data with fuzzy search
   * 4. Lazy Loading (when Post's amount is getting larger)
   */
  const [query, setQuery] = useState<string>('')
  const { fuseData, setFuseData } = useContext(AppContext)
  const result = useGatsbyPluginFusejs<SearchItem>(query, fuseData)
  const [isFetching, setIsFetching] = useState(false)

  const fetching = useRef(false)
  useEffect(() => {
    if (!fetching.current && !fuseData && query) {
      fetching.current = true

      fetch(data.fusejs.publicUrl)
        .then(res => res.json())
        .then(data => setFuseData(data))
        .finally(() => setIsFetching(false))
    }
  }, [fuseData, query, setFuseData])

  // const close = useCallback(() => {
  //   setTimeout(() => navigate(-1), 100)
  // }, [])

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
            <CloseIcon className="closeIcon" stroke="#000000" />
          </button>
        </div>
        <div className="list">
          {!isFetching && query && !result.length ? (
            <p>검색 결과가 없습니다</p>
          ) : (
            <ul className="searchResult">
              {result.map(({ item }) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    style={{
                      textDecoration: 'none',
                    }}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </StyledSearch>
  )
}

export default Search
