---
date: '2023-05-16'
title: 'Gatsby 블로그 - TOC 기능 구현하기'
categories: ['Web', 'Gatsby']
summary: '포스팅을 읽다보면, 다시 읽고 싶은 부분으로 돌아가고 싶었던 경험이 있을겁니다. 이때 일일이 스크롤해서 내가 원하는 컨텐츠를 읽는것은 사용자 경험이 굉장히 떨어지는 행위입니다.'
thumbnail: '../../images/gatsby.jpg'
---

🤠 글이 꽤 깁니다! 
## 💭 동기 

포스팅을 읽다 보면, 다시 읽고 싶은 부분으로 돌아가고 싶었던 경험이 있을 겁니다. 이때 일일이 스크롤 해서 내가 원하는 콘텐츠를 읽는 것은 사용자 경험이 굉장히 떨어지는 행위입니다.

따라서 많은 개발 블로그에는 **TOC**, 즉 Table Of Contents를 제공합니다. 저 역시 제 블로그에 방문해 주시는 유저분들께 편리함을 제공하고자 TOC 기능을 제작하고 구현에 진행했습니다.

Velog나 다른 개발 블로그들에서 봤을 땐 복잡할 거라고 생각은 안 했는데, 역시 만만한 건 아무것도 없었습니다😅 

## 결과 

먼저 구현 결과부터 보여드리겠습니다. 

