import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

interface PostContentProps {
  html: string
}

const MarkdownRenderer = styled.div`
  // Renderer Style
  display: flex;
  flex-direction: column;
  width: 768px;
  margin: 0 auto;
  padding: 80px 0;
  word-break: break-all;

  // Markdown Style
  line-height: 2;
  font-size: 15px;
  font-weight: 400;

  // Apply Padding Attribute to All Elements
  p {
    padding: 3px 0;
  }

  // Adjust Heading Element Style
  h1,
  h2,
  h3 {
    font-weight: 800;
    margin-bottom: 20px;
  }

  * + h1,
  * + h2,
  * + h3,
  * + h4 {
    margin-top: 50px;
  }

  hr + h1,
  hr + h2,
  hr + h3 {
    margin-top: 0;
  }

  h1 {
    font-size: 30px;
  }

  h2 {
    font-size: 25px;
  }

  h3 {
    font-size: 20px;
  }

  // Adjust Quotation Element Style
  blockquote {
    margin: 30px 0;
    padding: 0 1em;
    color: #000000;
    border-left: 0.25em solid #dfe2e5;
  }

  // Adjust List Element Style
  ol,
  ul {
    margin-left: 20px;
    padding: 30px 0;
  }

  img {
    max-width: 100%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }

  // Adjust Horizontal Rule style
  hr {
    border: 0.5px solid #dfe2e5;
    margin: 32px 0;
  }

  // Adjust Link Element Style
  a {
    color: #00a170;
    text-decoration: none;
  }

  a:hover {
    color: #f6546a;
    text-decoration: underline;
  }

  // Adjust Code Style
  pre[class*='language-'] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
    background: #1e1e1e;

    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.5);
      border-radius: 3px;
    }
  }

  code[class*='language-'],
  pre[class*='language-'] {
    tab-size: 2;
  }

  code[class='language-text'] {
    padding: 0.1em 0.3em;
    border-radius: 0.3em;
    white-space: normal;
    text-shadow: none;
    background: #b3d4fc;
    color: #000000;
  }

  // Markdown Responsive Design
  @media (max-width: 768px) {
    width: 100%;
    padding: 10px 20px;
    line-height: 1.6;
    font-size: 14px;

    h1 {
      font-size: 23px;
    }

    h2 {
      font-size: 20px;
    }

    h3 {
      font-size: 17px;
    }

    img {
      width: 100%;
    }

    hr {
      margin: 50px 0;
    }
  }
`

const PostContent: FunctionComponent<PostContentProps> = function ({ html }) {
  return <MarkdownRenderer dangerouslySetInnerHTML={{ __html: html }} />
}

export default PostContent
