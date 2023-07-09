# 📝 Tech Blog 
Gatsby 프레임워크로 구현된 저만의 개발 블로그입니다. 반응형 웹사이트로 모바일 웹 환경에서도 유연하게 볼 수 있습니다! 

## 🍀 Tech Stack 
- FE : `GatsbyJS`, `emotionJS` , `NPM`
    
    개인 개발 블로그라는 목적에 맞게 대표적인 정적 웹 프레임워크(SSG)인 `GatsbyJS` 프레임워크로 구현에 활용할 것입니다. 대표적인 JAM Stack 기반 framework로, Pre-render되는 속성으로 인해 렌더링 속도가 빠르며 사용자는 좋은 UX를 제공받을 수 있을것입니다. 
    
    또한 CSS같은 경우는 CSS-in-JS 라이브러리인 `emotionJS`를 선택했습니다. `styled-componenent`와 syntax상 큰 차이점은 없지만 build 시 번들 용량이 `emotionJS`가 압도적으로 작기 때문에 해당 라이브러리를 선택했습니다.
    
- Cloud: `Github Pages`
    
    배포는 Github에서 제공해주는 `Github Pages` 를 활용하여 쉽고 빠르게 웹 호스팅 및 배포를 진행합니다. Github 레포지토리만 있으면 됩니다. 
    
- Open Source : `Utterances`
    
    개발 포스팅에 댓글을 달 수 있는 기능을 Github에서 제공하는 오픈 소스인 `Utterances` 를 활용하여 Github 레포지토리에 link하여 Issue(댓글)들을 빠르게 열람하고 의견 공유를 할 수 있습니다.
    
## 🔧 SVN
이 프로젝트의 형상관리(SVN)는 GitHub를 통해 이루어집니다. 주요 브랜치(branch)는 다음과 같습니다. 

- `develop` : 개발용 브랜치입니다. local testing은 해당 브랜치에서 이루어집니다. 
- `main`: `develop` 브랜치에서 local testing이 검증된 코드들 기반으로 build 후 deploy 되어 실제 환경에 서비스되고 있는 브랜치입니다.