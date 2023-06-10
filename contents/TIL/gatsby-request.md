---
date: '2023-04-17'
title: 'Gatsby - GraphQL로 query 요청하기'
categories: ['Web', 'Gatsby','GraphQL']
summary: '정적 웹사이트의 콘텐츠 데이터를 관리하는데 있어 GraphQL로 진행할 수 있습니다.'
thumbnail: '../images/graphql.png'
---

## GraphQL이란?
GraphQL은 페이스북에서 개발한 **쿼리 언어**입니다.
각각의 엔드포인트에서 고정된 데이터를 받을 수 있는 Rest API와는 다르게 GraphQL은 <span style="color:red">**단일 엔드포인트**</span>에서 원하는 데이터만을 받을 수 있다는 장점을 가지고 있습니다.

정적 웹사이트의 콘텐츠 데이터를 관리하는데 있어 GraphQL로 진행할 수 있습니다. 

## Gatsby에서 GraphQL을 사용하는 방법

그럼 Gatsby에서 GraphQL로 query로 요청해서 웹사이트로 값을 불러오는 방법에 대해서 알아보겠습니다. 

우선 `pages` 폴더 내에 `info.tsx`를 선언합니다. 

```tsx
import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import Text from 'components/Text'

type InfoPageProps = {}

const InfoPage: FunctionComponent<InfoPageProps> = function () {
  return (
    <div>
      <Text text="Hello" />
    </div>
  )
}

export default InfoPage
```
일반적인 컴포넌트에서는 변수로서 정의가 불가능하고, **StaticQuery**라는 기능을 통해 정의가 가능합니다. pages 폴더 내부에 있는 컴포넌트에서는 다음과 같이 Query를 정의하고 요청할 수 있습니다.

```tsx
import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import Text from 'components/Text'

type InfoPageProps = {}

const InfoPage: FunctionComponent<InfoPageProps> = function () {
  return (
    <div>
      <Text text="Hello" />
    </div>
  )
}

export default InfoPage

// query 요청 부 
export const metadataQuery = graphql`
  {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
```

`metadataQuery` 변수에 요청한 Query를 요청 시, 요청에 대한 응답 값은 `InfoPage` 컴포넌트의 Props로 전달해줍니다. 마지막으로 `InfoPage` 컴포넌트의 매개변수로 값을 불러오면서 Gatsby에서 GraphQL을 통한 Query 요청 작업이 마무리 됩니다. 
```tsx
import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import Text from 'components/Text'

// 요청한 Query의 데이터 구조에 따라 type을 지정 
type InfoPageProps = {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: string
      }
    }
  }
}

// 매개변수로 요청한 Query를 Props로 전달 
const InfoPage: FunctionComponent<InfoPageProps> = function ({
  data: {
    site: {
      siteMetadata: { title, description, author },
    },
  },
}) {
  return (
    <div>
      <Text text={title} />
      <Text text={description} />
      <Text text={author} />
    </div>
  )
}

export default InfoPage

export const metadataQuery = graphql`
  {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;
```

이와 같이 Gatsby에서 GraphQL을 통해 데이터를 요청하고 응답받는 과정을 수행할 수 있습니다. 