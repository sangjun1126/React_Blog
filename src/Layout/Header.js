import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    const { logged, onLogout } = this.props;

    return (
      <Container>
        <Element>
          {logged ? (
            <ShortCut>
              <Link to="/" onClick={onLogout}>
                로그아웃
              </Link>
            </ShortCut>
          ) : (
            <ShortCut>
              <Link to="/login">로그인 / 회원가입</Link>
            </ShortCut>
          )}
          <Logo>
            <img
              width="100%"
              height="100%"
              src="https://t1.daumcdn.net/cfile/tistory/99CD014B5BD01FA412"
              alt="logo"
            />
          </Logo>
          <Search>
            <Link to="/" style={{ textDecoration: "none", color: "#274046" }}>
              <h1>리액트 블로그</h1>
            </Link>
          </Search>
        </Element>
      </Container>
    );
  }
}
export default Header;

const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid #d1d8e4;
`;

const Element = styled.div`
  margin: 0 auto;
  width: 1080px;
  height: 100px;
  display: flex;
  flex-flow: row wrap;
`;

const ShortCut = styled.div`
  order: 1;
  width: 100%;
  height: 20px;
  text-align: right;
  background-color: #a8ff78;
`;

const Logo = styled.div`
  order: 2;
  width: 200px;
  height: 80px;
`;

const Search = styled.div`
  order: 3;
  width: 880px;
  background-color: #78ffd6;
  text-align: center;
`;
