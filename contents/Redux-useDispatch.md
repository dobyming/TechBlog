---
date: '2023-03-17'
title: 'Redux Toolkit - useDispatch로 state rasie하기'
categories: ['Redux']
summary: '이전 포스팅에서 Redux toolkit으로 store를 셋팅을 했다면, 실제로 이제 각 컴포넌트에서 수행할 리듀서 함수를 import하여 사용하는 방법에 대해서 알아보도록 하겠습니다.'
thumbnail: './images/redux.png'
---
## state를 useDispatch로 보내기 

이전 포스팅에서 Redux toolkit으로 store를 셋팅을 했다면, 실제로 이제 각 컴포넌트에서 수행할 리듀서 함수를 import하여 사용하는 방법에 대해서 알아보도록 하겠습니다. 


## 순서
**1. 컴포넌트에 알맞는 리듀서 함수를 import하기**

해당 포스팅에서 todoList App의 핵심적인 기능인 **할일을 추가** 하는 기능을 수행하는 컴포넌트에 알맞는 리듀서 함수를 import 해보겠습니다. 

reducer slice 에 `addTodo()` 리듀서 함수를 구현했으므로, 해당 함수를 import 해야 할 것입니다. 

```jsx
import { addTodo } from '../redux/slices/todoSlice';
```

`slices` 에 리듀서 함수들을 export했기 때문에 import가 가능합니다.

#### **2. state를 raise하기 하기** 

부모 컴포넌트 store에서 모든 state를 바꾸기 때문에 state를 바꾼다는 전달하는 매개체가 필요합니다. 이 매개체는 `useDispatch()` 훅으로 전달할 수 있습니다. 

```jsx
import { useDispatch } from 'react-redux';

// 컴포넌트 내에 작성합니다. 
const dispatch = useDispatch(); 
```
`useDispatch()` 를 import합니다. 

![](https://velog.velcdn.com/images/damin1025/post/a1626d25-39a9-448f-a5fb-6a20d073bf99/image.PNG)

그리고 `dispatch` 함수 내부에 위에서 import한 리듀서 함수를 trigger합니다. 이와 같은 process로 리듀서 함수로 state를 raise할 수 있습니다. 