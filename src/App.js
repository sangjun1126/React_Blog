import React, { Component } from "react";
import styled from "styled-components";
import Header from "./Layout/Header";
import Navigation from "./Layout/Navigation";
import { Router } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Layout>
        <Header />
        <Navigation />
        <Content>
          <Router />
        </Content>
      </Layout>
    );
  }
}

const Layout = styled.div`
  margin: 0 auto;
  display: flex;
  width: 100%;
  flex-flow: row wrap;
`;

export default App;
