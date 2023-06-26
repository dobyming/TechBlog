import React, { useCallback, useEffect } from 'react'
import styled from '@emotion/styled'
import { isBrowser } from '../../util'

const GiscusWrapper = styled.div`
  width: 768px;
  padding: 10px 0 0px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`
const COMMENTS_ID = 'comments-container'

const Giscus = (): JSX.Element => {
  if (isBrowser()) {
    const theme = window.document.body.classList.contains('dark')
      ? 'dark_high_contrast'
      : 'light_high_contrast'

    const LoadComments = useCallback(() => {
      const script = document.createElement('script')
      script.src = 'https://giscus.app/client.js'
      script.setAttribute('data-repo', 'dobyming/dobyming.github.io')
      script.setAttribute('data-repo-id', 'R_kgDOJXfTRw')
      script.setAttribute('data-category', 'Comments')
      script.setAttribute('data-category-id', 'DIC_kwDOJXfTR84CXeMK')
      script.setAttribute('data-mapping', 'pathname')
      script.setAttribute('data-reactions-enabled', '1')
      script.setAttribute('data-emit-metadata', '0')
      script.setAttribute('data-input-position', 'bottom')
      script.setAttribute('data-lang', 'ko')
      script.setAttribute('data-theme', theme)
      script.setAttribute('data-loading', 'lazy')
      script.setAttribute('crossorigin', 'anonymous')
      script.async = true

      const comments = document.getElementById(COMMENTS_ID)
      if (comments) comments.appendChild(script)

      return () => {
        if (comments) comments.innerHTML = ''
      }
    }, [theme])

    useEffect(() => {
      LoadComments()
    }, [LoadComments])
  }

  return <GiscusWrapper className="giscus" id={COMMENTS_ID} />
}

export default Giscus
