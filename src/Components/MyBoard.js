import React, { Component } from "react";
import styled from "styled-components";
import withLogin from "./LoginHoc";

class MyBoard extends Component {
  render() {
    return <div>내 글보기</div>;
  }
}

export default withLogin(MyBoard);
