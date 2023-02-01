import { useEffect, useState, useRef } from "react";
import Modal from 'react-bootstrap/Modal';
import Board from '../components/Board/Board';
import shuffleCards from "../utilities/shuffleCards";
import uniqueCardsArray from "../utilities/uniqueCardsArray";
import sound1 from "../assets/sounds/winharpsichord-39642.mp3";
import sound2 from "../assets/sounds/clickselect2-92097.mp3";
import sound3 from "../assets/sounds/computer-processing-sound-effects-short-click-select-03-122132.mp3";
import sound4 from "../assets/sounds/button-pressed-38129.mp3";
import "./Game.css";

const Game = () => {

  const [mode, setMode] = useState("Easy");

  const shuffledCards = shuffleCards(uniqueCardsArray);

  const cardsBasedOnMode = shuffleCards(
  mode === 'Easy' ? shuffledCards.slice(0, 6).concat(shuffledCards.slice(0, 6)) :
  mode === 'Medium' ? shuffledCards.slice(0, 12).concat(shuffledCards.slice(0, 12)) :
  mode === 'Hard' ? shuffledCards.concat(shuffledCards) : '' );

  const [cards, setCards] = useState(cardsBasedOnMode);
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showModal, setShowModal] = useState(false);
  
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
      localStorage.setItem("bestScore" + mode, highScore);
    }
  };

  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].index === cards[second].index) {
      const matchSound = new Audio(sound4);
      matchSound.play();
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
    const changeModeSound = new Audio(sound2);
    changeModeSound.currentTime = .1;
    changeModeSound.play();
    handleRestart();
  }, [mode]);

  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (card) => {
    return Boolean(clearedCards[card.index]);
  };

  const handleRestart = () => {
    const restartSound = new Audio(sound3);
    restartSound.play();
    setClearedCards({});
    setOpenCards([]);
    setShowModal(false);
    setMoves(0);
    setShouldDisableAllCards(false);
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
        <div className="bold">
          Mode:
          <button className="mode-button" data-selected={mode === 'Easy'} onClick={() => setMode('Easy')}>Easy</button>
          <button className="mode-button" data-selected={mode === 'Medium'} onClick={() => setMode('Medium')}>Medium</button>
          <button className="mode-button" data-selected={mode === 'Hard'} onClick={() => setMode('Hard')}>Hard</button>
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
          <button className="button-restart" onClick={handleRestart} color="primary" variant="contained">Restart</button>
        </div>
      </footer>

      <Modal
        show={showModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="message-header">
          <Modal.Title>You won! Congratulations.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You completed the game in {moves} moves. Your best score in {mode} mode is {bestScoreForMode[mode]} moves.
        </Modal.Body>
        <Modal.Footer className="message-header">
          <button onClick={handleRestart}>Restart</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Game;
