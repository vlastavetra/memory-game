import { useEffect, useState, useRef } from "react";
import Modal from 'react-bootstrap/Modal';
import Board from '../components/Board/Board';
import shuffleCards from "../utilities/shuffleCards";
import uniqueCardsArray from "../utilities/uniqueCardsArray";
import "./Game.css";

const Game = () => {

  const [cards, setCards] = useState(() =>
    shuffleCards(uniqueCardsArray.concat(uniqueCardsArray))
  );
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("Easy");
  
  const [bestScore, setBestScore] = useState(
    JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY
  );
  const [bestScoreEasy, setBestScoreEasy] = useState(
    JSON.parse(localStorage.getItem("bestScoreEasy")) || Number.POSITIVE_INFINITY
  );
  const [bestScoreMedium, setBestScoreMedium] = useState(
    JSON.parse(localStorage.getItem("bestScoreMedium")) || Number.POSITIVE_INFINITY
  );
  const [bestScoreHard, setBestScoreHard] = useState(
    JSON.parse(localStorage.getItem("bestScoreHard")) || Number.POSITIVE_INFINITY
  );
  const timeout = useRef(null);

  const disable = () => {
    setShouldDisableAllCards(true);
  };
  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const checkCompletion = () => {
    console.log('cards', cards.length);
    console.log('Object.keys(clearedCards).length', Object.keys(clearedCards).length);
    if (Object.keys(clearedCards).length === cards.length / 2) {
      setShowModal(true);
      if (mode === "Easy") {
        const highScore = Math.min(moves, bestScoreEasy);
        setBestScoreEasy(highScore);
        localStorage.setItem("bestScoreEasy", highScore);
      }
      if (mode === "Medium") {
        const highScore = Math.min(moves, bestScoreMedium);
        setBestScoreMedium(highScore);
        localStorage.setItem("bestScoreMedium", highScore);
      }
      if (mode === "Hard") {
        const highScore = Math.min(moves, bestScoreHard);
        setBestScoreHard(highScore);
        localStorage.setItem("bestScoreHard", highScore);
      }
    }
  };

  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].index === cards[second].index) {
      setClearedCards((prev) => ({ ...prev, [cards[first].index]: true }));
      setOpenCards([]);
      return;
    }
    // This is to flip the cards back after 500ms duration
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };
  
  const handleCardClick = (index) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);

  useEffect(() => {
    handleRestart();
    setCards(mode === 'Easy' ? shuffleCards(uniqueCardsArray.slice(0, 6).concat(uniqueCardsArray.slice(0, 6))) : mode === 'Medium' ? shuffleCards(uniqueCardsArray.slice(0, 12).concat(uniqueCardsArray.slice(0, 12))) : shuffleCards(uniqueCardsArray.concat(uniqueCardsArray)));
    setBestScore(mode === 'Easy' ? bestScoreEasy : mode === 'Medium' ? bestScoreMedium : bestScoreHard);
  }, [mode]);

  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (card) => {
    return Boolean(clearedCards[card.index]);
  };

  const handleRestart = () => {
    setClearedCards({});
    setOpenCards([]);
    setShowModal(false);
    setMoves(0);
    setShouldDisableAllCards(false);
    // set a shuffled deck of cards
    setCards(mode === 'Easy' ? shuffleCards(uniqueCardsArray.slice(0, 6).concat(uniqueCardsArray.slice(0, 6))) : mode === 'Medium' ? shuffleCards(uniqueCardsArray.slice(0, 12).concat(uniqueCardsArray.slice(0, 12))) : shuffleCards(uniqueCardsArray.concat(uniqueCardsArray)));
  };

  const propsForBoard = {
    shouldDisableAllCards,
    checkIsInactive,
    checkIsFlipped,
    handleCardClick,
    cards,
    mode
  }


  return (
    <div className="game">
      <header>
        <h3>Play the Flip card game</h3>
        <div>
          Select two cards with same content consequtively to make them vanish
        </div>
        <div>
          Mode: <button type="button" onClick={() => setMode('Easy')}>Easy</button> <button type="button" onClick={() => setMode('Medium')}>Medium</button> <button type="button" onClick={() => setMode('Hard')}>Hard</button> 
        </div>
      </header>

      <Board {...propsForBoard} />

      <footer>
        <div className="score">
          <div className="moves">
            <span className="bold">Moves:</span> {moves}
          </div>
          {mode === 'Easy' && localStorage.getItem("bestScoreEasy") && (
            <div className="high-score">
              <span className="bold">Best Score:</span> {bestScoreEasy}
            </div>
          )}
          {mode === 'Medium' && localStorage.getItem("bestScoreMedium") && (
            <div className="high-score">
              <span className="bold">Best Score:</span> {bestScoreMedium}
            </div>
          )}
          {mode === 'Hard' && localStorage.getItem("bestScoreHard") && (
            <div className="high-score">
              <span className="bold">Best Score:</span> {bestScoreHard}
            </div>
          )}
        </div>
        <div className="restart">
          <button onClick={handleRestart} color="primary" variant="contained">
            Restart
          </button>
        </div>
      </footer>

      <Modal
        show={showModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>You won! Congratulations.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You completed the game in {moves} moves. Your best score in {mode} mode is {mode === 'Easy' ? bestScoreEasy : mode === 'Medium' ? bestScoreMedium : bestScoreHard } moves.
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleRestart} color="primary">
            Restart
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Game;
