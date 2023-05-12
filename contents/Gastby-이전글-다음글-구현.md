---
date: '2023-05-09'
title: 'Gatsby 블로그 - 이전글/다음글 버튼 로직 구현하기 '
categories: ['Web', 'Gatsby']
summary: '**이전글/다음글** 기능을 구현해서 사용자가 다른 포스팅도 쉽게 접근할 수 있도록 해야겠다! 라는 생각에서 시작했습니다.'
thumbnail: './images/gatsby.jpg'
---
## 동기 
요즘 `Gatsby`를 활용하여 Tech Blog를 구현하고 있습니다. 얼추 포스팅 템플릿도 구현이 된 상태에서, 다른 사람들이 만든 블로그와 특히 개발 블로그로 유명한 **velog**에서 어떤 요소들을 갖고 있는지 체크해본 결과, 

- TOC (Table Of Contents) 기능 
- 이전글/다음글 기능 
- 댓글 기능 
- ScrollToTop 버튼 기능 

이 정도로 추려 볼 수 있을것 같습니다. 그래서 저도 최소한 저 기능들은 탑재한 블로그를 제작해야지 생각했습니다. 댓글 기능(Utterance 활용)이나 ScrollToTop 기능은 구글링하면 코드 예제도 많아서 금방 구현할 수 있었습니다. 

제가 이 블로그를 쓰는 이유는 **이전글/다음글** 기능 제작기를 해당 포스팅을 통해서 나열하고자 합니다.. (왜냐하면 3일동안 삽질했기에)
그리고 결정적인 동기는 단순히 사람들이 이 기능을 많이 개발해서 나도 해야지 보단 제 블로그의 작동 구조에 대해서 생각했습니다.

>👀 시나리오 
>1. 블로그를 읽는다.
>2. 이전글이나 다음글을 보고 싶은데?
>3. ScrollToTop 버튼을 누르고 `<-` 버튼을 눌러 홈화면으로 돌아온다

사용자 경험이 떨어질것 같은 시나리오라고 생각했습니다. 따라서 **이전글/다음글** 기능을 구현해서 사용자가 다른 포스팅도 쉽게 접근할 수 있도록 해야겠다! 라는 생각에서 시작했습니다. 

## 결과

