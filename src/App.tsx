import React, { useState } from 'react';
import { createDeck, shuffleDeck } from './game/deck';
import { phases } from './game/phases';
import Hand from './components/Hand';
import Deck from './components/Deck';
import PhaseDisplay from './components/PhaseDisplay';
import GameControls from './components/GameControls';
import { Card } from './game/card';
import { Player } from './game/player';

function App() {
    const [deck, setDeck] = useState(shuffleDeck(createDeck()));
    const [discardPile, setDiscardPile] = useState<Card[]>([]); // Ablagestapel
    const [players, setPlayers] = useState<Player[]>([
        { name: 'Spieler 1', hand: deck.splice(0, 10), phaseComplete: false, currentPhaseIndex: 0 },
        { name: 'Spieler 2', hand: deck.splice(0, 10), phaseComplete: false, currentPhaseIndex: 0 }
    ]);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0); // Aktueller Spieler

    const currentPlayer = players[currentPlayerIndex];

    // Karte vom Deck ziehen
    const drawCardFromDeck = () => {
        if (deck.length > 0) {
            const newCard = deck.pop();
            if (newCard) {
                currentPlayer.hand.push(newCard);
                setDeck([...deck]); // Deck aktualisieren
                setPlayers([...players]); // Spielerhand aktualisieren
            }
        }
    };

    // Karte vom Ablagestapel ziehen
    const drawCardFromDiscardPile = () => {
        if (discardPile.length > 0) {
            const newCard = discardPile.shift();
            if (newCard) {
                currentPlayer.hand.push(newCard);
                setDiscardPile([...discardPile]); // Ablagestapel aktualisieren
                setPlayers([...players]); // Spielerhand aktualisieren
            }
        }
    };

    // Karte ablegen und Zug beenden
    const discardCard = (cardToPlay: Card) => {
        currentPlayer.hand = currentPlayer.hand.filter(card => card !== cardToPlay);
        setDiscardPile([cardToPlay, ...discardPile]); // Ablagestapel aktualisieren
        setPlayers([...players]); // Spielerhand aktualisieren
        endTurn(); // Zug beenden
    };

    // Phase überprüfen und abschließen
    const checkAndCompletePhase = () => {
        if (phases[currentPlayer.currentPhaseIndex].requirement(currentPlayer.hand)) {
            alert(`${currentPlayer.name} hat die Phase abgeschlossen!`);
            currentPlayer.phaseComplete = true;
            currentPlayer.currentPhaseIndex++;
            setPlayers([...players]); // Spielerphase aktualisieren
        } else {
            alert(`${currentPlayer.name} hat die Phase noch nicht abgeschlossen.`);
        }
    };

    // Zug beenden und zum nächsten Spieler wechseln
    const endTurn = () => {
        setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length); // Zyklisch durch die Spieler wechseln
    };

    return (
        <div className="App">
            <h1>Phase 10 Game</h1>
            <PhaseDisplay currentPhase={phases[currentPlayer.currentPhaseIndex].description} />
            <Deck topCard={deck[deck.length - 1]} discardPile={discardPile[0]} onDrawDeck={drawCardFromDeck} onDrawDiscard={drawCardFromDiscardPile} />
            <Hand cards={currentPlayer.hand} onCardClick={discardCard} />
            <GameControls onDrawDeck={drawCardFromDeck} onDrawDiscard={drawCardFromDiscardPile} onCompletePhase={checkAndCompletePhase} />
        </div>
    );
}

export default App;
