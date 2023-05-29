---
date: '2023-05-29'
title: 'Gatsby 블로그 - 개발하면서 만났던 Issue'
categories: ['Web', 'Gatsby']
summary: 'Gatsby로 블로그를 개발하면서 직면했던 Issue들과 Trouble Shooting 방법들을 공유합니다.'
thumbnail: '../images/error.jpg'
---
`Gastby` 프레임워크를 활용하여 블로그를 구현하고 운영한지 어느덧 2달이 다 되가고 있네요.. 다양한 기능들을 블로그에 하나씩 덧붙혀가면서 동시에 에러도 같이 늘어났었는데요 😅 

이 기간동안 제가 접한 Issue들과 어떻게 해결하려고 노력했는지를 여러분께 공유하려고 해요. 


## #418 #423 Minified Error 
어느정도 블로그를 구현하고 배포하면서 lightHouse로 Performance 점수를 측정하는데 Best Practices 부문에서 자꾸 92점이라는 Score가 찍혀있었고, 해당 원인으로는 Console log에 에러가 찍히는데? 라고 알려주더라구요. 

![](https://velog.velcdn.com/images/damin1025/post/f8871c18-0dc4-4b03-be52-0fcf92b7ab65/image.PNG)

LightHouse에서 말한 이슈가 이걸 의미하는걸까 싶었고 또한 콘솔에 많은 에러가 찍혀있는건 개발자 입장에서도 매우 거슬렸기 때문에 이를 본격적으로 해결하고자 했어요.

[해당 블로그](https://vaihe.com/blog/react-hydration-error-explained/)에서 그 원인을 찾을 수 있었어요. 이 에러의 정확한 명칭은 **React Hydration** 에러이고, 이 에러는 Client Render와 Server Render가 일치하지 않을때 발생한다고 해요. 

Gatsby는 Pre-Render되는 속성이 있기 때문에, 이때 이 Pre-Render되는 HTML 파일과 React(대표적 CSR 라이브러리이자 Gatsby의 근간)에서 Virtual Dom으로 쌓아올린 HTML 파일과 <span style="color:red">일치하지 않아서 발생하는 거예요.</span> 그래서 Pre-Render된 HTML 파일이 렌더링이 되는 것이 아니라 자체적으로  React가 쌓아올린걸로 replace 되버리는 거죠. 

이렇게 되버리면 우리는 Gatsby의 장점을 살릴 수 없어요 😱

### 해결
결국엔 모든 문제는 Server와의 연산이 요구되는 코드에서 에러가 발생하는거라고 판단했어요. Pre-Render 시에는 Server 연산을 참조하지 못하는데요, 대표적으로 `window` 객체라는게 뭔지도 모르는 상태에서 요청하면 안되기 때문에 이를 Validation하는 작업이 필요해요.

제 블로그에서 첫 index page를 load 할때 가장 의심이 가는 부분은 바로 다크모드를 handle할 수 있는 `HeaderTheme` 컴포넌트였어요. 왜냐하면 localStorage를 참조하여 dark인지 light인지를 담는 연산을 수행하고 있기 때문이에요. 

그래서 `HeaderTheme`의 토글 버튼이 로딩을 **lazy loading**으로 수행함으로써 이 문제를 해결할 수 있었어요. 

```tsx
// ClientOnly.tsx
import React, { useState, useEffect, ReactNode, FunctionComponent } from 'react'

type ClientProps = {
  children: ReactNode
}

const ClientOnly: FunctionComponent<ClientProps> = function ({ children }) {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return <>{children}</>
}

export default ClientOnly
```
`ClientOnly`를 `HeaderTheme` 컴포넌트의 최상단으로 배치해서 HTML 파일이 모두 성공적으로 load후 토글버튼을 리턴하는 방식으로 이 문제를 해결할 수 있었어요.

이건 실제로 제가 해결한 [PR](https://github.com/dobyming/dobyming.github.io/pull/16#issue-1723164020) 이에요.

## Dark Mode State Flicking 

![](https://velog.velcdn.com/images/damin1025/post/c555ab5e-d15c-482f-925e-ead9b3db00ab/image.gif)

이건 GIF를 보면서 설명하면 더 이해가 잘될것 같아요. 
혹시 `<-` 아이콘이 갑자기 Resizing이 일어나고 그리고 Dark mode Toggle 버튼은 해->달로 잠깐 깜빡이는것을 목격하셨나요? 

기능은 정상적으로 수행은 되는 버튼이라도, 이런 자잘한 에러들은 UX를 떨어트리는 요소라고 생각했어요. 

우선 `<-` 버튼 같은 경우는 `fontAwesome`에서 icon을 import하여 사용하고 있었어요. 그리고 이 Resizing 에러가 발생한 원인은 다음과 같았어요.

> Instead, they are downloaded through a separate network request and then inserted into the document using Javascript. It’s essentially DOM manipulation, which is how React (which underlies Gatsby) works. Only this time, instead of manipulating UI elements like `<div>`, it is inserting a `<style>` element. Essentially, the styles are downloaded externally and inserted into the document through DOM manipulation. ([출처](https://medium.com/@fabianterh/fixing-flashing-huge-font-awesome-icons-on-a-gatsby-static-site-787e1cfb3a18))

요약하면, 해당 icon이 inline하게 HTML에 insert되는게 아니라 `style` 태그로 삽입되어서 **외부적**으로 download가 이뤄진 후에 DOM에 삽입이 되어서 이런 이슈가 발생하는거라고 해요. 즉 Gatsby에선 이 icon이 CSS가 load되어 삽입되기 전에 이미 존재하기 때문에 Resize되는 현상을 목도하게 되는거에요. 

따라서 이 문제는 icon이 CSS에 Auto Add 되는것을 막으면 해결할 수 있어요. 즉 `inline`하게 설계해야 하는거죠. FontAwesome의 Config setting을 통해 쉽게 해결할 수 있어요. 그러면 build time에 해당 icon이 내장하게 되요. 

```js
// gatsby-browser.js
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'

config.autoAddCss = false;
```
<br/>

### useEffect와 useLayoutEffect 적절히 사용하기
다음으론 다크모드 토글버튼의 상태값이 해->달로 잠깐 보였다가 사라지는 이슈를 해결할 차례예요. 우선 React Developer Tool로 State의 감지를 살펴봤을땐 boolean값이 잠깐 바뀌는 현상이 일어나진 않았어요. 

그럼 뭐가 문제인걸까 생각했을때, 이벤트가 Trigger되는 시점에 대해서 생각해보게 됐어요. 저는 다크모드 토글이 이뤄지는 이벤트 Trigger를 `useEffect` 리액트 훅을 이용하여 Trigger했었는데, 이에 대적하는 `useLayoutEffect` 리액트 훅에 대해서 알아보기로 했어요. 

사실 기업 면접에서 `useEffect` 와 `useLayoutEffect`의 차이점을 아세요? 라는 질문을 받았던 경험이 있었는데 슬프게도 대답을 못했고, 또한 사용해보지 않은 Hook 이었기 때문에 이참에 더 알아보기로 했어요. 이 [블로그](https://pubudu2013101.medium.com/what-is-the-real-difference-between-react-useeffect-and-uselayouteffect-51723096dc19)에서 많은 도움을 받았어요.
 
두 리액트 훅의 결정적 차이는 바로 **시점**으로 볼 수 있어요. 
#### useEffect
useEffect 는 컴포넌트들이 **render 와 paint** 된 후 실행돼요. 즉 비동기적(asynchronous) 으로 실행되고, paint된 후 실행되기 때문에 useEffect 내부에 DOM에 영향을 주는 코드가 있을 경우 사용자 입장에서는 화면의 flicker 현상을 볼 수 있어요. 

#### useLayoutEffect
useLayoutEffect 는 컴포넌트들이 **render 된 후 실행되며**, 그 이후에 paint 되요. 이 작업은 동기적(synchronous) 으로 실행되며 paint 가 되기전에 실행되기 때문에 DOM을 조작하는 코드가 존재하더라도 사용자는 깜빡임을 경험하지 않아요.


```tsx
// trigger theme change refer localStorage's key-value
  useEffect(() => {
    if (userTheme === 'dark') {
      document.body.classList.remove('light')
      document.body.classList.add('dark')
      setIsDark(true)
    } else {
      document.body.classList.remove('dark')
      document.body.classList.add('light')
      setIsDark(false)
    }
  }, [userTheme])
```
기존 코드를  보면, `document` 객체에 접근하죠? 그리고 `useEffect`로 이를 Trigger하고 있기 때문에 현재 state가 flicker되는 현상을 볼 수 있었던거예요. 

이때 주의할 점은 `useLayoutEffect`는 paint되기 전에 실행되기 때문에 **React Hydration Issue** 를 만날 수 있는데 (클라이언트화면 !== 서버화면) 이는 상단에 제가 언급한 Minified error와 맞물리기 때문에 해당 validation을 최상단 컴포넌트에서 감아주면 문제를 해결할 수 있어요. 

![](https://velog.velcdn.com/images/damin1025/post/c03d5350-d60b-44e2-a565-04f092e6f3b2/image.gif)

더이상은 해로 잠깐 보였다가 사라지는 현상은 볼 수 없게 되요😙

## Ongoing..
Gatsby로 이것저것 접목해서 블로그를 만들면서 가장 많이 접한 개념은 브라우저의 작동방식이었어요. 실제로 개발을 진행하면서 CSR, SSR, SSG와 같이 렌더링에 대한 개념을 기존보다 더 딥하게 체감하며 개념의 중요성을 깨달을 수 있었던 좋은 트러블 슈팅을 경험했다고 생각해요. 

### +) 23.05.29 LightHouse 점수 💯
![](https://velog.velcdn.com/images/damin1025/post/89bfd0af-9bac-4670-b46e-c27acc9d1d00/image.PNG)

Performance에서 2점이 부족한데.. 400점을 받는 그날까지 계속해서 성능 튜닝을 진행할 예정입니닷..!👊

### 🙇🏼‍♀️참고
**React Hydration Issue**

https://www.codeandweb.com/tutorials/gatsby-lazy-loading-with-react-lazy

https://egghead.io/lessons/react-avoiding-state-flickers-in-gatsby-applications

https://vaihe.com/blog/fixing-gatsby-hydration-flicker-issue/

**Gastby SSR Issue(함께 읽으면 좋음)**

https://stackoverflow.com/questions/64371186/gatsby-window-not-available-during-server-side-rendering-build-error

https://www.gatsbyjs.com/docs/debugging-html-builds/#how-to-check-if-window-is-defined