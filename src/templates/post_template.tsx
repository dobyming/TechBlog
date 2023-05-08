import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import { PostPageItemType } from 'types/PostItem.types'
import Template from 'components/Common/Template'
import PostHead from 'components/Post/PostHead'
import PostContent from 'components/Post/PostContent'
import CommentWidget from 'components/Post/CommentWidget'
import ScrollToTop from 'components/Common/ScrollToTop'
import HeaderTheme from 'components/Common/HeaderTheme'
import PostPrevNextBtn from 'components/Post/PostPrevNextBtn'

type PostTemplateProps = {
  data: {
    allMarkdownRemark: {
      edges: PostPageItemType[]
    }
  }
  location: {
    href: string
  }
  pageContext: {
    prev: {
      node: {
        fields: {
          slug: string
        }
      }
    }
    next: {
      node: {
        fields: {
          slug: string
        }
      }
    }
  }
}

const PostTemplate: FunctionComponent<PostTemplateProps> = function ({
  data: {
    allMarkdownRemark: { edges },
  },
  location: { href },
  pageContext: { prev, next },
}) {
  const {
    node: {
      html,
      frontmatter: {
        title,
        summary,
        date,
        categories,
        thumbnail: {
          childImageSharp: { gatsbyImageData },
          publicURL,
        },
      },
    },
  } = edges[0]

  return (
    <Template title={title} description={summary} url={href} image={publicURL}>
      <PostHead
        title={title}
        date={date}
        categories={categories}
        thumbnail={gatsbyImageData}
      />
      <HeaderTheme />
      <PostContent html={html} />
      <PostPrevNextBtn
        previousPagePath={prev ? prev.node.fields.slug : null}
        nextPagePath={next ? next.node.fields.slug : null}
      />
      <CommentWidget />
      <ScrollToTop />
    </Template>
  )
}

export default PostTemplate

// Query로 .MD data request(일치하는 slug를 찾아서 요청)
export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
              publicURL
            }
          }
        }
      }
    }
  }
`
