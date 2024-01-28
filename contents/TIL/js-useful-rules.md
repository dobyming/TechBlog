---
date: '2024-01-28'
title: 'JavaScript 자료구조 Map에서의 정렬'
categories: ['JavaScript']
summary: '자바스크립트의 자료구조 Map을 활용한 정렬 (+백준에서 JS 활용 시, 한줄 출력까지 다뤄봅니다.)'
thumbnail: '../images/jsicon.png'
---
백준 **[2910번 빈도정렬](https://www.acmicpc.net/problem/2910)** 이라는 문제를 풀이하면서, 특히 자바스크립트로 문제를 풀이하는데 있어 취약한 부분이 있는 것 같고 자주 활용될 문법이라고 생각하여 이 기회에 정리하고자 한다. 

```js
const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [n,c] = input.shift().split(' ').map(Number);
let arr = input[0].split(' ').map(Number)

let result = [];
const freqMap = new Map();

for (let i=0; i<n; i++) {
  freqMap.set(arr[i],(freqMap.get(arr[i])||0)+1);
}

const sortedMap = [...freqMap].sort((a,b) => b[1]-a[1]);
sortedMap.map((info) => {
  let [k,v] = [info[0], info[1]];
  let tmp = 0;
  while (tmp < v) {
    result.push(k);
    tmp += 1;
  }
})

// 백준에서 한줄 출력 
for (let j=0; j<result.length; j++) {
  process.stdout.write(result[j] + ' ')
}
```

문제에서 핵심 부분은 **자주 등장한 key의 value를 기준으로 정렬**했어야 했다. 
Python에서는 `items()` 메서드로 key-value쌍의 list를 만들어주고, lambda로 정렬할 수 있다는 idea가 머리에 박혀있었지만 JS에서 활용하려니 갑자기 떠오르지가 않았다..ㅠ

## Map에서 정렬

### 선행조건
`sort()` 메서드는 `Array` 객체에서 정의되어 있기 때문에 Map 자료구조에서 어떤 기준을 잡고 sort를 하기 전에, 배열로 전환할 필요가 있다. 

이는 **Spread** 연산자를 이용하여 쉽게 변환할 수 있다. 따라서 위의 코드를 예시로 삼아 해당 출력값을 보도록 하자. 
```js
const sortedMap = [...freqMap];
console.log(sortedMap);
// 출력: sortedMap = [ [ 11, 3 ], [ 33, 2 ], [ 77, 1 ], [ 54, 1 ], [ 25, 2 ] ]
```

### key 또는 value를 기준으로 정렬
```js
// value를 기준으로 내림차순 정렬
sortedMap.sort((a,b) => b[1] - a[1]);

// key를 기준으로 내림차순 정렬
sortedMap.sort((a,b) => b[0] - a[0]);

// value를 기준으로 오름차순 정렬
sortedMap.sort((a,b) => a[1] - b[1]);

// key를 기준으로 오름차순 정렬
sortedMap.sort((a,b) => a[0] - b[0]);
```

### +) 백준에서 한줄 출력 하는 방법
간혹가다 한줄 출력을 해야하는 경우가 있는데, 
```js
process.stdout.write(대상 + '(concat할 대상)');
```
위 코드를 활용하면 된다. 특히 대상을 출력할 때, 숫자만 출력할 순 없었고 concat할 문자를 추가하지 않으면 에러가 발생했었다. 