![](https://velog.velcdn.com/images/damin1025/post/577bc8c0-a684-4373-9bb8-700597f2a817/image.gif)

우선 결과부터 보여드리겠습니다. 동작 방식은 위와 같고, 만약 가장 최신 포스트이거나 아니면 가장 오래된 포스트라면 다음글/이전글 버튼이 비활성화 될 수 있도록 로직을 설계했습니다. 

## gatsby-node.js 파일 수정 

마크다운 파일을 페이지로 변환해주는 `createPages` 에서 비동기적으로 query를 요청하는 부분입니다. 해당 부분에서는, `contents` 폴더 (이 부분은 `gatsby-config.js`에서 options을 설정해줬을거라고 생각하고 설명은 생략하겠습니다.) 에 담긴 마크다운 파일들을 모두 요청합니다. 

```jsx
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  // Get All Markdown File For create Pages
  const queryAllMarkdownData = await graphql(
    `
      {
        allMarkdownRemark(
          sort: {
            order: DESC
            fields: [frontmatter___date, frontmatter___title]
          }
        ) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `,
  );
  // ...
}
```
반드시 `graphiql` 에서 해당 쿼리가 정상적으로 출력되는지 확인합니다. (slug가 알맞게 나오는지가 중요) 


```jsx
  // Import Post Template Component
  const PostTemplateComponent = path.resolve(
    __dirname,
    'src/templates/post_template.tsx',
  );

  const posts = queryAllMarkdownData.data.allMarkdownRemark.edges
  posts.forEach((
    {
      node: {
        fields: { slug },
      }
    },
    index
  ) => {
    // Logic of Prev/Next Button 
    const prev = index === 0 ? null : posts[index-1]
    const next = index === posts.length -1 ? null: posts[index+1]
    createPage({
      path: slug,
      component: PostTemplateComponent,
      context: {
        slug,
        prev,
        next,
      }
    })
  })
```
`posts` 배열을 돌면서, 아까 위에서 언급한 로직을 `prev`, `next`에 작성합니다. 만약 가장 최신글이거나, 가장 오래된 글이면 slug는 <span style="color:red">null</span>로 세팅될것입니다. 그리고  `createPage`에 context에 `prev`, `next`를 추가합니다. 


## 이전글/다음글 컴포넌트 설계하기 
이제 이전글/다음글 버튼 컴포넌트를 만듭시다. 뭐 디자인적인 부분은 본인이 원하는대로 Styling에 진행하면 될 것 같습니다. 

공통적인 부분이라면, `Props`를 부모 컴포넌트(`post_template`-블로그 포스팅 템플릿)에서 받아오는 부분일것 같습니다. 우리는 slug를 활용해서 접근할 것이고, slug는 string 타입입니다. 따라서 Props로는 `이전글 slug`와 `다음글 slug`를 받아오면 될 것 같습니다. 

```tsx
export type PrevNextProps = {
  previousPagePath: string | null
  nextPagePath: string | null
}

const PostPrevNextBtn: FunctionComponent<PrevNextProps> = function ({
  previousPagePath,
  nextPagePath,
}) {
  return (
    <StyledPager>
      <ul>
        <li>
          {previousPagePath !== null ? (
            <Link to={previousPagePath}>
              <Left /> 다음글
            </Link>
          ) : (
            <span>
              <Left /> 다음글
            </span>
          )}
        </li>

        <li>
          {nextPagePath !== null ? (
            <Link to={nextPagePath}>
              이전글 <Right />
            </Link>
          ) : (
            <span>
              이전글 <Right />
            </span>
          )}
        </li>
      </ul>
    </StyledPager>
  )
}

export default PostPrevNextBtn
```

## post_template 에서 slug 조작하기 
post_template은 엄밀히 따지면 위에서 설계한 컴포넌트에 Props를 뿌려줘야할 부모 컴포넌트에 해당합니다. 우리는 해당 템플릿에서 `gatsby-node.js` 에서 query로 요청한 값들을 이제 받아와야 합니다. 우선 Props로 그 부분에 대한 타입을 명시합니다. 

```tsx
type PostTemplateProps = {
  // ...
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
```

그리고 pageContext가 잘 받아와지는지 `console.log(pageContext)`를 수행해보세요. `next,prev,slug`가 object형태로 출력이 된다면 정상적으로 query요청값을 받아왔습니다. 

```tsx
const PostTemplate: FunctionComponent<PostTemplateProps> = function ({
  //...
  pageContext: { prev, next },
}) {
  return (
    //...
      <PostPrevNextBtn
        previousPagePath={prev ? prev.node.fields.slug : null}
        nextPagePath={next ? next.node.fields.slug : null}
      />
    //...
  )
}
```
잘 받아온 `next`와 `prev`의 object값을 parsing한 slug값을, `PostPrevNextBtn` 컴포넌트에 Props로 넘겨줍니다. 

이때 가장 최신글이나,가장 오래된 글에 대해서는 pageContext console을 찍어보면 `prev,next` object이 **key값으로도 등장하지 않습니다.** 이에 대한 validation check가 필요하기 때문에 위와 같이 삼항연산자를 통해 걸러줍니다. 


## 맺음말
잘 작동하나요? 저도 여러번의 삽질을 통해서 구현한거라 모두에게 상용될 방법은 아니라고 생각합니다 ㅎㅎ.. 제가 구현한 로직도 역시 참고용으로 본인 코드에 필요한 부분만 떼어가서 살을 붙히시면 될 것 같습니다.🤗 
