import React, { useState } from 'react';
import { Gameplay } from './game/gameplay';
import { Player } from './game/player';
import { createDeck } from './game/deck';

function App() {
    const [players, setPlayers] = useState<Player[]>([
        { name: 'Spieler 1', hand: [], phaseComplete: false, currentPhaseIndex: 0 },
        { name: 'Spieler 2', hand: [], phaseComplete: false, currentPhaseIndex: 0 }
    ]);

    const [gameplay] = useState(new Gameplay(players, createDeck()));

    // Funktion zum Ziehen einer Karte vom Deck
    const handleDrawFromDeck = () => {
        const currentPlayer = players[0]; // Beispiel: Spieler 1 ist am Zug
        gameplay.drawCardFromDeck(currentPlayer);
        setPlayers([...players]); // Spielerhand aktualisieren
    };

    // Funktion zum Ziehen einer Karte vom Ablagestapel
    const handleDrawFromDiscard = () => {
        const currentPlayer = players[0]; // Beispiel: Spieler 1 ist am Zug
        gameplay.drawCardFromDiscardPile(currentPlayer);
        setPlayers([...players]); // Spielerhand aktualisieren
    };

    // Funktion, um den Pfad zu den Kartenbildern zu generieren
    const getCardImage = (color: string | null, value: number | null) => {
        if (color && value) {
            return `/assets/cards/card_${color}_${value}.svg`; // Generiere den Pfad zum Kartenbild
        } else if (!color && !value) {
            return `/assets/cards/card_wild.svg`; // Beispiel für Joker
        }
        return `/assets/cards/card_back.svg`; // Rückseite für ungültige Karten
    };

    return (
        <div className="App">
            <h1>Phase 10 Game</h1>
            <button onClick={handleDrawFromDeck}>Karte vom Deck ziehen</button>
            <button onClick={handleDrawFromDiscard}>Karte vom Ablagestapel ziehen</button>

            <div>
                <h2>Hand von {players[0].name}</h2>
                <div className="hand">
                    {players[0].hand.map((card, index) => (
                        <img
                            key={index}
                            src={getCardImage(card.color, card.value)}
                            alt={`Karte ${card.color} ${card.value}`}
                            className="card-image"
                            style={{ width: '100px', height: '150px', margin: '5px' }} // Optionales Styling
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
