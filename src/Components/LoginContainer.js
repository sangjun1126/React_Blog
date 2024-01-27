// Store에 저장된 value를 사용하기 위해 Store.consumer를 받을 컨테이너 컴포넌트 생성
// login 컴포넌트에 store에 저장된 onLogin 함수를 넣어준다.

import React, { Component } from "react";
import Store from "../Store/store";
import Login from "./Login";

const LoginContainer = () => {
  <Store.Consumer>
    {(store) => <Login onLogin={store.onLogin} />}
  </Store.Consumer>;
};

export default LoginContainer;
