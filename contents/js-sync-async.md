---
date: '2023-01-20'
title: 'JavaScript - 동기와 비동기 처리'
categories: ['JavaScript']
summary: '이번 포스팅에선 자바스크립트의 2가지 동작 방식인 동기와 비동기처리에 대해서 다뤄보겠습니다.'
thumbnail: './images/jsicon.png'
---

## 동기와 비동기 (Synchronus , Asynchronus)
이번 포스팅에선 자바스크립트의 2가지 동작 방식인 동기와 비동기처리에 대해서 다뤄
보겠습니다.

함수 3개를 호출했을때를 예로 들어보겠습니다.

```jsx
function taskA() {
  console.log('Task A');
}
function taskB() {
  console.log('Task B');
}
function taskC() {
  console.log('Task C');
}

//함수 호출 
taskA();
taskB();
taskC();
```

함수 3개를 호출 시, 자바스크립트는 다음과 같이 작업을 할당합니다. 순서대로 함수를 호출하며 한개의 task가 끝날때까지 다음 task는 끼어들 수 없는 블로킹 방식으로 동기가 이루어집니다. 

![](https://velog.velcdn.com/images/damin1025/post/a5298539-fe91-4a59-bd30-0f69822ad327/image.PNG)

## 동기 처리의 문제점 
![](https://velog.velcdn.com/images/damin1025/post/fb33ffa5-fbc4-42e0-8d4a-966a84597e2c/image.PNG)

🤔 작업 시간이 긴 task를 처리할때 문제가 발생하게 된다.프론트는 속도가 생명이지 않나…? 

**멀티 스레드**로 방식으로 처리하면 되지 않나요?
⇒ OS 상 생각은 ok. 하지만 자바스크립트는 **Single Thread**로 동작합니다. 

그래서 동기처리 대신 **비동기 처리** 개념이 필요해지게 됩니다.

## 비동기 처리
![](https://velog.velcdn.com/images/damin1025/post/57548644-48a6-4b56-8277-cb53ddac1f69/image.PNG)

🤔 논 블로킹 방식이면 작업이 어떻게 끝나고 처리되는지.. 중구난방 아닐까요?
→ **콜백 함수**를 활용합니다. 

대표적인 콜백 함수는 `setTimeout()` 으로, 코드를 바로 실행하지 않고 몇초 기다렸다가 다음 함수를 실행하는 방식으로 순서가 중구난방일지 염려되는 부분을 해결할 수 있습니다. 

```jsx
function taskA() {
	setTimeout(() => {
		console.log('A Task End');
	}, 2000); // 다음 함수 실행까지 2초 기다려줌 
}

taskA();
console.log('코드 끝');
```
---

실행 결과

![](https://velog.velcdn.com/images/damin1025/post/bd013054-c63e-45d6-aea2-2a94361d7326/image.gif)

## JS Engine
JS Engine 기본 구성
<br/>
-Heap : 메모리 할당<br/>
-**Call Stack** : 코드 실행

### Call Stack 동기 작동방식

항상 Main context가 먼저 stack에 push 됌. 그리고 선언한 함수 순서대로 Call Stack에 push되고, 작업이 끝나면 pop이 이루어짐.

### 비동기 작동 방식
여기서 `setTimeout()` 은 대표적인 **비동기 함수**인데, 만약 동기처리 방식 그대로 적용한다면 call stack에 3초 머물렀다가 콜백함수 `cb`를 호출하게 되는데 이와 같이 수행한다면 동기 처리 방식과 비동기 처리 방식의 차이점이 사라지게 됩니다.

![](https://velog.velcdn.com/images/damin1025/post/359c37e2-d6df-4195-af7d-3cf8d7011385/image.PNG)

따라서 해당 비동기 함수는 비동기 처리를 위해, Web APIs에 3초동안 기다리면서 `asyncAdd()` 함수가 실행되면서 pop되면서 종료되고

![](https://velog.velcdn.com/images/damin1025/post/18c5b0e0-04d0-4a46-8beb-b5106cdac240/image.PNG)


3초 기다린 `setTimeout()`은 제거가 되면서 콜백함수 `cb`를 콜백 큐에 push합니다.

![](https://velog.velcdn.com/images/damin1025/post/81ed6192-8b10-4789-ace7-ec3b9fc7b30e/image.PNG)

Event Loop을 통해 cb함수는 call stack로 push됩니다. 

이때 Event Loop는 Main Context를 제외한 다른 실행할 함수들이 Call stack에 존재하는지 계속해서 check합니다. 만약 수행할 함수가 콜백함수밖에 없다면, 그제서야 콜백함수를 Call Stack에 push하는 방식인거죠. 

그렇게 콜백함수를 수행하고 pop 후, Main Context도 제거되면서 비동기 작업이 완료가 됩니다. 

### 비동기 처리 방식의 문제점

⇒ 만약 불러야 할 콜백함수를 메소드 내에서 계속 선언하게 된다면 **콜백지옥**을 야기합니다. 이는 이제 ES6+ 문법 중 `Promise` 객체 와 `async()-await()` 로 해결할 수 있습니다.