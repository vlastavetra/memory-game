// import questionMark from ".../assets/questionMark.png";
// const questionMark = require(`../assets/questionMark.png`);
import "./Card.css";


const Card = ({ onClick, card, index, isInactive, isFlipped, isDisabled }) => {
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };

  const cardStyle = {  }

  return (
    <div
      className={`card${isFlipped ? " is-flipped" : ""}${isInactive ? " is-inactive" : ""}`}
      onClick={handleClick}
    >
      <div className="card-face card-font-face">
        <img src="https://art.pixilart.com/f1e65dd24607f2f.png" alt="back" />
      </div>
      <div className="card-face card-back-face">
        <img src={card.image} alt="face" />
      </div>
    </div>
  );
};

export default Card;
