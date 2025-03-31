import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Quiz from "./components/Quiz";
import Game from "./components/Game";
import "./styles/App.css";

// Importar imágenes correctamente
import background1 from "./assets/images/imagen1.webp";
import background2 from "./assets/images/imagen2.webp";
import background3 from "./assets/images/imagen3.webp";
import background4 from "./assets/images/imagen4.webp";
import background5 from "./assets/images/imagen5.webp";
import background6 from "./assets/images/imagen6.webp";
import background7 from "./assets/images/imagen7.webp";
import background8 from "./assets/images/imagen8.webp";
import background9 from "./assets/images/imagen9.webp";
import background10 from "./assets/images/imagen10.webp";
import background11 from "./assets/images/imagen11.webp";
import background12 from "./assets/images/imagen12.webp";
import background13 from "./assets/images/imagen13.webp";
import background14 from "./assets/images/imagen14.webp";

const backgrounds = [
  background1, background2, background3, background4, background5, background6,
  background7, background8, background9, background10, background11, background12, background13, background14
];

function App() {
  const [background, setBackground] = useState(backgrounds[Math.floor(Math.random() * backgrounds.length)]);
  const [menuOpen, setMenuOpen] = useState(false); // ✅ Agregado para evitar el error

  useEffect(() => {
    const changeBackground = () => {
      let newBackground;
      do {
        newBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
      } while (newBackground === background); // Evita repetir la misma imagen

      setBackground(newBackground);
    };

    const interval = setInterval(changeBackground, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [background]); // Se asegura de que el estado anterior influya en el cambio

  return (
    <Router>
      <div className="app-container">
        <div 
          className="background" 
          style={{ backgroundImage: `url(${background})`, transition: "background-image 1s ease-in-out" }}
        />

        {/* Barra de navegación */}
        <nav className="navbar">
          <div className="navbar-logo">🌊 Hola Princesa 🌊</div>
          <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✖" : "☰"}
          </div>
          <div className={`nav-links ${menuOpen ? "show" : ""}`}>
            <Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
            <Link to="/quiz" onClick={() => setMenuOpen(false)}>Quiz</Link>
            <Link to="/game" onClick={() => setMenuOpen(false)}>Juego</Link>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Cuento</Link>
          </div>
        </nav>

        {/* Contenido principal */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
