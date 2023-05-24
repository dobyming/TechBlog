import React, { createRef, FunctionComponent, useEffect } from 'react'
import styled from '@emotion/styled'
import { isBrowser } from '../../util'

const src = 'https://utteranc.es/client.js'
const repo = 'dobyming/dobyming.github.io' // 자신 계정의 레포지토리로 설정

type UtterancesAttributesType = {
  src: string
  repo: string
  'issue-term': string
  label: string
  theme: string
  crossorigin: string
  async: string
}

const UtterancesWrapper = styled.div`
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`

const CommentWidget: FunctionComponent = function () {
  const element = createRef<HTMLDivElement>()
  if (isBrowser()) {
    const theme = window.document.body.classList.contains('dark')
      ? 'photon-dark'
      : 'github-light'

    useEffect(() => {
      if (element.current === null) return
      // mount 시 empty script 생성
      const utterances: HTMLScriptElement = document.createElement('script')

      const attributes: UtterancesAttributesType = {
        src,
        repo,
        'issue-term': 'pathname',
        label: 'Comment',
        theme: theme,
        crossorigin: 'anonymous',
        async: 'true',
      }

      Object.entries(attributes).forEach(([key, value]) => {
        utterances.setAttribute(key, value)
      })

      element.current.appendChild(utterances)
    }, [])

    useEffect(() => {
      const mutationObserver: MutationObserver = new MutationObserver(
        mutationsList => {
          mutationsList.forEach(mutation => {
            if (mutation.attributeName === 'class') {
              if (window.document.querySelector('.utterances-frame')) {
                const theme = mutation.target.classList.contains('dark')
                  ? 'photon-dark'
                  : 'github-light'
                const message = {
                  type: 'set-theme',
                  theme: theme,
                }
                const iframe =
                  window.document.querySelector('.utterances-frame')
                iframe.contentWindow.postMessage(message, 'https://utteranc.es')
              }
            }
          })
        },
      )
      mutationObserver.observe(document.body, { attributes: true })
    }, [])
  }

  return <UtterancesWrapper ref={element} />
}

export default CommentWidget
