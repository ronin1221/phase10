import React from 'react';
import { Card } from '../game/card';

interface DeckProps {
    topCard: Card | null;
    discardPile: Card | null;
    onDrawDeck: () => void;
    onDrawDiscard: () => void;
}

const Deck: React.FC<DeckProps> = ({ topCard, discardPile, onDrawDeck, onDrawDiscard }) => {
    const getCardImage = (card: Card | null) => {
        if (!card || !card.color || card.value === null) {
            // Rückseite anzeigen, wenn die Karte ungültig ist
            return '/assets/cards/card_back.svg';
        }

        // Dynamischer Pfad zu den Kartensymbolen
        return `/assets/cards/card_${card.color}_${card.value}.svg`;
    };

    return (
        <div className="deck-area">
            <img
                src={getCardImage(topCard)}
                alt="Deck"
                className="card"
                onClick={onDrawDeck}
            />
            <img
                src={getCardImage(discardPile)}
                alt="Ablagestapel"
                className="card"
                onClick={onDrawDiscard}
            />
        </div>
    );
};

export default Deck;
