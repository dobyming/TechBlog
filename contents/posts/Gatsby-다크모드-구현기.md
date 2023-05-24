---
date: '2023-05-24'
title: 'Gatsby 블로그 - 다크모드 구현기🌗'
categories: ['Web', 'Gatsby']
summary: '어리바리 응애 FE 개발자의 다크모드 구현 삽질기 - 어디서부터 어떻게 해야될지 감을 못잡겠다면🥴'
thumbnail: '../images/gatsby.jpg'
---

우선 글을 시작하기 전에.. 5월 24일 부로 블로그 개발을 시작한지 1달 넘은 시점에서 100개의 commit을 달성했습니다..🥳

<div style="text-align:center"><img src="https://velog.velcdn.com/images/damin1025/post/0e0117f4-e670-4a3c-a849-c5eadf34c786/image.PNG" /></div>


저에게 이 `개발 블로그` 프로젝트는 **프론트엔드가 뭔지 제대로 보여준** 프로젝트나 다름 없어서 배운게 정말 많은 고마운 프로젝트입니다. 만약 프론트엔드를 내 커리어패스로 밟고 싶다고 한다면 자신만의 블로그 만드는 것을 적극 추천할 정도로 배울게 정말 많고 좋은 프로젝트라고 생각합니다. 

사족은 여기서 마무리 짓고.. 다크모드를 구현하면서 겪은 제 삽질기를 나열해보겠습니다 🤪...


## 동기 
이 프로젝트를 처음 구상하고 그리고 기능들을 하나씩 만들어 나갈때 세운 목표 중 하나가 다크모드는 꼭 만들어야지..! 생각했습니다. 특히 프론트엔드에서 이제 없으면 허전할 정도라고 볼 수 있는 **다크모드🌗** 기능을 Gatsby와 어느정도 친해지면 제대로 파야겠다 생각했고 때가 온 것이었습니다. 

