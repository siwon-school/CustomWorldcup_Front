import React, { useState } from "react";
import styled from "styled-components";
import { postAPI } from "../axios";
import Input from "../components/Input";

const SignIn = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const handleNickname = (e) => {
    setNickname(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const signInHandler = (e) => {
    e.preventDefault();
    const user = {
      nickname,
      password,
    };

    postAPI("/api/auth/login", user)
      .then((data) => {
        console.log("data :: ", data);
        console.log("data.data.Authorization :: ", data.data.Authorization);
        sessionStorage.setItem("token", data.data.Authorization);
      })
      .catch((e) => console.log("e :: ", e));
  };

  return (
    <Container>
      <TextDiv>
        <h2>로그인</h2>
        <p>아이디와 비밀번호를 입력해주세요.</p>
      </TextDiv>
      <form>
        <FormDiv>
          <Input
            placeholder={"아이디"}
            clickAddInputHandler={handleNickname}
          ></Input>
          <Input
            placeholder={"비밀번호"}
            clickAddInputHandler={handlePassword}
          ></Input>
        </FormDiv>
        <FormBtnDiv>
          <LoginBtn onClick={signInHandler}>로그인</LoginBtn>
          <AddBtn>계정 생성</AddBtn>
        </FormBtnDiv>
      </form>
    </Container>
  );
};

export default SignIn;

const Container = styled.div`
  width: 400px;
  margin: auto;
`;

const TextDiv = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 100px;
`;

const FormDiv = styled.div`
  width: 300px;
  margin: auto;
`;

const FormBtnDiv = styled.div`
  width: 300px;
  margin: auto;
`;

const LoginBtn = styled.button`
  width: 100%;
  height: 30px;
  margin-bottom: 20px;
  background-color: #b9d7ea;
  border: 3px solid #b9d7ea;
  color: white;
`;

const AddBtn = styled.button`
  width: 100%;
  height: 30px;
  margin-bottom: 20px;
  background-color: #769fcd;
  border: 3px solid #769fcd;
  color: white;
`;
