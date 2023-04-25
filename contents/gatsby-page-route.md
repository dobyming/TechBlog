---
date: '2023-04-17'
title: 'Gatsby에서 페이지 라우팅 하는법'
categories: ['Web', 'Gatsby']
summary: 'Gatsby에서는 어떤 방식으로 라우팅을 진행할까?'
thumbnail: './gatsby.jpg'
---

## Gatsby에서 페이지 라우팅하기 

Gatsby에서 페이지간 라우팅 하는 방식은 2가지가 있습니다. 

첫번째는 `a` 태그를 활용하는 것입니다. pages 폴더 내에 선언된 파일들은 '/파일명'으로 페이지 간 이동이 가능합니다. 
하지만 React 기반으로 설계된 프레임워크인 Gatsby를 감히 매번 페이지 이동 시, refresh 되게 구현하면... 이걸로 왜 개발 하냐구요 (UX도 매우 저하되구요) 


## Gatsby Link API 활용하기 

Gatsby에서 제공하는 페이지 이동 API인  <span style="color:red">Gatsby Link API</span>을 활용하여 페이지 간 라우팅을 구현할 수 있습니다. 이 API를 통해 페이지 이동을 구현하면 보다 더 높은 성능의 정적 사이트를 구현할 수 있습니다.

### Usage
```tsx
import { Link } from 'gatsby'
<Link to="/info/">To Info</Link>
```
기본적인 사용방법은 위와 같습니다. `Link`를 import 후, Link 태그의 to의 props로 이동할 페이지명을 적어주면 됩니다. 

해당 방식으로 구현 시, a 태그를 사용했을때보다 Link태그를 활용하여 페이지 간 라우팅 방식이 훨씬 더 매끄럽고 속도도 향상됨을 체감할 수 있을 것 입니다. 

그러면 우리는 왜 이럴 수 있는지에 대한 근거까지 알아봐야겠죠

### Gatsby Link API의 성능상 이점
궁극적인 근거는 Gatsby는 **Prefetch**를 통해서 페이지에서 사용할 리소스의 로딩 속도를 높일 수 있습니다. 

즉 Prefetch는 이와 같은 개념입니다. 

1. 페이지가 로드가 됌 -> 현재 로드된 페이지 내에서 사용되는 모든 링크 찾은 후 -> 각 링크의 페이지를 <span style="color:red">미리</span> 로드 
2. 즉 예를 들면, `index.tsx` 페이지 로드가 됨 -> 동시에 `Link` 태그를 찾음(`/info`) -> 이 페이지(`info`)를 미리 로드해둠 

