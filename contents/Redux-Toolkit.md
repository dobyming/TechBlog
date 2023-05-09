---
date: '2023-03-16'
title: 'Redux Toolkit으로 React Native Todo앱 구조 잡아보기'
categories: ['React Native','Redux']
summary: '리액트 프로젝트를 진행하면서 가장 챌린지 했던 부분은 state관리였습니다. 각각의 컴포넌트는 state를 관리하고 있지만, 컴포넌트 파일이 방대해지고 props로 전달해야 되는 부분이 많아지게 되면 state 관리가 복잡해져서 굉장히 설계에 어려움을 겪었던 경험이 있었습니다..😥'
thumbnail: './images/redux.png'
---
## 🔎 동기
리액트 프로젝트를 진행하면서 가장 챌린지 했던 부분은 **state관리**였습니다. 

각각의 컴포넌트는 state를 관리하고 있지만, 컴포넌트 파일이 방대해지고 props로 전달해야 되는 부분이 많아지게 되면 state 관리가 복잡해져서 굉장히 설계에 어려움을 겪었던 경험이 있었습니다.. 😥 

하지만 Redux는 이러한 부분을 완화시켜줄 수 있는 tool로, store로 모든 state를 관리할 수 있습니다. 따라서 React Native로 진행하고 있는 Todo App의 data state의 관리를 `Redux Toolkit` 을 통해 로직을 구현하고자 합니다.  

## 🛒 순서
전체적인 구조는 어떠한 이벤트가 발생 시, 해당 Action을 Dispatcher에 전달하여 Reducer 함수들을 통해 해당하는 Action의 state를 raise하여 반환합니다. 그리고 store 내부 state가 update 되면 그 state를 컴포넌트에 전달하여 리렌더링이 진행됩니다. 

![](https://velog.velcdn.com/images/damin1025/post/441bb55f-8efc-4bb3-a07a-6040a8a059a7/image.png)


다음 CLI 명령어로 `Redux Toolkit`을 생성할 수 있습니다.
```bash
npm install @reduxjs/toolkit react-redux
```

### 1. configureStore를 사용하여 Redux Store 생성
```jsx
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './slices/todoSlice';

export const store = configureStore({
    reducer:{
        todo: todoReducer //생성한 reducer를 Store에 등록
    }
});
```

### 2. React 컴포넌트에 Redux Store 제공 순서
제 프로젝트의 `App` 컴포넌트 아래 컴포넌트인 `MainScreen` 컴포넌트에 data 및 state를 공급하기 위해 다음과 같이 `Provider` 컴포넌트에 `store`를 props로 전달해야합니다. 

```jsx
import { Provider } from 'react-redux';
import {store} from './redux/store';
import MainScreen from './screens/MainScreen';

export default function App() {
  return (
    <Provider store={store}>
      <MainScreen/>
    </Provider>
  );
}
```

⚠ 이때 생성한 store는 **내장 모듈이 아니기 때문에** `{ }` 로 감싸서 모듈을 import 하는것에 주의합니다.
  

### 3. `createSlice`로 Redux slice reducer 생성
`createSlice`를 활용하여 상태관리 함수 로직을 구현합니다. 
제 프로젝트에는 add,update,delete에 관한 상태관리함수가 필요하기 때문에 `reducer`로 정의합니다. 

```jsx
const todoSlice = createSlice({
  name: "todo", 
  initialState: {
        currentId: 4,
        todos: [],
    }, //초기 state 정의
  reducers: {
    //state functions(add,delete,update 로직 구현 부)
  },
});
export default todoSlice.reducer; 
```

### 4. `useSelector`, `useDispatch`로 데이터 읽고 state raise하기

`useSelector`로 `store`에서 데이터를 읽어줍니다.
`useDispatch`로 dispatch함수를 가져오고 필요에 따라 action을 dispatch합니다. (action을 dispatch한다 = event를 trigger한다.)

해당 부분은 다음 포스팅에서 더 자세히 다루겠습니다.

## 🌌 리듀서 함수 구체화하기
`createSlice`로 Redux slice Reducer를 생성했다면 각각의 상태관리함수 (add,update,delete)에 대해서 구현을 진행하겠습니다. 

### 1. `addTodo()`
![](https://velog.velcdn.com/images/damin1025/post/cfab0e3f-ee60-49c1-983f-a88b9cbec230/image.PNG)

현재 state의 할일 배열값을 받을 `todos`에 값을 push해주는 로직으로 구현할 수 있습니다. 

### 2. `updateTodo()`
![](https://velog.velcdn.com/images/damin1025/post/8aa630c4-94c4-4ca9-a5e0-4fb4b7f5cc05/image.PNG)

update(할일 종료)했다는 index를 따기 위해서 `item` 변수에 `findIndex()`로 상태가 변화한 index를 담습니다. 그리고 삼항연산자를 통해 todo -> done 으로 state를 바꿔주고, `todos` 배열에서 제거한 값을 배열에 push합니다. 


### 3. `deleteTodo()` 
![](https://velog.velcdn.com/images/damin1025/post/0bc7ec31-156b-4bff-9360-865913c271e7/image.PNG)

`x` 버튼을 삭제하는 로직입니다. 전체적인 흐름은 `updateTodo()` 와 동일합니다.


### reducer 함수 export 하기 
마지막으로 해당 reducer함수들을 외부 컴포넌트에서도 사용할 수 있도록 export하는 작업으로 마무리합니다.
```jsx
export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;
```
