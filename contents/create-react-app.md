---
date: '2023-01-26'
title: 'React - CRA 생성하기'
categories: ['Web', 'React']
summary: 'create-react-app 생성하기
Node.js 기반의 웹서버 위에서 동작하고 있으면서 webpack, Babel 패키지들이 이미 구성된 Boiler Plate를 설치 의미'
thumbnail: './images/react.png'
---
## create-react-app 생성하기
Node.js 기반의 웹서버 위에서 동작하고 있으면서 webpack, Babel 패키지들이 이미 구성된 Boiler Plate를 설치

### 순서
1. create react app을 할 폴더를 새로 만들어준다.
2. vsCode로 이동 후, 터미널 창에 해당 명령어를 입력한다
```bash
npx -v // 버전이 떠야 성공적으로 설치 된것 (ex.8.3.1)
```
3. create-react-app 실행
```bash
npx create-react-app (파일명) //파일명에 대문자 포함할 수 없음!
```
4. 'Happy Hacking!' 문구가 터미널에 뜨면 CRA가 정상적으로 설치됐음을 의미
![](https://velog.velcdn.com/images/damin1025/post/6fd1bc72-a2a7-476c-943f-a5088d188e8a/image.PNG)


### 💦 만약 3번에서 막힌다면?
에러 메시지가 만약 version outdated~ 관련 문장과 함께 npm uninstall을 해보라는지.. 이런 문구가 등장하는 에러라면 아래와 같이 수행해보는걸 추천한다. 
```bash
// npm 삭제
npm uninstall create-react-app
npm uninstall -g create-react-app
```
해당 명령어를 순차적으로 터미널에서 시행 후,
다시 3번 명령어를 수행 시, 중간에 터미널에 이런 메시지가 뜨는데, CRA 패키지 설치 진행에 yes로 진행한다. 
>Need to install the following packages:
  create-react-app
Ok to proceed? (y) y

이후 정상적으로 작동합니다. 
