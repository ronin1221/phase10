import React from 'react';
import { Card } from '@/game/card';

interface DeckProps {
    topCard: Card | null;
    discardPile: Card | null;
    onDrawDeck: () => void;
    onDrawDiscard: () => void;
}

export const Deck: React.FC<DeckProps> = ({ topCard, discardPile, onDrawDeck, onDrawDiscard }) => {
    return (
        <div className="deck-area">
            <div onClick={onDrawDeck} className="deck">
                {/* Zeige die Rückseite des Decks an */}
                <img src="/assets/cards/card_back.svg" alt="Deck" />
            </div>
            <div onClick={onDrawDiscard} className="discard-pile">
                {/* Zeige die oberste Karte des Ablagestapels an */}
                {discardPile ? (
                    <img src={`/assets/cards/card_${discardPile.color}_${discardPile.value}.svg`} alt="Ablagestapel" />
                ) : (
                    <p>Ablagestapel leer</p>
                )}
            </div>
        </div>
    );
};

export default Deck;