일전에 React를 배우기 위해서 [Emotionary](https://github.com/dobyming/Emotionary) 프로젝트를 진행 중, `Provider` 개념을 활용하여 최상위 컴포넌트에서 `theme` props를 전달하여 다크모드를 구현했던 경험이 있었고, Gatsby에서도 이런 개념을 활용하면 되려나? 생각으로부터 시작하며 구현에 Dive 했습니다. 

## Theme을 어떻게 전달할 것인가 : ThemeProvider VS CSS Variable
대략적인 Mock Up은 이렇게 구상했었습니다.
>토글 버튼이 있음(component) -> 클릭 값(state)에 따라 어떤 theme을 보여줄지 결정할 것. (boolean 속성으로 true면 dark, false면 light) 

그리고 이때 `theme`을 어떻게 전달할 것인가? 이게 관건이었습니다.  

### 🤔 emotion의 ThemeProvider로 삽질 
~~오래전에 수행한 삽질이라 기억이 약간 가물하네요...ㅠ~~

기존에 `Provider`를 활용하여 구현해 본 경험이 있었기 때문에 마침 `emotion`에서 `ThemeProvider` Theme package를 지원하고 있었고 저 역시 이걸로 구현해야겠다 생각하며 코드 구현에 진행했지만, ... build는 커녕 develop 단계에서부터 error를 만나게 되어 머리를 싸맸습니다.

### 🥰 CSS Variable로 광명을 찾다 
'토글 버튼의 클릭 값에 따라 어떤 theme을 보여줄 지..' 이 문장에서 CSS Variable과 엮을 수 있습니다. 

```tsx
// trigger theme change refer localStorage's key-value
 useLayoutEffect(() => {
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
여기서 `userTheme`이 현재 state이고, 그 state가 `dark`라면 `body` 태그의 className을 `dark`라고 지정하고, 그 반대면 `light`로 지정합니다. 

그러면 이 `body` 태그의 className에 따라서 CSS Variable로 지정할 수 있었습니다.   
```css
/*theme.css*/

.light {
    --color-background:#f6f6f6;
}

.dark {
    --color-background: #25262c;
    --color-text: #f6f6f6;
}

body {
    background-color: var(--color-background);
    transition: 0.2s;
}

h1,
h2,
h3,
h4,
h5,
hr,
a,
p,
li,
td,
tr,
footer,
span {
  color: var(--color-text);
}
```
`theme.css` 파일에 위와 같이 정의할 수 있습니다. 상단에는 body의 className에 따라서 어떤 css 속성 값을 부여할 지 rgb 값을 정의합니다. 그리고 **원하는 태그에 원하는 CSS Variable**을 지정할 수 있습니다. 이런 로직으로 수행하면 전체적으로 개발 블로그에 다크모드가 적용됨을 볼 수 있습니다. 

그리고 실제로 Provider를 활용해 다크모드를 구현하는 것보단, CSS Variable을 활용하여 구현한 것이 **성능적인** 측면에서도 더 좋은 지표를 보여줬습니다. 
[Dark Mode Theme PR](https://github.com/dobyming/dobyming.github.io/pull/11) 해당 링크로 가시면 제가 왜 CSS Variable을 선택하여 구현에 진행했는지 자세한 지표와 설명을 볼 수 있습니다. 

>+) 추가로 SVG Icon에 다크모드를 어떻게 적용해야 할 지 막막한 분들께 간략한 코드를 보여드리고자 합니다. (사실 내가 바보여서 헷갈려했음..)

우선 SVG 같은 경우에는 색상이 담길 수 있도록 `fill`과 `stroke` 속성을 지정 해야합니다. `fill`은 채워지는 색이고 `stroke`는 테두리색입니다. 그러므로 `.svg` 파일에서 **`path` 태그 내에 fill과 stroke 속성을 current**로 지정합니다.

```svg
// 예시 svg
<svg width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path fill="current" stroke="current" fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z" fill="#000000"/>
</svg>
```

그럼 색상을 지정하고자 하는 SVG Icon에 className을 부여한 후, 자신이 정의한 theme css 파일에 마찬가지로 CSS Variable로 지정하면 끝입니다! 
```css
.githubIcon path {
    fill: var(--color-text);
}
```

## Flicker Issue 에러 해결하기
다크 모드 구현에 대한 틀을 잡았다는 기쁨도 잠시, 페이지를 reload 시  분명 이런 깜빡임 현상을 겪을 것입니다...

![](https://velog.velcdn.com/images/damin1025/post/58ff2ef6-95a9-4fea-b04d-3520fb34a879/image.gif)

못봤다구요? 저도 그냥 잠시 일시적으로 아주 잠깐 이러는거 아닐까..? ㅎㅎ 했는데 아니더라구요 😣 아주 유명한 <span style="color:red">**Flicker Issue**</span> 였습니다. 

>The problem is that the HTML is generated long before it reaches the user's device, so there's no way to know which color theme the user prefers. [참고](https://www.joshwcomeau.com/css/css-variables-for-react-devs/#dark-mode-flash-fix)

해당 Issue가 발생한 원인으로는, Gatsby가 HTML 파일을 빌드하는 `Pre-Render` 특성과 밀접한 관련이 있습니다. 비록 localStorage로 사용자가 설정한 theme을 저장한다고 해도, **reload 시 localStorage를 참조하는건 Pre-Render 시점이 아닌 그 이후 시점에 참조**하기 때문에 이런 현상이 발생하게 됩니다. 

즉 이 문제를 해결하기 위해서는, localStorage를 참조하는 시점을 DOM 트리가 구축되기 이전에 Script 파일을 강제로 Injection하는 부분의 코드 작업이 필요했습니다. 그리고 Gatsby에서는 **`html.js` 파일을 통해 Script 파일을 inject 할 수 있도록 customize**를 허용합니다. 

>💖 [Gatsby html.js customize](https://www.gatsbyjs.com/docs/custom-html/) docs에 `html.js` 파일을 생성하는 부분에 대해 자세한 설명이 있으므로 꼭 docs를 읽으시고 진행하시길!!

그럼 `html.js` 파일이 생성됐고, 저는 아래와 같이 customize를 진행했습니다. 
```js
// html.js
import React from 'react'
import PropTypes from 'prop-types'

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes} className="light">
          <script
            dangerouslySetInnerHTML={{
              __html: `
			// Customize 할 부분
              (function () {
                try {
                  var mode = localStorage.getItem('color-theme');
                  if (!mode) return;
                  document.body.classList.add(mode);
                } catch (e) {}
              })();
            `,
            }}
          />
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
```
DOM 트리가 구축되기 직전에 localStorage를 참조하여 미리 Theme이 setting 될 수 있도록 Script를 주입했습니다. 아래와 같이 해당 Dark mode flicker issue를 해결할 수 있었습니다. 

![](https://velog.velcdn.com/images/damin1025/post/9818ade3-3dbd-4eca-a24f-0eaf7c0f70a1/image.gif)

실제 deploy된 element 코드를 보면 script injection이 잘 됐음을 볼 수 있습니다. 

![](https://velog.velcdn.com/images/damin1025/post/c6c1144e-5caa-490d-b842-7ee175488c7c/image.PNG)

## 🔮 Utterance에 다크모드 적용하기 
제 개발 블로그에는 댓글 기능으로 `Utterance` 오픈 소스를 활용하고 있습니다. 

이때 Utterance는 다른 요소들과는 달리, `Div` element를 직접 생성하고 그리고 `attributes`에 repo 등등 속성을 지정하고 그리고 그 지정한 값에 대해서 DOM 트리에 appendChild 하여 생성되기 때문에 다크모드 구현에 대해 CSS Variable로 어떻게 지정해야 되는지 구상이 잘 떠오르지 않았습니다.

Utterance 요소는 `Div`로 생성되지 않고 `iframe`으로 생성됩니다. 
따라서 `iframe` 태그에 접근하여 theme을 바꾸는 부분을 `window.postMessage()`로 전달하여 접근했어야 했습니다.

> `window.postMessage()` 메소드는 Window 오브젝트 사이에서 안전하게 cross-origin 통신을 할 수 있게 합니다. 예시로, 페이지와 생성된 팝업 간의 통신이나, 페이지와 페이지 안의 iframe 간의 통신에 사용할 수 있습니다. (출처: [MDN](https://developer.mozilla.org/ko/docs/Web/API/Window))

제 프로젝트에서 **다크모드의 전환 유무의 포인트는 body의 className**입니다. light냐 dark냐에 따라서 DOM 트리가 구축될때, body의 className에 따라 유동적으로 변화할 수 있는 idea가 필요했습니다. 구글링 결과, `MutationObserver` 라는 Constructor가 이 개념을 활용할 수 있다고 판단했습니다. [참고](https://hacks.mozilla.org/2012/05/dom-mutationobserver-reacting-to-dom-changes-without-killing-browser-performance/)

```tsx
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
              iframe.contentWindow.postMessage(message, src)
            }
          }
        })
      },
    )
    mutationObserver.observe(document.body, { attributes: true })
  }, [])
