import React from 'react';
import { Card } from '../game/card';

interface HandProps {
    cards: Card[];
    onCardClick: (card: Card) => void;
}

const Hand: React.FC<HandProps> = ({ cards, onCardClick }) => {
    const getCardImage = (card: Card) => {
        if (!card.color || card.value === null) {
            // Zeige eine Kartenrückseite, wenn entweder Farbe oder Wert nicht gesetzt sind
            return `/assets/cards/card_back.svg`;
        }

        // Dynamischer Pfad zu den Kartensymbolen
        return `/assets/cards/card_${card.color}_${card.value}.svg`;
    };

    return (
        <div className="player-hand">
            {cards.map((card, index) => (
                <img
                    key={index}
                    src={getCardImage(card)}
                    alt={`Karte ${card.value} ${card.color}`}
                    className="card"
                    onClick={() => onCardClick(card)}
                />
            ))}
        </div>
    );
};

export default Hand;
