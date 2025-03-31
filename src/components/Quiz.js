import React, { useState, useEffect } from "react";

const API_URL = "https://the-trivia-api.com/api/questions?limit=10";

const QuizGame = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        if (!data || data.length === 0) {
          console.error("No se recibieron preguntas de la API.");
          setLoading(false);
          return;
        }

        const formattedQuestions = data.map((question, index) => ({
          id: `${question.id || index}`, // Usamos un ID único
          text: question.question,
          options: [...question.incorrectAnswers, question.correctAnswer].sort(() => Math.random() - 0.5),
          correct: question.correctAnswer,
        }));

        setQuestions(formattedQuestions);
      } catch (err) {
        console.error("Error al cargar preguntas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (selectedOption) => {
    if (!questions[currentQuestion]) return; // Evita errores si no hay pregunta

    setSelectedAnswer(selectedOption);

    if (selectedOption === questions[currentQuestion].correct) {
      setScore((prevScore) => prevScore + 10);
      setTimeout(() => {
        setSelectedAnswer(null);
        setCurrentQuestion((prev) => prev + 1);
      }, 1000);
    } else {
      setTimeout(() => setGameOver(true), 1500);
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setGameOver(false);
    setSelectedAnswer(null);
    setLoading(true);

    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const formattedQuestions = data.map((question, index) => ({
          id: `${question.id || index}`, // Clave única
          text: question.question,
          options: [...question.incorrectAnswers, question.correctAnswer].sort(() => Math.random() - 0.5),
          correct: question.correctAnswer,
        }));
        setQuestions(formattedQuestions);
      })
      .catch((err) => console.error("Error al cargar preguntas:", err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="quiz-container">
      {loading ? (
        <p>Cargando preguntas...</p>
      ) : !gameOver ? (
        questions.length > 0 && questions[currentQuestion] ? (
          <div key={questions[currentQuestion].id}>
            <h2>{questions[currentQuestion].text}</h2>
            <div className="options">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={`${questions[currentQuestion].id}-${index}`} // Clave única combinada
                  onClick={() => handleAnswer(option)}
                  className={
                    selectedAnswer
                      ? option === questions[currentQuestion].correct
                        ? "correct"
                        : option === selectedAnswer
                        ? "incorrect"
                        : ""
                      : ""
                  }
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </button>
              ))}
            </div>
            <p>Pregunta {currentQuestion + 1} / {questions.length}</p>
            <p>Puntuación: {score}</p>
          </div>
        ) : (
          <p>No hay más preguntas disponibles.</p>
        )
      ) : (
        <div className="result">
          <h2>¡Juego terminado!</h2>
          <p>Tu puntuación final: {score} puntos</p>
          <p>{score >= 30 ? "¡Eres una genia de la trivia! 🤓" : "Sigue intentando, lo harás mejor. 😃"}</p>
          <button onClick={restartGame}>Volver a jugar</button>
        </div>
      )}
    </div>
  );
};

export default QuizGame;
