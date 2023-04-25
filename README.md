# 📝 Tech Blog 
Gatsby Framework를 활용한 저만의 정적 기술 블로그 웹사이트입니다. 

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

## 🧐 What's inside?

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

## 🥽 Logs 
해당 프로젝트는 [log](https://reinvented-specialist-02e.notion.site/TechBlog-32536717e5bb46c0921c721423c16644)를 남기고 있습니다. 링크에서는 왜 이 기술 스택을 선택했고 그리고 코드에 대한 상세 리뷰를 볼 수 있습니다!🤗