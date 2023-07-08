import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import { ResumeType } from 'types/PostItem.types'
import styled from '@emotion/styled'

type AboutProps = {
  data: {
    allMarkdownRemark: {
      edges: ResumeType
    }
  }
}

const MarkdownRenderer = styled.div`
  // Renderer Style
  display: flex;
  flex-direction: column;
  width: 768px;
  margin: 0 auto;
  padding: 30px 0;
  word-break: break-word;

  // Markdown Style
  line-height: 1.8rem;
  font-size: 15px;
  font-weight: 400;

  // Apply Padding Attribute to All Elements
  p,
  .gatsby-highlight {
    margin: 0.5rem 0 1rem;
  }

  em {
    color: gray;
  }

  // Adjust Heading Element Style
  h1,
  h2,
  h3 {
    font-weight: 800;
    margin-bottom: 5px;
  }

  * + h1 {
    margin-top: 30px;
  }

  * + h2,
  * + h3 {
    margin-top: 20px;
  }

  h1 {
    border-left: 12px solid #3eb489;
    padding-left: 8px;
    padding-bottom: 0px;
    font-size: 32px;
  }

  h2 {
    font-size: 24px;
  }

  h3 {
    font-size: 18px;
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
    margin: 0 0 2rem;
    padding-left: 2rem;
  }

  ul {
    margin-bottom: 15px;
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

  // Markdown Responsive Design
  @media (max-width: 768px) {
    width: 90%;
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

const about: FunctionComponent<AboutProps> = function ({ data }) {
  const resumes = data.allMarkdownRemark.edges
  const resume = resumes.map(({ node }) => node)[0]

  return <MarkdownRenderer dangerouslySetInnerHTML={{ __html: resume.html }} />
}

export default about

// Static Query
export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { categories: { eq: null } } }) {
      edges {
        node {
          id
          html
        }
      }
    }
  }
`
