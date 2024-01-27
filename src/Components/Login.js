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
