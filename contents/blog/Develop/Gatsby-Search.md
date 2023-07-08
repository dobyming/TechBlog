---
date: '2023-06-08'
title: 'Gatsby 블로그 - 검색기능 구현하기🔎'
categories: ['Web', 'Gatsby']
summary: '이번 포스팅에선 Gatsby 블로그에 검색 기능을 추가하는 방법에 대해서 적어보려고 합니다.'
thumbnail: '../../images/gatsby.jpg'
---
## 동기
동기라고 거창하게 써놨지만 별거 없습니다. 앞으로 이 블로그를 평생 쓸 예정인데.. 그럼 지금보다 포스팅 수도 더 많아질거고. 그러면 내가 일일이 무한 스크롤로 내려서 글을 찾는 행위 자체가 굉장히 불편한데? 

정말 이 사고의 흐름대로 생각했고 이 고민에 대한 결론은 "그래. 검색 기능을 만들어보자!" 로 귀결됐습니다. 


## 결과 화면
![](https://velog.velcdn.com/images/damin1025/post/515c2fd7-c31e-4497-81c5-65f39ba31a30/image.gif)
결과 화면은 위와 같이 검색 아이콘을 클릭 후 검색 페이지로 이동하여 keyword를 검색하면 아래에 관련 포스팅이 나열되고 그리고 원하는 포스팅으로 이동하는 방식으로 구현에 진행했습니다. 


## 어떤 기술을 선택할 것인가
[공식 docs](https://www.gatsbyjs.com/docs/how-to/adding-common-features/adding-search/)를 보면 gatsby에 검색을 구현하는 방법을 크게 2가지로 소개하고 있습니다.

첫 번째 방법은 **클라이언트 측 검색**입니다. 빌드 또는 런타임에 데이터를 인덱싱하고 이를 이용해 로컬에서 검색을 수행하는 방법입니다. 공식 docs에서는 `js-search`, `gatsby-plugin-elasticlunr-search`, `gatsby-plugin-local-search` 를 제시하고 있습니다.

두 번째 방법은 **API기반 검색엔진**을 활용하는 방법으로 외부 서비스를 활용하는 방식입니다. 빌드 시점에 검색 대상 데이터들을 인덱싱해 외부 서비스에 올려두고 런타임에는 API로 검색합니다.

하지만 API기반 검색엔진 사용 시 블로그의 빌드 배포 프로세스에 인덱스를 전송해야하고 사용 시 비용이 발생하거나 그리고 무료인 경우 횟수에 제약이 있어 굳이 사용해야 할 이유는 찾지 못했고, 클라이언트 측 검색 방법이 블로그에 부담이 덜 갈것 같은 방식이라고 생각하여 저는 첫번째 방법으로 아이디어를 scheme했습니다.

## 검색 관련 라이브러리 
여러 Gatsby Starter에 구현된 검색 기능을 참고해봤을때, GraphQL에서 요청한 edges를 모두 돌아 값을 불러오고, 그리고 그 값을 돌면서 search하는 방식으로 구현된 방식이 많았습니다. 하지만 search 시, 모든 배열의 사이즈에 depend하기 때문에 `O(N) time`이 소요되는 것을 생각하면 추후 포스팅 양이 많아지게 될때 검색 속도 저하를 야기할 수 있습니다. 따라서 검색 라이브러리를 활용하는 것이 시간 복잡도면에서 나을것 같다는 판단이 들었습니다. 

검색 라이브러리로 구현 시, 아래와 같은 기능을 제공합니다. 

- 인덱싱으로 빠른 검색
- 검색하려는 콘텐츠(제목 혹은 본문)에 더 가중치를 둘 수 있다
- 검색어 하이라이팅 기능
- 검색에 and, or과 같은 논리 연산 적용 가능

그럼 어떤 라이브러리로 이를 실현할 수 있을까 고민을 하던 중에 [해당 블로그](https://velog.io/@seyoung8239/Gatsby-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EA%B2%80%EC%83%89%EA%B8%B0%EB%8A%A5-%EB%8F%84%EC%9E%85%ED%95%98%EA%B8%B0)에서 아이디어를 얻어갈 수 있었습니다.

`flexsearch` 나 `lunr` 같은 경우는 한글 검색어 이슈가 있고(영문에 특화) `js-search`는 그 생태계가 아직 좁았기에 `fuse.js` 방식을 선택했습니다. 

## fuse.js 검색 
[fuse.js](https://fusejs.io/)는 fuzzy하게 search한다에서 착안됐습니다. 여기서 fuzzy란 **대략적으로 검색**한다의 의미를 지니고 있습니다. 

가장 큰 장점은 백엔드의 지원이 필요 없고, 다른 라이브러리에 dependency를 갖고 있지 않으며 결정적으로 **클라이언트 측 검색**기반이라는 것이었습니다. 

### Gatsby에서 fuse.js 사용하기
Gatsby 빌드 과정에서 목록을 인덱싱하여 어딘가 저장해두어야 하고 이렇게 생성된 데이터는 블로그의 런타임에 fuse.js 인스턴스를 생성하여 사용하도록 구성해야 합니다.

이때 빌드 과정은 플러그인을 활용하면 되고 런타임 검색은 hook을 활용하면 됩니다.

### gatsby-plugin-fusejs
[gatsby-plugin-fusejs](gatsby-plugin-fusejs) 해당 docs의 npm 명령어를 follow하여 설치를 진행 후, config를 설정합니다. 

```js
// gatsby-config.js
	{
      resolve: `gatsby-plugin-fusejs`,
      options: {
        // 인덱스를 만들고자 하는 데이터의 쿼리
        query: `
          {
            allMarkdownRemark {
              nodes {
                id
                rawMarkdownBody
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }
        `,
        // 인덱스를 만들고자 하는 데이터의 프로퍼티
        keys: ['title', 'body'],
        // graphql의 결과물을 단순 객체 배열로 변환하는 함수
        normalizer: ({ data }) =>
          data.allMarkdownRemark.nodes.map((node) => ({
            id: node.id,
            path: node.fields.slug,
            title: node.frontmatter.title,
            body: node.rawMarkdownBody,
          })),
      },
    },
```
설치 후 gatsby-config.js에 인덱스로 만들어지기 원하는 데이터의 쿼리, 데이터 중에서도 검색이 되었으면 하는 프로퍼티, GraphQL 결과물을 객체 배열로 변환하기 위한 함수를 옵션으로 전달합니다. 

![](https://velog.velcdn.com/images/damin1025/post/4ad55151-b71b-474f-bb50-aea87c69e6d3/image.PNG)

GraphQL 사이트에 접속 시, `allFusejs` 필드가 추가 됨을 확인할 수 있습니다.

### react-use-fusejs
다음으론 만들어진 인덱스를 활용하기 위해 런타임에 hook을 활용하여 검색을 수행해야 합니다. 

이때 매번 검색어를 입력 시, 인덱스를 parsing 후 인스턴스를 생성하게 되면 추후 포스팅의 양이 많아질때 자원이 낭비됩니다. (Props Drilling) 
따라서 이를 방지하기 위해서 index 페이지를 처음 Search 페이지를 클릭 했을때 모두 다운받고 그리고 그 다운받은 data들을 context에 담아 재사용할 수 있도록 유도하는 것이 더 효율적일것입니다. 

```tsx
/* Search.tsx */

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
```

인덱스를 재사용하기 위해서 context에 담을 것이고, 이는 최상위 컴포넌트에서 구현해줘야 합니다. 따라서 `context` 폴더를 새로 생성하고, `app.tsx` 파일을 새로 만들어서 아래와 같이 context를 App ➡ Search로 data를 위임할 수 있도록 합니다. 

```tsx
/* app.tsx */

import React, {
  createContext,
  SetStateAction,
  useState,
  ReactNode,
  FunctionComponent,
} from 'react'
import { Dispatch } from 'react'

interface AppContext {
  fuseData: any
  setFuseData: Dispatch<SetStateAction<any>>
}

export const AppContext = createContext<AppContext>({
  fuseData: null,
  setFuseData: () => {},
})

type AppProps = {
  children: ReactNode
}

// Provide Props to Search
const AppProvider: FunctionComponent<AppProps> = function ({ children }) {
  const [fuseData, setFuseData] = useState(null)

  return (
    <AppContext.Provider value={{ fuseData, setFuseData }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
```
이때 Provider에 value를 담을때 객체로 한번 더 감싸서 보내주는 이유는 data의(state) 값이 변경될때 setFuseData는 재생성되지 않지만, fuseData가 재생성되지 않도록 하기 위해 감싸서 보냅니다. 

```js
// gatsby-browser.js
import { AppProvider } from './src/context/app'
 
export const wrapRootElement = ({ element }) => {
  return <AppProvider>{element}</AppProvider>
}
```

위와 같이 코드를 모두 구성 시, React-Developer-Tools를 확인하면 Context에 post 정보들이 담겨있는것을 확인할 수 있습니다. 그렇기 때문에 검색어를 입력 시, 해당 값들은 이미 담겨있어 자원의 낭비를 최소화 할 수 있습니다. 
![](https://velog.velcdn.com/images/damin1025/post/3258df66-245c-4b99-84aa-6f0d09f7371e/image.PNG)


## 배포 후 성능 check

![](https://velog.velcdn.com/images/damin1025/post/56f43f3a-a80b-42e2-8091-35326e624444/image.PNG)

검색 기능 추가 후, lightHouse 점수를 확인해본 결과 퍼포에서 1점 깎인것 빼곤 모두 100을 유지했다..!! 
