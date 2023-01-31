import questionMark from "../../assets/questionMark.png";
import sound1 from "../../assets/sounds/projector-button-push-6258.mp3";
import "./Card.css";

const buttonSound = new Audio(sound1);

buttonSound.volume = .2;

const Card = ({ onClick, card, index, isInactive, isFlipped, isDisabled }) => {
  const handleClick = () => {
    if (isFlipped || isDisabled || isInactive) return;
    onClick(index);
    buttonSound.currentTime = .33;
    buttonSound.play();
    setTimeout(() => {
        buttonSound.pause();
        buttonSound.currentTime = .33;
    }, 500);
  };

  return (
    <div
      className={`card${isFlipped ? " is-flipped" : ""}${isInactive ? " is-inactive" : ""}`}
      onClick={handleClick}
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
