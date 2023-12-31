import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import TopBar from "../components/TopBar";
import CardItem from "../components/Card";
import { useNavigate } from "react-router-dom";

export default function MenuPage() {
  const [cards, setCards] = useState([]);
  const token = localStorage.getItem("token");
  const [cartCards, setCartCards] = useState([]);
  const navigate = useNavigate();

  const handleAddToCart = async (card) => {
    if (isInCart(card)) {
      alert("Carta já está no seu carrinho");
      return;
    }
    const confirmAddToCart = window.confirm(
      `Deseja adicionar a carta ${card.name} no seu carrinho?`
    );
    if (confirmAddToCart) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/cart/add-to-cart`,
          {
            cardId: card._id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          alert("Carta adicionada no seu carrinho");
          updateCardsList();
          fetchCards();
        }
      } catch (error) {
        if (error.response.status === 404) {
          alert("Carta não encontrada");
        } else {
          alert("Desculpe, ocorreu um erro inesperado");
          console.log(error.response.data);
        }
      }
    }
  };

  const handleRemoveFromCart = async (card) => {
    const confirmRemoveFromCart = window.confirm(
      `Deseja remover a carta ${card.name} do seu carrinho?`
    );

    if (confirmRemoveFromCart) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/cart/remove-from-cart`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: {
              cardId: card._id,
            },
          }
        );
        if (response.status === 200) {
          alert("Carta removida do carrinho com sucesso");
          updateCardsList();
          fetchCards();
        }
      } catch (error) {
        if (error.response.status === 404) {
          alert("Carta ou Carrinho não encontrados");
        } else {
          alert("Desculpe, ocorreu um erro inesperado");
          console.log(error.response.data);
        }
      }
    }
  };

  const fetchCards = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/card/cards`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const filteredCards = response.data.filter((card) => !card.sold);

      if (Array.isArray(filteredCards) && filteredCards.length > 0) {
        setCards(filteredCards);
      } else {
        setCards([]);
      }
    } catch (error) {
      alert("Desculpe, ocorreu um erro inesperado");
      console.log(error);
    }
  };

  const updateCardsList = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/cart/get-cards-on-cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 || !response.data.cards.length) {
        setCartCards(response.data.cards);
      }
      if (!response.data.cards.length) {
        setCartCards([]);
      }
    } catch (error) {
      alert("Desculpe, ocorreu um erro inesperado");
      console.log(error);
    }
  };

  const isInCart = (card) => {
    return cartCards.some((cartCard) => cartCard._id === card._id);
  };

  const handleAddCard = () => {
    const confirmAddCard = window.confirm(`Deseja adicionar uma carta?`);
    if (confirmAddCard) {
      const cardName = prompt(`Qual o nome da carta?`);
      const cardValue = prompt(`Qual o valor da carta?`);
      const card = {
        name: cardName,
        value: cardValue,
      };
      addCard(card);
    }
  };

  const addCard = async (card) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/card/add-card`,
        {
          name: card.name,
          value: Number(card.value),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Carta adicionada com sucesso");
        fetchCards();
      }
    } catch (error) {
      alert("Desculpe, ocorreu um erro inesperado");
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") == undefined) {
      navigate("/");
      return;
    }
    updateCardsList();
    fetchCards();
  }, []);

  return (
    <MenuContainer>
      <TopBar />
      <Line>
        <img src="PokeballIcon.svg" alt="" />
        <h1>Cards</h1>
      </Line>
      <SearchBar />
      <CardContainer>
        {cards.length === 0 ? (
          <NoResult>
            <h1>Nenhuma carta encontrada</h1>
            <img src={"SadPikachuIcon.svg"} alt="" />
          </NoResult>
        ) : (
          cards.map((card) => (
            <CardItem
              key={card._id}
              card={card}
              handleAddToCart={handleAddToCart}
              handleRemoveFromCart={handleRemoveFromCart}
              isInCart={isInCart}
            />
          ))
        )}
      </CardContainer>
      <button onClick={handleAddCard}>Adicionar carta</button>
    </MenuContainer>
  );
}

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 40px);
  width: calc(100% - 80px);
  padding: 20px 40px;
  gap: 40px;
  margin-top: 40px;
  max-width: 1426px;
  h1 {
    font-size: 36px;
  }
  h2 {
    font-family: "Poppins";
    font-size: 18px;
  }
  overflow: hidden;
  @media (max-width: 767px) {
    height: 100%;
    width: 100%;
    padding: 0px;
    gap: 20px;
  }
`;

const Line = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 16px;
  align-self: start;
`;

const NoResult = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  img {
    width: 100%;
    height: 100%;

    max-width: 400px;
    max-height: 400px;
  }
  @media (max-width: 767px) {
    img {
      width: 200px;
      height: 200px;
    }
  }
`;

const CardContainer = styled.div`
  background-color: #fffdc7;
  width: calc(90% - 32px);
  max-height: calc(75% - 32px);

  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  gap: 16px;
  padding: 15px;
  overflow-y: auto;

  border-radius: 10px;
  border: 1px solid #151515;

  @media (max-width: 767px) {
    width: calc(100% - 62px);
    overflow-x: hidden;
    gap: 30px;
    max-height: 300px;
  }
`;