스크롤 시, 일정 위치에 heading이 scope 시 오른쪽에 있는 TOC의 각각의 요소들에 active 값이 활성화됨을 볼 수 있습니다.
![](https://velog.velcdn.com/images/damin1025/post/021cd97b-05b8-470c-8d95-1c82fe32e9e7/image.gif)

그리고 각 콘텐츠를 클릭 시, 알맞는 heading으로 direct 하게 이동합니다.
![](https://velog.velcdn.com/images/damin1025/post/ed65ab46-8384-4b63-8db1-f060334ae8a5/image.gif)

그럼 제가 어떤 flow로 TOC 기능을 개발했는지 회고하고자 합니다. 

## header를 어떻게 갖고 올것인가?
우선 TOC 기능을 구현하는 데 있어, 가장 중요한 것은 포스팅에 있는 header를 어떻게 갖고 올 것인가입니다. 당연하게도 `gatsby-node.js`에서 GraphQL로 요청해야 하는데, 이때 어떤 필드를 참조할 것인가를 생각해 봐야 합니다.

1) `tableOfContents` 필드를 활용하기
`tableOfContents` 필드를 GraphQL로 요청하여 `dangerouslySetInnerHTML`에 __html 요소로 Props를 보내서 렌더링 하는 방법이 있습니다.
![](https://velog.velcdn.com/images/damin1025/post/dde204d0-a5ed-41f9-808e-dc0ab46cfef6/image.PNG)


2) `headings` 필드의 depth와 value를 활용하기 
![](https://velog.velcdn.com/images/damin1025/post/eacbf940-6312-4203-8750-93f29f440712/image.PNG)

여기서 depth는 h1, h2,...에서 숫자에 해당하는 부분이고, value는 제목입니다. 저는 직접 depth를 handle 하여 CSS도 Styling 할 것이고, 그리고 배열을 돌면서 value를 TOC 컴포넌트에 렌더링 하고 싶었기 때문에 1번보단 2번 방법을 택했습니다. 

## Value를 어떻게 slug화 할것인가?
보통 `tableOfContents` 필드를 활용해서 구현한다면 slug를 자체적으로 알아서 만들어서 `href`로 접근할 수 있도록 값이 부여되는데, 저같은 경우는 `headings`를 활용하기 때문에 **제목을 어떻게 slug 화할 것인가**를 고민해 봤어야 했습니다.

정말 npm은 없는게 없군요.. [github-slugger](https://www.npmjs.com/package/github-slugger) 라는 패키지를 통해서 slug에 대한 고민을 해결할 수 있었습니다. 해당 패키지를 npm으로 설치하고, `slug(value)` 메서드만 선언하면 알아서 value(제목)를 slug화 해주는 아주 친절한 패키지를 활용하여 해당 고민을 해결할 수 있었습니다.  

## Data 흐름은? 

![](https://velog.velcdn.com/images/damin1025/post/6f0fe709-8358-4507-aba0-ca1bc62cb64a/image.PNG)

데이터 흐름은 위와 같이 `post_template.tsx` (포스팅 템플릿)에서 GraphQL로 요청한 headings(depth,value)를 `PostTOC.tsx` 에 전달하는 구조로 설계하고 구현에 진행했습니다. 

## TOC 컴포넌트 Styling 

자 그럼 GraphQL로 요청한 headings들을 이쁘게 Render하기 위해  Styling 작업을 해야 합니다. 

사실 TOC 기능을 만들면서 꽤 시간을 많이 들였던 부분이 바로 이 Styling 부분이기도 했습니다. CSS적으로 deep하게 MockUp 했고.. 따라서 이건 본인이 스스로 고민하면서 만드는 것을 추천드립니다. 제 코드를 봐도 본인 프로젝트에서는 또 적용이 안될수도 있기 때문입니다 ㅠ  

이건 제가 Scheme한 부분입니다. 
![](https://velog.velcdn.com/images/damin1025/post/dd2ad444-f17c-4215-9d85-52ff52623c6d/image.jpg)
이런식으로 본인이 스스로 한번 구상하시는 것을 추천드립니다 🐣 그리고 포스팅을 읽을때, TOC 컴포넌트가 **일정 위치에 고정**되도록 구현하고 싶었기 때문에 `Sticky` 속성을 부여했습니다. 

또한 다크모드로 전환 시, 콘텐츠들의 글자색들이 바뀌어야 하기 때문에 body의 classList가 'dark'면 바뀔 수 있도록 값을 부여했습니다. 

```css
a {
	color: ${
    isBrowser() && window.document.body.classList.contains('dark')
	};
    text-decoration: none;
}
```

## Scroll시 각 header에 맞게 Active 기능 부여하기

Scroll시 각 Header에 맞게 Active하는 기능을 어떻게 구현해야 하는지를 고민해봤을때, 저는 Scroll값과 offsetTop값을 활용하여 처리하는 것으로 구상했습니다. 

`InterSectionObserver` API를 활용하는 것이 물론 퍼포먼스적으로 좋다는 지표도 있지만, 우선 아직 저의 무지함으로 인해.. 구상부터 잘 이루어지지 않았습니다🙁.. Learning Curve가 있기에 좀 더 익숙해지면 해당 방법으로 마이그레이션을 고려할 수 있을것 같습니다.  

따라서 제가 생각한 방법은 Scroll값에 따라 headings 배열을 돌면서 일정 offsetTop 값에 도달하면 Index 값을 참조하여 active 할 수 있는 방법은 어떨까? 로 구상했고 이 방법으로 구현에 진행할 수 있었습니다. 

```tsx
// PostTOC.tsx
const calcActive = useCallback(() => {
    if (!isBrowser) {
      return 0
    }
    const offsets: number[] = []

    // bring each headings offsetTop
    for (const { slug } of headers) {
      const element = document.getElementById(slug)
      if (!element) {
        return
      }
      offsets.push(element.offsetTop - 10)
    }

    const maxIndex = offsets.length - 1
    const { scrollY } = window
    let index = 0

    // Scroll Active Trigger (looping the offset)
    if (scrollY === 0 || scrollY <= offsets[0]) {
      index = 0
    } else if (
      window.innerHeight + scrollY >= document.body.scrollHeight ||
      scrollY >= offsets[maxIndex]
    ) {
      index = maxIndex
    } else {
      index = findIndex(offsets, offset => offset >= scrollY) - 1
    }
    return index
  }, [headers])
```

`headers` 배열을 참조하여 value를 slug화 한 각각의 태그를 `element`로 불러오고, 각각의 offsetTop 값을 `offsets` 배열에 담습니다. 다시 말하면 `offsets` 배열은 document 기준의 각 header들의 위치를 의미합니다. 

그리고 스크롤 할때마다 Y축의 값을 반환하는 `scrollY` 를 통해서, 3가지 상황으로 조건문을 분기할 수 있습니다. (사실 글보단 코드가 더 이해가 잘 될것 같긴 합니다😅)

1. 만약 `scrollY` 값이 0(맨위) 또는 `offsets[0]`(가장 첫번째 header 문구) 보다 작거나(닿기직전) 해당 위치에 도달 했다면? : **index = 0으로 부여** 

2. `scrollY` 값이 `offset[maxIndex]`보다 크거나 같을때(마지막 header문구 위치와 같거나 지나쳤을때) 또는 window의 innerHeight와 `scrollY` 를 합친 값이 document 기준의 scrollHeight보다 크거나 같을때(마지막 header문구를 지나친건 아니지만, ScrollHeight(스크롤하지 않았을때 전체 높이)를 넘겼을때) : **index = maxIndex로 부여** 

3. 1,2에 해당하지 않을때 

그래서 이 `index`를 활용해서 event를 trigger합니다. 
```tsx
// PostTOC.tsx
const [currentIndex, setCurrentIndex] = useState<number | undefined>(0)

  useEffect(() => {
    setCurrentIndex(calcActive())
    const onScrollForActive = throttle(() => setCurrentIndex(calcActive()), 300)
    window.addEventListener('scroll', onScrollForActive)

    return () => {
      onScrollForActive.cancel()
      window.removeEventListener('scroll', onScrollForActive)
    }
  }, [calcActive])
```
`useEffect()` Hook을 활용하여 `calcActive`에 따라 event가 Trigger될 수 있도록 dependency Array에 할당합니다. 

이때 Scroll시, 매번 offsetTop 값과 ScrollY값을 연산해야 하기 때문에 싱글 스레드에 조금이라도 최적화 하는 작업이 필요합니다. 왜냐하면 Scroll시, 매번 연산하기 때문에 console을 찍어보면 값들이 무수히 찍히기 때문입니다.

따라서 저는 [lodash-es](https://www.npmjs.com/package/@types/lodash-es)에서 제공하는 `throttle()` 메소드를 활용하여 Scroll Event를 최적화 했습니다. 이는 Scroll시 매번 요청되는 call을 `SetTimeOut()` 연산과 같은 구조로, 300ms를 기다렸다가 `onScrollForActive`를 요청합니다. 

```tsx
// PostTOC.tsx
<ol>
{headers.map(({ value, depth }, idx) => (
	<li
    key={idx}
    style={{ paddingLeft: `${depth * 11}px` }}
    className={currentIndex === idx ? 'active' : ''}
    >
		// ...
	</li>
    ))}
</ol>
```
`calcActive()` 함수의 리턴 index가 `useState` Hook의 현재 state로 담기는 `currentIndex`에 담기면서, 실제 ol 태그내에서 headers 배열(`PostTOC` 컴포넌트 상단에서 `useMemo()`를 통해 연산한 값을 재사용 했습니다.) 을 도는 idx 값과 비교하게 되면서 `currentIndex`와 일치하는 idx에 대해서만 active 활성화를 부여하게 되면, Scroll시 bold체로 활성화 되는 것을 볼 수 있습니다. 

(*`li`태그 에서 style은 indentation을 주기 위해서 depth를 활용한 것입니다.)

## header에 맞는 href로 이동하기 
그리고 `a` 태그에 href 값으로 `slug(value)`를 할당하게 되면 헤더에 맞는 위치로 이동하게 됩니다. 

```tsx
// PostTOC.tsx
//...
<a data-idx={idx} href={`#${slug(value)}`}>
	{value}
</a>
//...
```

### 🪓 Issue Handle  
![2023-05-16 11;09;11](https://github.com/dobyming/dobyming.github.io/assets/90133704/d9c2b8db-6934-4e50-9e93-bc0d5eb196f3)

Testing을 하던 중, console에 이런 error log가 찍혔습니다. 공통점을 보니, 숫자로 시작하는 헤더를 `querySelector`가 parsing을 수행할 수 없다는 류의 에러였습니다. (TOC 컨테이너에 해당하는 헤더값을 클릭 시, 해당하는 헤더로 이동하지도 않았습니다.) 

```tsx
const heading = document.querySelector<HTMLHeadingElement>(href)
if (!heading) {
	return
}

window.scrollTo({
	top: heading.offsetTop,
  behavior: 'smooth',
 })
```

문제가 발생한 코드였고 [StackOverflow](https://stackoverflow.com/questions/37270787/uncaught-syntaxerror-failed-to-execute-queryselector-on-document)에서 보니, `querySelctor`는 숫자로 시작하는 heading은 인식하지 못한다는 것이었습니다. 따라서 위의 코드는 과감히 제거하고, `a` 태그의 `href`에 slug화 한 value를 할당하여 숫자로 시작하는 slug도 인식할 수 있도록 트러블 슈팅을 진행했습니다. 

## 🔮 후기 
일주일 가까이? 시간을 쏟고 나름 고생하면서 만들었네요.. 기능 개발에서 많은 고민과 시간을 투자해서 그런지 더 소중하게 다가옵니다. 의외로 CSS 스타일링도 내가 아는게 다 아니었구나를 또 깨달으며 역시 계속 배워야 한다는 것을 깨달았던 feature 개발이었습니다. 

성능상 최적화해야 할 부분이 남은 숙제겠네요! 그래도 스스로 TOC 기능을 만든건 꽤나 뿌듯합니다.😊