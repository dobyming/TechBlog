---
date: '2023-05-01'
title: 'CORS에 대해서 알아보자'
categories: ['CORS','Web']
summary: 'CORS의 개념에 대해서 익히고 왜 이 개념이 모던 웹에서 중요한지 다뤄봅니다.'
thumbnail: './images/cors.png'
---
### Origin 이란?

아래와 같이 사이트들이 있다고 가정해보겠습니다. 

```bash
http://localhost:8000
https://api.alazierplace.com:3000/api/
https://alazierplace.com/2019/05/data-driven-testing-how-we-went-from-150-test-cases-to-1/
```

scheme(http,https) + IP 주소 또는 도메인 + :포트넘버 ⇒ 해당 구성을 Origin 이라고 칭합니다. 

JS의 Script 파일이 HTTP에 API 요청을 할때, 서버에 요청을 보내기 전에 Origin 정보를 헤더에 저장합니다. 

### CORS 이슈가 중요한 이유

Origin이 다른 헤더값을 계속해서 요청하게 되면, 악의적인 스크립트로 인해 보안성이 취약해지고, 유저와 사이트에 해가 될 수 있습니다.
특히 `same-orign policy` 는 클라이언트 쪽에서 더 중요하게 다뤄지는 부분이기 때문에 더욱이 CORS를 따져줘야 합니다. (*`same-origin-policy` : 없는 도메인 값 또는 포트를 요청하는 행위) 

### CORS란?

Cross-Origin Resource Sharing의 약자로, W3C가 제안한 웹 표준으로 클라이언트가 실행되는 브라우저에서 origin값을 접근할 수 있도록 가능케 하는 개념입니다.

![Request/Response cycle for a CORS Request](https://i0.wp.com/alazierplace.com/wp-content/uploads/2019/06/CORS-flow.png?resize=833%2C406&ssl=1)

Request/Response cycle for a CORS Request

**<실행 순서>**

- JS 클라이언트가 AJAX call을 시작함
- 브라우저가 (실제 클라이언트가 서버에 요청을 보내기전에) request를 intercept하여 `pre-flight` 요청을 보냄
- 서버는 `pre-flight` 에 대한 response에 CORS configuration을 담은 HTTP 헤더를 브라우저에 보냄
- CORS가 verify되면 실제 클라이언트가 request한 값을 서버에 보내게 됌
- 서버는 요청한 response값을 JS Client에 보내줌

******************pre-flight request?****************** 

- HTML 옵션을 request 하는 것으로, 이에 대한 response로는 CORS configuration(구성 파일)을 명시하는 HTTP 헤더
- 한번만 보내지고, 브라우저에 의한 캐싱이 처리된다.
- 매번 CORS request가 보내지는건 아니고 다음과 같은 조건에 부합할때 보내진다.
    - `HEAD`, `POST`, `GET` 이외의 HTTP 메소드를 request 할때
    - Content-type request에 application/x-www-form-urlencoded, multipart/form-data 및 text/plain 이외의 값이 있을때
    - 요청이 Accept, Accept-Language 및 Content-Language 이외의 헤더를 설정할때

### 그래서 왜 이렇게까지 CORS를 따져야 할까?

JavaScript는 돌아갈 수 있는 실행환경이 다양하기 때문입니다. 

특히 JavaScript 같은 경우는, 네트워크를 통해 브라우저의 형태로 사용자에게 제공됩니다. 그리고 웹뿐만 아니라 모바일 웹에서도 접근이 가능하기 때문에 실행환경 역시 다양해집니다. 

브라우저는 로그인 정보, 쿠키, 세션등 민감한 정보들을 담고 있고 이에 대한 철저한 규제가 필요할 것입니다. 

비유해서 말하면.. 이상한 사람이 맛있는거 사준다고 해도 쫓아가면 안된다 를 표현한 개념이 CORS라고 볼 수 있습니다. JavaScript 클라이언트에서 이에 대한 빡센 규정이 필요하죠.