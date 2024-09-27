import React from 'react';
import { Card } from '../game/card';

interface HandProps {
    cards: Card[];
    onCardClick: (card: Card) => void; // Die Typdefinition für den Callback
}

const Hand: React.FC<HandProps> = ({ cards, onCardClick }) => {
    return (
        <div className="flex space-x-2">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className={`card ${card.color}`}
                    onClick={() => onCardClick(card)} // Hier wird die Karte an die Funktion übergeben
                >
                    {card.value !== null ? card.value : "Joker"}
                </div>
            ))}
        </div>
    );
};

export default Hand;
