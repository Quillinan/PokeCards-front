import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import CapePage from "./pages/CapePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MenuPage from "./pages/MenuPage";

export default function App() {
  return (
    <PagesContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CapePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<SignupPage />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </BrowserRouter>
    </PagesContainer>
  );
}

const PagesContainer = styled.main`
  background-color: #e2e2e2;
  width: calc(100vw - 50px);
  height: calc(100vh - 50px);
  padding: 25px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
