import React, { Component } from "react";
import styled from "styled-components";
import withLogin from "./LoginHoc";

class MyPage extends Component {
  render() {
    return <div>MyPage</div>;
  }
}

export default withLogin(MyPage);
