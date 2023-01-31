import React from 'react';
import Card from './Card';

const Board = ({shouldDisableAllCards, checkIsInactive, checkIsFlipped, handleCardClick, cards, mode}) => {
    return ( 
        <div className={`board-container ${mode.toLowerCase()}`}>
        {cards.map((card, index) => {
          return (
            <Card
              key={index}
              card={card}
              index={index}
              isDisabled={shouldDisableAllCards}
              isInactive={checkIsInactive(card)}
              isFlipped={checkIsFlipped(index)}
              onClick={handleCardClick}
            />
          );
        })}
      </div>
     );
}

{/* <div className="card-outer">
    <div className="card">
        <div className="front"></div>
        <div className=""></div>
    </div>
</div> */}
 
export default Board;