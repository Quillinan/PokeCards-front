import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { StylizedInput } from "../styles/GlobalStyle";
import { useState } from "react";
import axios from "axios";

export default function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não correspondem. Por favor, tente novamente.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signup`,
        {
          name,
          email,
          password,
        }
      );
      navigate("/login");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <SignupContainer>
      <img src="/Logo.svg" alt="" />
      <BoxContainer>
        <div>
          <h1 className="title">CADASTRO</h1>
          <h1 className="subtitle">Nome</h1>
          <StylizedInput
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <h1 className="subtitle">E-mail</h1>
          <StylizedInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h1 className="subtitle">Senha</h1>
          <StylizedInput
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <h1 className="subtitle">Confirmar senha</h1>
          <StylizedInput
            placeholder="Confirmar senha"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <h1 className="login" onClick={handleLoginClick}>
          Já tem conta? Entre
        </h1>
        <button onClick={handleSignup}>CADASTRAR</button>
      </BoxContainer>
    </SignupContainer>
  );
}

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px 25px;
  height: calc(100% - 30px);
  width: calc(100% - 50px);
  img {
    margin-bottom: 50px;
  }
  @media (max-width: 600px) {
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    padding: 10px;
    img {
      margin-bottom: 20px;
    }
  }
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  max-height: 800px;

  width: calc(100% - 50px);
  height: calc(100% - 30px);
  padding: 15px 25px;
  .title {
    margin-bottom: 20px;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: self-start;
    width: 100%;
    margin: 0 0 35px 0;
  }
  .subtitle {
    margin-top: 20px;
  }
  button {
    margin-top: 30px;
  }
  .login {
    text-align: center;
    text-decoration: underline;
    cursor: pointer;
  }

  @media (min-width: 601px) and (min-height: 601px) {
    border-radius: 10px;
    border: 1px solid #151515;
  }

  @media (max-width: 600px) {
    width: calc(100% - 30px);
    height: calc(80% - 30px);
    padding: 15px;
    div {
      margin: 15px 0;
    }
    .title {
      margin-bottom: 15px;
    }
    h1 {
      font-size: 25px;
    }
    input {
      font-size: 25px;
      height: 40px;
    }
    .subtitle {
      margin-top: 10px;
      font-size: 20px;
    }
    button {
      margin-top: 15px;
    }
  }
`;
