---
date: '2023-01-19'
title: 'JavaScript - 함수'
categories: ['JavaScript']
summary: '자바스크립트의 함수와 관련하여 중요 개념을 다뤄봅니다.'
thumbnail: './jsicon.png'
---

*리마인드 차원에서 작성(면접 대비) 

### 함수

-**함수 선언식 vs 함수 표현식 차이**

```jsx
console.log(helloDelcare()); // '안녕하세요 함수 선언식입니다'
console.log(hello); // error : 'hello is not a function'

function helloDelcare() {
	return '안녕하세요 함수 선언식입니다'
}

let hello = function helloRepresent() {
	return '안녕하세요 함수 표현식 입니다.'
}
```

1) 함수 선언식: **Hoisting**(쉽게 말하면 밑에서 선언한 함수를 코드의 상단에서 호출해도 출력이 이루어짐)이 일어나는 방식 

2) 함수 표현식: **Hoisting**의 대상이 되지 않음 ⇒ 즉 `hello` 변수를 표현하면서 부터 함수가 생성되기 때문에, 상단에서 hello를 log로 찍으려고 하면 **에러**가 발생.
→ 따라서 함수를 먼저 선언 후, 표현식에 선언된 변수를 호출해야 정상적으로 값을 찍을 수 있다. 

**-arrow function (함수 표현식을 간단히 표현하는 방법)**

```jsx
let hello = () => {
	return '안녕하세요'
}
// '() =>' 표현과 동일한 예약어가 'function 함수명()' 이라고 생각하면 됌 
```

화살표 함수는 쉽게 생각하면 함수 표현식에서 keyword `function` **만 삭제**한 문법이라고 생각하면 된다. (역시 Hoisting의 대상이 아님)

>-콜백함수
```jsx
function checkMood(mood) {
	if (mood === "good") {
		// ...
		sing()
	} else {
		// ...
		cry()
	}
}

function cry() {
	console.log('Action : CRY');
}

function sing() {
	console.log('Action : SING');
}

function dance() {
	console.log('Action: DANCE');
}

checkMood("good"); 
```

기존 동작 방식

1. `checkMood` 함수가 good이라는 매개변수를 전달 받는다.
2. good이면 `sing` 함수를 호출해서 console 로그가 찍힌다.

>**콜백함수의 등장 배경** 
만약 어떤 함수에서 특정 기능을 사용하고 싶은데, 일일이 body안에 메소드를 선언해줘야 한다면.. 코드 유지보수성이 매우 떨어진다.  
따라서 만약 함수(`checkMood`) 파라미터에 함수(`sing` , `cry` , `dance`)를 넘겨주면 매개변수로는 **함수의 표현식** 처럼 작동하게 됩니다. 

```jsx
function checkMood(mood,goodCallback,badCallback) {
	if (mood === "good") {
		// ...
		goodCallback()
	} else {
		// ...
		badCallback()
	}
}

function cry() {
	console.log('Action : CRY');
}

function sing() {
	console.log('Action : SING');
}

function dance() {
	console.log('Action: DANCE');
}

checkMood("good",sing,cry); 
```

다음과 같이 구성한 코드를 콜백함수라고 합니다. 콜백함수는 비동기함수에서 중요한 개념으로 쓰입니다. 