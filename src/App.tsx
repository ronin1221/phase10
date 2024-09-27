import React, { useState } from 'react';
import { createDeck, shuffleDeck } from './game/deck';
import { phases } from './game/phases';
import Hand from './components/Hand';
import Deck from './components/Deck';
import PhaseDisplay from './components/PhaseDisplay';
import GameControls from './components/GameControls';
import { Card } from './game/card';

function App() {
    const [deck, setDeck] = useState(shuffleDeck(createDeck()));
    const [playerHand, setPlayerHand] = useState<Card[]>(deck.splice(0, 10)); // 10 Karten
    const [topCard, setTopCard] = useState<Card | null>(deck.pop() || null);
    const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0); // Startphase

    // Karte ziehen
    const drawCard = () => {
        if (deck.length > 0) {
            const newCard = deck.pop();
            if (newCard) {
                setPlayerHand([...playerHand, newCard]);
                setTopCard(newCard);
            }
        }
    };

    // Karte ablegen
    const playCard = (cardToPlay: Card) => {
        // Karte aus der Hand entfernen
        setPlayerHand(playerHand.filter(card => card !== cardToPlay));

        // Auf den Ablagestapel legen
        setTopCard(cardToPlay);

        // Überprüfen, ob die aktuelle Phase erfüllt ist
        if (phases[currentPhaseIndex].requirement(playerHand)) {
            alert("Phase abgeschlossen!");
            // Zur nächsten Phase wechseln
            setCurrentPhaseIndex(prevIndex => Math.min(prevIndex + 1, phases.length - 1));
        } else {
            alert("Phase noch nicht abgeschlossen!");
        }
    };

    return (
        <div className="App">
            <h1>Phase 10 Game</h1>
            <PhaseDisplay currentPhase={phases[currentPhaseIndex].description} />
            <Deck topCard={topCard} />
            <Hand cards={playerHand} onCardClick={playCard} />
            <GameControls onDraw={drawCard} onPlay={() => { /* Hier keine Karte übergeben */ }} />
        </div>
    );
}

export default App;
