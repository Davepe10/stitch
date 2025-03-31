import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"; // Asegúrate de tener el archivo CSS correspondiente

// Importar imágenes locales
import rain1 from "../assets/images/imagen5.webp";
import rain2 from "../assets/images/imagen6.webp";
import rain3 from "../assets/images/imagen7.webp";
import rain4 from "../assets/images/imagen8.webp";
import rain5 from "../assets/images/imagen9.webp";
import rain6 from "../assets/images/imagen10.webp";
import rain7 from "../assets/images/imagen11.webp";
import rain8 from "../assets/images/imagen12.webp";
import rain9 from "../assets/images/imagen13.webp";
import rain10 from "../assets/images/imagen14.webp";

const messages = [
  "✨ Un mundo mágico te espera ✨",
  "💖 Eres la estrella más brillante 💖",
  "🌟 Bienvenido a tu cuento de hadas 🌟",
  "🎶 Hakuna Matata, disfruta el viaje 🎶",
];

const rainImagesSet = [rain1, rain2, rain3, rain4, rain5, rain6, rain7, rain8, rain9, rain10];

export default function Home() {
  const [message, setMessage] = useState(messages[0]);
  const navigate = useNavigate();
  const [rainImages, setRainImages] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const generateRain = () => {
      const newImages = Array.from({ length: 15 }).map(() => ({
        id: Math.random(),
        src: rainImagesSet[Math.floor(Math.random() * rainImagesSet.length)],
        x: Math.random() * window.innerWidth,
        y: -50 - Math.random() * 100, // Comienza fuera de la pantalla
        size: Math.random() * 30 + 10,
        delay: Math.random() * 3,
      }));
      setRainImages(newImages);
    };
    generateRain();
    const rainInterval = setInterval(generateRain, 4000);
    return () => clearInterval(rainInterval);
  }, []);

  return (
    <div className="home-container" style={{ position: "relative", overflow: "hidden", height: "100vh" }}>
      {rainImages.map((img) => (
        <motion.img
          key={img.id}
          src={img.src}
          className="rain-image"
          style={{
            position: "absolute",
            left: img.x,
            top: img.y, // Asegura que caigan desde arriba
            width: `${img.size}px`,
            height: `${img.size}px`,
            opacity: 1,
          }}
          initial={{ y: -100, opacity: 0.8 }}
          animate={{ y: "100vh", opacity: 1 }}
          transition={{ duration: 5, delay: img.delay, ease: "linear" }}
        />
      ))}
      <div className="content" style={{ background: "none", boxShadow: "none" }}>
        <motion.h1 className="title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          {message}
        </motion.h1>
        <div className="buttons-container">
          <div className="button-box">
            <img src={rain1} alt="Quiz Icon" className="button-icon" />
            <motion.button className="quiz-button" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => navigate("/quiz")}>
              🌟 Hacer el Quiz
            </motion.button>
          </div>
          <div className="button-box">
            <img src={rain2} alt="Game Icon" className="button-icon" />
            <motion.button className="game-button" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => navigate("/game")}>
              🎮 Jugar Ahora
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
