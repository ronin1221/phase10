import React from "react";
import {Card} from '../game/card'

interface DeckProps {
    topCard: Card | null;
}

const Deck: React.FC<DeckProps> = ({topCard}) => {
    return (
        <div className="deck">
            <h2>Deck</h2>
            {topCard ?
                <div className={`card ${topCard.color}`}> {topCard.value != null ? topCard.value : "Joker"} </div> :
                <p>Keine Karten im Dec</p>}
        </div>
    );
};

export default Deck;