# 📝 Tech Blog 
Gatsby 프레임워크로 구현된 저만의 개발 블로그이며, 정적 웹사이트입니다. 반응형 웹사이트도 고려하여 제작 및 구현했기에 모바일 웹 환경에서도 유연하게 볼 수 있습니다 :)  

## 🍀 Tech Stack 
- FE : `GatsbyJS`, `emotionJS` , `npm`
    
    개인 개발 블로그라는 목적에 맞게 server와의 렌더링이 요구되지 않기 때문에 대표적인 정적 웹 프레임워크인 `GatsbyJS` 프레임워크를 선택하여 구현에 활용할 것입니다. 대표적인 JAM Stack 기반 framework로, Pre-render를 통해 렌더링 속도가 빠르며 사용자는 좋은 UX를 제공받을 수 있을것입니다. 
    
    또한 CSS같은 경우는 CSS-in-JS 라이브러리인 `emotionJS`를 선택했습니다. `styled-componenent`와 syntax상 큰 차이점은 없지만 build 시 번들 용량이 `emotionJS`가 압도적으로 작기 때문에 해당 라이브러리를 선택했습니다.
    
- Cloud: `Github Pages`
    
    배포는 Github에서 제공해주는 `Github Pages` 를 활용하여 쉽고 빠르게 웹 호스팅 및 배포를 진행합니다. Github 레포지토리만 있으면 됩니다. 
    
- Open Source : `Utterances`
    
    개발 포스팅에 댓글을 달 수 있는 기능을 Github에서 제공하는 오픈 소스인 `Utterances` 를 활용하여 Github 레포지토리에 link하여 Issue(댓글)들을 빠르게 열람하고 의견 공유를 할 수 있습니다.
    
## 🚀 Quick start
`npm`을 활용하여 `Gatsby` 프로젝트를 시작하기 위해서는 Node.js의 version은 **`18.0.0`** 이상 요구됩니다.

1.  **Create a Gatsby site.**

    Use the Gatsby CLI ([install instructions](https://www.gatsbyjs.com/docs/tutorial/part-0/#gatsby-cli)) to create a new site, specifying the default starter.

    ```shell
    npx gatsby-cli new "[Project Name]"
    ```

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd my-default-starter/
    gatsby develop
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    Note: You'll also see a second link: `http://localhost:8000/___graphql`. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby Tutorial](https://www.gatsbyjs.com/docs/tutorial/part-4/#use-graphiql-to-explore-the-data-layer-and-write-graphql-queries).

## 🧐 프로젝트 주요 구조

해당 프로젝트의 주요 dir 구조입니다. 

```
techblog
├─ contents
├─ src
│  ├─ components
│  ├─ hooks
│  ├─ images
│  ├─ pages
│  └─ templates
```

1.  **`contents/`**: 블로그 포스트 시, 관련 파일들을 저장

1.  **`components`**: 재사용성이 높은 컴포넌트 관리

1.  **`hooks`**: Custom Hooks 관리

1.  **`pages`**: 블로그내 각 페이지를 관리 (`페이지.tsx`에서 **페이지**이름으로 라우팅 가능)

1.  **`templates`**: 페이지 역할 및 같은 형식의 여러 콘텐츠를 보여주는 컴포넌트를 저장 및 관리 

## 🔧 SVN
이 프로젝트의 형상관리(SVN)는 GitHub를 통해 이루어집니다. 주요 브랜치(branch)는 다음과 같습니다. 

- `develop` : 개발용 브랜치입니다. local testing은 해당 브랜치에서 이루어집니다. 
- `main`: `develop` 브랜치에서 local testing이 검증된 코드들 기반으로 build 후 deploy 되어 실제 환경에 서비스되고 있는 브랜치입니다.