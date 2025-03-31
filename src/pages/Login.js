import React, { useState } from "react";
import "../styles/styles.css"; // Asegúrate de enlazar este archivo de estilos


const CuteInvitation = () => {
  const [yesSize, setYesSize] = useState(16); // Tamaño inicial del botón "Sí"
  const [showMessage, setShowMessage] = useState(false);
  const [noPosition, setNoPosition] = useState({ top: "50%", left: "50%" });

  const handleNoClick = () => {
    // Aumenta el tamaño del botón "Sí"
    setYesSize((prevSize) => prevSize + 10);

    // Genera una nueva posición aleatoria para el botón "No"
    const newX = Math.random() * 80 + 10; // Entre 10% y 90%
    const newY = Math.random() * 80 + 10; // Entre 10% y 90%
    setNoPosition({ top: `${newY}%`, left: `${newX}%` });
  };

  return (
    <div className="container">
      {!showMessage ? (
        <div className="question-box">
          <h2>¿Quieres salir conmigo? 💖</h2>
          <div className="buttons">
            <button
              className="yes-button"
              style={{ fontSize: `${yesSize}px`, padding: `${yesSize / 2}px ${yesSize}px` }}
              onClick={() => setShowMessage(true)}
            >
              Sí 💕
            </button>
            <button
              className="no-button"
              style={{ position: "absolute", top: noPosition.top, left: noPosition.left }}
              onClick={handleNoClick}
            >
              No 😜
            </button>
          </div>
        </div>
      ) : (
        <div className="message-box">
          <h2>¡Sabía que dirías que sí! 🥰💖</h2>
          <img src="https://media.tenor.com/5MABfQnF8JkAAAAi/stitch-love.gif" alt="Stitch feliz" className="stitch-img" />
        </div>
      )}
    </div>
  );
};

export default CuteInvitation;
