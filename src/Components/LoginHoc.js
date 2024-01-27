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
