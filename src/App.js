import React, { Component } from "react";
import styled from "styled-components";
import Header from "./Layout/Header";
import Navigation from "./Layout/Navigation";
import Router from "./Routes/Router";
import Store from "./Store/store";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      onLogin: this.onLogin,
      onLogout: this.onLogout,
    };
  }

  //로그인 로직
  onLogin = () => {
    this.setState({
      logged: true,
    });
  };

  // 로그아웃 로직
  onLogout = () => {
    this.setState({
      logged: false,
    });

    const provider = window.sessionStorage.getItem("provider");
    if (provider === "google") {
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log("Google Logout");
      });
    }

    // 세션 스토리지 클리어
    window.sessionStorage.clear();
  };

  componentDidMount() {
    const id = window.sessionStorage.getItem("id");
    if (id) {
      this.onLogin();
    } else {
      this.onLogout();
    }
  }

  render() {
    const { logged, onLogout } = this.state;

    return (
      <Store.Provider value={this.state}>
        <Layout>
          <Header logged={logged} onLogout={onLogout} />
          <Navigation />
          <Content>
            <Router />
          </Content>
        </Layout>
      </Store.Provider>
    );
  }
}

const Layout = styled.div`
  margin: 0 auto;
  display: flex;
  width: 100%;
  flex-flow: row wrap;
`;

const Content = styled.div`
  margin: 0 auto;
`;

export default App;
