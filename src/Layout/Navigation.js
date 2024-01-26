import React, { Component } from "react";
import styled from "styled-components";

class Navigation extends Component {
  render() {
    return (
      <Nav>
        <NavList>
          <NavItem>소개</NavItem>
          <NavItem>게시판</NavItem>
          <NavItem>연락</NavItem>
          <NavItem>메뉴1</NavItem>
          <NavItem>메뉴2</NavItem>
          <NavItem>메뉴3</NavItem>
        </NavList>
      </Nav>
    );
  }
}

export default Navigation;

const Nav = styled.div`
  width: 100%;
  height: 30px;
  border-bottom: 1px solid #d1d8e4;
`;

const NavList = styled.ul`
  width: 100%;
  display: flex;
  margin: 0 auto;
`;

const NavItem = styled.li`
  width: 60px;
  margin-left: 18px;
  margin-top: 5px;
  display: flex;
`;
