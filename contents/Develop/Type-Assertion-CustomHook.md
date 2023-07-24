---
date: '2023-07-24'
title: '커스텀 훅 생성에 따른 타입 잡아내기'
categories: ['Web', 'Gatsby', 'TypeScript']
summary: '타입스크립트의 타입 단언을 통해 Custom Hook 제대로 Return 해볼까요?'
thumbnail: '../images/thumbnail-ts.png'
---
개발블로그 운영을 약 3개월 하면서 모바일 반응형 UI/UX를 손 보고 있었습니다. 리팩토링을 수행하면서 그중 타입스크립트의 **타입 단언(Type Assertion)** 개념에 대해서 설명하고자 합니다. 

개념은 알고 있었지만(한 30%..?), 실무나 프로젝트에선 어떻게 활용될까? 생각하면서 서서히 잊혀졌던 개념을 마침내 제 프로젝트에 적용한 글입니다. 사실 에러를 해결한 부분은 간단하지만 동기가 좀 이것저것 많습니다.. 

## Custom Hook 생성할 수 밖에 없던 이유 

우선 모바일 UI를 바꾸고자 했습니다. 기존에는 모바일 화면으로 제 블로그에 접속 시, 오른쪽 NavBar 부분들이 빼곡히 보여.. 미간상 그닥 예뻐 보이지 않아서 리팩토링을 시작했습니다. 

![](https://velog.velcdn.com/images/damin1025/post/6784ce67-9924-47b2-a276-f6b1364eedf5/image.png)

저 3개의 기능들을 Reorder Icon으로 하나로 다 묶어서 관리하려고 했고, 
![](https://velog.velcdn.com/images/damin1025/post/8debab24-12c8-42c6-92e9-fe5ac02c8924/image.gif)

이런식으로 다크모드도 모바일 화면에서 Reorder Icon 내에 배치하여 깔끔한 UI로 리팩토링 해야겠다 생각했습니다. 

> ✨ 그럼 다크모드의 상태값을 어떻게 불러올것인가? 

커스텀 훅을 만들어야겠단 생각의 시초는 이 고민에서부터 시작됐습니다.

즉 파일 구조와 함께 설명을 하자면 
PC 버전에서 다크모드 기능을 수행하는 `HeaderTheme` 이라는 컴포넌트를 불러와서 `Introduction` 컴포넌트에 import 하는 방식으로 수행했습니다. 

문제는 모바일에서도 이 상태를 공유할 수 있어야 하는데, `HeaderTheme` 컴포넌트에서 상태값과 SVG 아이콘을 모두 관리하고 있는 상태라 모바일에서 이 상태값을 사용하기 위해서는 `HeaderTheme`을 import해야 사용할 수 있는 구조였습니다. 

하지만 모바일에서는 다크모드 기능 수행의 UI를 SVG 아이콘이 아닌 텍스트 형태로 구성하고 싶었고, 그리고 다크모드는 PC에서도 모바일에서도 자주 요구되는 기능이기 때문에 커스텀 훅으로 빼놓는것이 알맞은 쓰임이라고 생각해서 다크모드의 상태값을 여러 컴포넌트에서 공유할 수 있도록 커스텀 훅을 제작하기로 했습니다. 


## 타입 단언의 활용 

`useTheme.tsx` 이라는 파일의 이름으로 다크모드의 상태값을 관리하는 커스텀 훅을 구현에 진행했고, 프로젝트를 빌드하려고 했으나 에러가 발생했습니다. 

```tsx
import { useState, useLayoutEffect, useCallback } from 'react'
import { isBrowser } from '../util'

const useTheme = () => {
  const [isDark, setIsDark] = useState<boolean>(false)
  if (!isBrowser()) return null
  const userTheme = window.localStorage.getItem('color-theme')

  // Belong to isDark state, store theme in localStorage
  const saveTheme = (it: boolean) => {
    if (it) {
      window.localStorage.setItem('color-theme', 'dark')
    } else {
      window.localStorage.setItem('color-theme', 'light')
    }
  }

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

  // while clicking button, what to show svg logo
  const handleTheme = useCallback(() => {
    setIsDark(prev => {
      saveTheme(!prev)
      return !prev
    })
  }, [])

  return [theme, handleTheme] // 이 값을 각각의 컴포넌트에 전달 
}

export default useTheme
```

`Type 'Boolean | (() => void) | null' is not assignable to type '() => void'` 
이런 에러를 만나게 됐습니다. theme과 handleTheme을 컴포넌트에 전달할때 제대로 된 타입을 명시하지 않아서 발생하게 된 에러입니다.

더 자세히 파고 들어보겠습니다. 여기 `useTheme` 커스텀 훅의 상태값과 상태함수를 이용할 컴포넌트 `HeaderTheme`이 있습니다. 
```tsx
const HeaderTheme = () => {
  const [isDark, setIsDark] = useTheme()

  return (
    <ClientOnly>
      <ThemeHeader className="themeIcon" onClick={setIsDark}>
        {isDark ? (
          <Sun stroke="#FF5733" fill="#FF5733" />
        ) : (
          <Moon fill="#FFD700" stroke="#FFD700" />
        )}
      </ThemeHeader>
    </ClientOnly>
  )
}

export default HeaderTheme
```
ThemeHeader는 이벤트 함수로 `setIsDark`를 받아올것이고, `isDark` 상태값에 따라 어떤 아이콘을 보여줄 것인지 결정할것입니다.

onClick은 당연히 함수가 들어와야 하는 부분입니다. 하지만 타입스크립트 측면으로 봤을때는 return부에 타입이 제대로 지정이 되지 않았기 때문에 union type으로 onClick에 담기게 됩니다. 'boolean도 받을 수 있고 void 타입도 받을 수 있어!'를 전달하기 때문에 onClick의 입장에선 'boolean 뭔데..?' 로 받아들이기 때문에 에러가 발생합니다. 타입스크립트는 확실한걸 좋아하는 언어라는게 느껴지죠  


[Typing Custom hook](https://fettblog.eu/typescript-react-typeing-custom-hooks/) 해당 docs를 통해 해결할 수 있었는데 

```tsx
return [theme,handleTheme] as const
```

저는 return 부에 `as` 타입 단언 명령을 통해 boolean과 void 타입을 상수로 지정하고 이를 컴포넌트에 넘기는 방식을 택했습니다. 

이때 Gatsby로 개발을 수행하시는 분들은 SSR(window is not defined)까지 신경을 써서 개발에 진행해야 합니다. 왜냐면 이 커스텀 훅의 return 타입으론 `[boolean,()=>void]`만 받을겁니다. 
window 메서드가 활용되는 부분에만 if 조건문으로 감싸서 validate 시, SSR 에러 발생 없이 정상적으로 커스텀 훅이 작동됩니다. 

```tsx
// 저는 따로 ssr validate function인 isBrowser()를 생성했어요
  const saveTheme = (it: boolean) => {
    if (isBrowser()) {
      if (it) {
        window.localStorage.setItem('color-theme', 'dark')
      } else {
        window.localStorage.setItem('color-theme', 'light')
      }
    }
  }

  /* Trigger theme modification by refering localStorage */
  if (isBrowser()) {
    const userTheme = window.localStorage.getItem('color-theme')
    useLayoutEffect(() => {
      if (userTheme === 'dark') {
        document.body.classList.remove('light')
        document.body.classList.add('dark')
        setTheme(true)
      } else {
        document.body.classList.remove('dark')
        document.body.classList.add('light')
        setTheme(false)
      }
    }, [userTheme])
  }
```