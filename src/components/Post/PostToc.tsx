import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { slug } from 'github-slugger'
import styled from '@emotion/styled'
import { findIndex, throttle } from 'lodash-es'
import { isBrowser } from '../../util'
interface TOCProps {
  headings: Array<{
    depth: number
    value: string
  }>
}

const StyledTOC = styled.div`
  width: 100%;
  position: sticky;
  margin-top: 35px;
  font-size: 0.9rem;
  top:100px;

  .wrapper {
    position: absolute;
    left: 72.5rem;

  .content {
    width: 240px;
    margin: 0 0 0 5rem;

    ol {
      list-style: none;
      list-style-position: inside;
      line-height: 1.5rem;
      margin: 0;
      padding: 0;

      li {
        border-left: 2px solid #9b8df0;
        transition: opacity 0.3s ease;
        opacity: 0.5;

        :hover {
          opacity: 1;
        }
      }

      a {
        color: ${
          isBrowser() && window.document.body.classList.contains('dark')
        };
        text-decoration: none;
      }

      .active {
        opacity: 1;
        font-weight: 700;
      }
    }
  }

  @media (max-width: 1388px) {
    display: none;
  }
`

// props: headings 배열을 post_template으로부터 받을 예정
const PostToc: FunctionComponent<TOCProps> = function ({ headings }) {
  const headers = useMemo(
    () =>
      headings
        .filter(({ depth }) => depth < 4)
        .map(h => ({ ...h, slug: slug(h.value) })),
    [],
  )

  const calcActive = useCallback(() => {
    if (!isBrowser) {
      return 0
    }
    const offsets: number[] = []

    // bring each headings offsetTop
    for (const { slug } of headers) {
      const element = document.getElementById(slug)
      if (!element) {
        return
      }
      offsets.push(element.offsetTop - 60)
    }

    const maxIndex = offsets.length - 1
    const { scrollY } = window
    let index = 0

    // Scroll Active Trigger (looping the offset)
    if (scrollY === 0 || scrollY <= offsets[0]) {
      index = 0
    } else if (
      window.innerHeight + scrollY >= document.body.scrollHeight ||
      scrollY >= offsets[maxIndex]
    ) {
      index = maxIndex
    } else {
      index = findIndex(offsets, offset => offset >= scrollY) - 1
    }
    return index
  }, [headers])

  const [currentIndex, setCurrentIndex] = useState<number | undefined>(0)
  useEffect(() => {
    setCurrentIndex(calcActive())
    const onScrollForActive = throttle(() => setCurrentIndex(calcActive()), 300)
    window.addEventListener('scroll', onScrollForActive)

    return () => {
      onScrollForActive.cancel()
      window.removeEventListener('scroll', onScrollForActive)
    }
  }, [calcActive])

  return (
    <StyledTOC>
      <div className="wrapper">
        <div className="content">
          <ol>
            {headers.map(({ value, depth }, idx) => (
              <li
                key={idx}
                style={{ paddingLeft: `${depth * 11}px` }}
                className={currentIndex === idx ? 'active' : ''}
              >
                <a data-idx={idx} href={`#${slug(value)}`}>
                  {value}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </StyledTOC>
  )
}

export default PostToc
