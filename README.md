# 미니 블로그에서 확장된 블로그를 만들어보기 입니다. (클론 코딩)

## 매일매일 설명이 업로드 되며, 변경사항 역시 올립니다

### 1/26

* api 연동 진행 작업 중입니다.
* 컴포넌트 틀 작업 중이며, 내일 중으로 완료할 예정입니다.

### 1/27

#### 사용 스택 
* 백엔드 : GraphQL, MongoDB
* 프론트엔드 : React
를 사용하여 실제 로그인처럼 동작 가능하도록 컴포넌트들의 전체 틀을 작업 중인 상태입니다.
* 약 30개의 컴포넌트들로 구성하였으며, 링크 연동 및 컴포넌트 각각의 작동은 문제 없습니다.

#### Code Refactoring : version error + code debuging

<img width="783" alt="image" src="https://github.com/sangjun1126/React_Blog/assets/142310079/1db23d91-3ced-4fdf-b085-84b6a17121cc">

**중요하다 생각하는 부분만 올림**
* React-Router-Dom에서의 Switch와 withRoute 모듈은 V5 이후로 useNavigate()와 Routes로 각각 대체되었으며, 이를 이용해 링크 연결 로직을 리팩토링 완료했습니다.

```javascript
import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import KakaoLogin from "react-kakao-login";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    id: "",
    name: "",
    provider: "",
  });

  // 구글 로그인 로직
  const responseGoogle = (res) => {
    setLoginInfo({
      id: res.googleId,
      name: res.profileObj.name,
      provider: "google",
    });
    doSignUp(); // Fixed: Call doSignUp without 'this'
  };

  // 카카오 로그인
  const responseKakao = (res) => {
    setLoginInfo({
      id: res.profile.id, // Fixed: Change 'res.profile.jd' to 'res.profile.id'
      name: res.profile.properties.nickname,
      provider: "kakao",
    });
    doSignUp();
    // 로그인 후 페이지 이동
    navigate("/");
  };

  // 로그인 실패 시
  const responseFail = (err) => {
    console.error(err);
  };

  const doSignUp = () => {
    const { id, name, provider } = loginInfo; // Fixed: Use loginInfo from state
    window.sessionStorage.setItem("id", id);
    window.sessionStorage.setItem("name", name);
    window.sessionStorage.setItem("provider", provider);
    // Assuming onLogin and history.push are passed as props
    // this.props.onLogin();
    // this.props.history.push("/");
    navigate("/"); // Updated: Using navigate hook instead of this.props.history
  };

  return (
    <Container>
      <GoogleLogin
        clientId={process.env.REACT_APP_Google}
        buttonText="Google"
        onSuccess={responseGoogle}
        onFailure={responseFail}
      />
      <KakaoButton
        jsKey={process.env.REACT_APP_Kakao}
        buttonText="kakao"
        onSuccess={responseKakao}
        onFailure={responseFail}
        getProfile="true"
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

const KakaoButton = styled.div`
  padding: 0;
  width: 190px;
  height: 44px;
  line-height: 44px;
  color: #783c00;
  background-color: #ffeb00;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

export default Login;

```


* 백엔드의 두 요소는 (GraphQL, MongoDB) 처음 사용해봤으며, 버전 오류 및 39개의 오류가 남아있어 error 확인 결과 버전 및 모듈 설치의 문제가 있습니다.
* 또한 이는 npm에서 종속성 관련 오류라 생각해 GPT에게 문답한 결과 강제적으로 force하여 해결하라는 힌트를 받았습니다.

  <img width="554" alt="image" src="https://github.com/sangjun1126/React_Blog/assets/142310079/f63fbc3f-f756-4e61-a885-48260d3611ef">

* HOC 고차 컴포넌트의 쓰임을 리팩토링 완료 했습니다.
```javascript
// hoc 고차 컴포넌트 로직

import React, { Component } from "react";
import Store from "../Store/store";
import LoginContainer from "./LoginContainer";

const withLogin = (WrappedComponent) =>
  class IsLogin extends Component {
    render() {
      return (
        <Store.Consumer>
          {(store) => {
            if (store.logged === false) return <LoginContainer />;
            else return <WrappedComponent />;
          }}
        </Store.Consumer>
      );
    }
  };

export default withLogin;
```

#### 해결해야할 부분 

* force로 강제적으로 종속성을 해결한 뒤 npm or yarn으로 모든 모듈을 재 설치한 후 버전에러를 해결하거나
* mongoDB의 mial같은 경우는 버전이 현재 지원하지 않기에 다른 방안을 찾아보는 것이 최선이라 생각합니다.
* React는 SFC && Class Component의 비교 및 구 버전의 lifecycle을 이해하기 위해 둘 다 작성이 되었습니다. 이를 SFC component로 리팩토링 할 예정입니다
* API는 현재 날씨만 연동 완료한 상태이며, 로그인의 구글과 카카오 API는 내일 업데이트 커밋할 예정입니다.


### 1/30

#### 현재 상황
* 패키지 의존성이 모두 충돌이 발생했습니다.(38 error)
* force 명령어도 다른 명령어도 동작 에러가 발생하기에, 잠시 디버깅을 중단했습니다.

#### 해결하기 위해 사용한 방식

* 패키지에 ^ 표시를 붙여 이하 버전도 설치 가능하게 바꿨습니다.
<img width="282" alt="image" src="https://github.com/sangjun1126/React_Blog/assets/142310079/66706800-7098-4c3d-918e-c29addaba191">

* npm ls 명령어를 이용해서 구조를 찾아보는 과정을 실행했습니다.


