import React, { useState, useEffect } from "react";
import "../styles/game.css";

const imagePaths = Array.from({ length: 14 }, (_, i) => require(`../assets/images/imagen${i + 1}.webp`));
const backImage = require("../assets/images/back.png");

const generateCards = () => {
  const cards = [...imagePaths, ...imagePaths]
    .map((image, index) => ({ id: index, image, flipped: false, matched: false }))
    .sort(() => Math.random() - 0.5);
  return cards;
};

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [lockBoard, setLockBoard] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (selectedCards.length === 2) {
      setLockBoard(true);
      setTimeout(checkMatch, 800);
    }
  }, [selectedCards]);

  const handleCardClick = (id) => {
    if (lockBoard || selectedCards.includes(id) || gameOver) return;
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, flipped: true } : card
      )
    );
    setSelectedCards((prev) => [...prev, id]);
  };

  const checkMatch = () => {
    const [first, second] = selectedCards;
    const firstCard = cards.find((card) => card.id === first);
    const secondCard = cards.find((card) => card.id === second);

    if (firstCard && secondCard && firstCard.image === secondCard.image) {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === first || card.id === second ? { ...card, matched: true } : card
        )
      );
    } else {
      setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === first || card.id === second ? { ...card, flipped: false } : card
          )
        );
      }, 500);
    }
    setSelectedCards([]);
    setLockBoard(false);

    if (cards.every((card) => card.matched || card.id === first || card.id === second)) {
      setGameOver(true);
      setMessage("¡Felicidades! Has completado el juego.");
    }
  };

  const startGame = () => {
    setCards(generateCards());
    setGameOver(false);
    setMessage("");
    setGameStarted(true);
  };

  const restartGame = () => {
    setCards(generateCards());
    setSelectedCards([]);
    setLockBoard(false);
    setGameOver(false);
    setMessage("");
    setGameStarted(true);
  };

  return (
    <div className="memory-game-container">
      {!gameStarted ? (
        <div className="start-screen">
          <p>Instrucciones: Encuentra todas las parejas.</p>
          <button onClick={startGame}>Iniciar Juego</button>
        </div>
      ) : (
        <>
          <div className="memory-game">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`card ${card.flipped || card.matched ? "flipped" : ""}`}
                onClick={() => handleCardClick(card.id)}
              >
                <img src={card.flipped || card.matched ? card.image : backImage} alt="card" />
              </div>
            ))}
          </div>
          {gameOver && (
            <div className="game-over">
              <p>{message}</p>
              <button onClick={restartGame}>Volver a jugar</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MemoryGame;
