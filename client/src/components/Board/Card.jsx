// import questionMark from ".../assets/questionMark.png";
// const questionMark = require(`.../assets/questionMark.png`);
// import sound from '../../../utils/approxPerDay.js'
// import otherstuff from '../components/otherstuff'
import questionMark from "../../assets/questionMark.png";
import sound1 from "../../assets/sounds/start-13691.mp3";
import sound2 from "../../assets/sounds/projector-button-push-6258.mp3";
import "./Card.css";

const hoverSound = new Audio(sound1);
const buttonSound = new Audio(sound2);

const Card = ({ onClick, card, index, isInactive, isFlipped, isDisabled }) => {
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
    buttonSound.currentTime = 100;
    buttonSound.play();
    setTimeout(() => {
        buttonSound.pause();
        buttonSound.currentTime = 100;
    }, 300);
  };

  const handleHover = () => {
    // hoverSound.currentTime = 0;
    // hoverSound.play();
  }

  const cardStyle = {  }

  return (
    <div
      className={`card${isFlipped ? " is-flipped" : ""}${isInactive ? " is-inactive" : ""}`}
      onClick={handleClick}
      onMouseEnter={handleHover}
    >
      <div className="card-face card-font-face">
        <img src={questionMark} alt="back" />
      </div>
      <div className="card-face card-back-face">
        <img src={card.image} alt="face" />
      </div>
    </div>
  );
};

export default Card;
