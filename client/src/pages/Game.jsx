import { useEffect, useState, useRef } from "react";
import Modal from 'react-bootstrap/Modal';
import Board from '../components/Board/Board';
import shuffleCards from "../utilities/shuffleCards";
import uniqueCardsArray from "../utilities/uniqueCardsArray";
import sound1 from "../assets/sounds/winharpsichord-39642.mp3";
import "./Game.css";

const Game = () => {

  const [mode, setMode] = useState("Easy");

  const suffledCards = shuffleCards(uniqueCardsArray);

  const cardsBasedOnMode = 
  mode === 'Easy' ? suffledCards.slice(0, 6).concat(suffledCards.slice(0, 6))
  : mode === 'Medium' ? suffledCards.slice(0, 12).concat(suffledCards.slice(0, 12))
  : mode === 'Hard' ? suffledCards.concat(suffledCards) : '';

  const [cards, setCards] = useState(cardsBasedOnMode);
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showModal, setShowModal] = useState(false);
  
  const [bestScore, setBestScore] = useState(
    JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY
  );
  const [bestScoreForMode, setBestScoreForMode] = useState({
    Easy: JSON.parse(localStorage.getItem("bestScoreEasy")) || Number.POSITIVE_INFINITY,
    Medium: JSON.parse(localStorage.getItem("bestScoreMedium")) || Number.POSITIVE_INFINITY,
    Hard: JSON.parse(localStorage.getItem("bestScoreHard")) || Number.POSITIVE_INFINITY,
  });
  const timeout = useRef(null);

  const disable = () => {
    setShouldDisableAllCards(true);
  };
  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === cards.length / 2) {
      const winSound = new Audio(sound1);
      winSound.play();
      setShowModal(true);
      const highScore = Math.min(moves, bestScoreForMode[mode]);
      setBestScoreForMode({...bestScoreForMode, [mode]: highScore});
      setBestScore(bestScoreForMode[mode]);
      localStorage.setItem("bestScore" + mode, highScore);
    }
  };

  useEffect(() => {
    console.log('clearedCards', clearedCards);
  }, [clearedCards])

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
    setCards(cardsBasedOnMode);
    setBestScore(bestScoreForMode[mode]);
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
    setCards(cardsBasedOnMode);
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
          Mode: <button className="mode-button" onClick={() => setMode('Easy')}>Easy</button> <button className="mode-button" onClick={() => setMode('Medium')}>Medium</button> <button className="mode-button" onClick={() => setMode('Hard')}>Hard</button> 
        </div>
      </header>

      <Board {...propsForBoard} />

      <footer>
        <div className="score">
          <div className="moves">
            <span className="bold">Moves:</span> {moves}
          </div>
          {localStorage.getItem("bestScore" + mode) && (
            <div className="high-score">
              <span className="bold">Best Score:</span> {bestScoreForMode[mode]}
            </div>
          )}
        </div>
        <div className="restart">
          <button className="button-restart" onClick={handleRestart} color="primary" variant="contained">
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
          You completed the game in {moves} moves. Your best score in {mode} mode is {bestScoreForMode[mode]} moves.
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