```
감지된 body의 className에 따라 삼항연산자로 theme을 할당 후, iframe에 postMessage()로 message를 전달합니다. 그리고 `attributes`의 상태값을 true로 지정하여, body의 class의 변화를 감지할 수 있도록 수행합니다. 
또한 이 이벤트를 mount 시점에 trigger 될 수 있도록 `useEffect()` Hook내에 선언했습니다. 이는 index(홈 화면)에서 다크 모드로 토글 후, 포스트를 클릭하여 utterance theme이 바로 적용될 수 있도록 하기 위함입니다. 

### 결과물
![](https://velog.velcdn.com/images/damin1025/post/c7799ac4-2bbe-466e-95ca-d1c33a3a491e/image.gif)

휴 .. 개인적으로 어려웠던 부분 중 하나였는데 잘 작동해서 어찌나 행복하던지💙


## 마무리 
사실 이 글을 쓰면서 엥 이것밖에 안된다고? 생각이 들 정도로, 다크모드 구현은 꽤나 복잡하고 그리고 꼼꼼함을 기울이는 작업이었습니다. 아무래도 사용자 경험에 큰 영향을 미치는 요소이기 때문에 더욱이 신경을 쓸 수 밖에 없었던 작업이었습니다.  

어떤 기술을 선택해야 할지, 그리고 어떤 태그에 색상 변화가 필요한지, 또한 렌더링 이슈도 handling 했어야 했고 정말.. 오랜 작업 끝에 어느정도 구색을 갖춘것 같습니다.. (4월말부터 시작했으니..) 

저도 처음으로 제대로 각잡고 만든 다크모드라 부족한 점이 있을 수도 있습니다😂 피드백은 언제나 환영입니다! 

### 🙇🏼‍♀️ 참고 
**-다크모드 CSS Variable 및 flicker Issue-**

https://blog.maximeheckel.com/posts/switching-off-the-lights-part-2-fixing-dark-mode-flashing-on-servered-rendered-website/

https://blog.rhostem.com/posts/2020-06-25-dark-mode-for-gatsby-website

https://github.com/gaearon/overreacted.io/blob/master/src/html.js

**-Utterance dark mode-**

https://www.sungikchoi.com/blog/gatsby-dark-mode/

**-MutationObserver-**

https://mong-blog.tistory.com/entry/JS-DOM%EC%9D%84-%EA%B0%90%EC%8B%9C%ED%95%98%EB%8A%94-MutationObserver

https://hacks.mozilla.org/2012/05/dom-mutationobserver-reacting-to-dom-changes-without-killing-browser-performance/

https://developer.chrome.com/blog/detect-dom-changes-with-mutation-observers/

https://stackoverflow.com/questions/31659567/performance-of-mutationobserver-to-detect-nodes-in-entire-dom
