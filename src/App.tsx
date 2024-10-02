import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Gameplay } from './game/gameplay';
import { Player } from './game/player';
import { createDeck } from './game/deck';
import { Card } from './game/card';
import { CardItem } from '@/components/CardItem';
import { DiscardPile } from '@/components/DiscardPile';
import { Deck } from '@/components/Deck'; // Benannter Import der Deck-Komponente

function App() {
    const [players, setPlayers] = useState<Player[]>([
        { name: 'Spieler 1', hand: [], phaseComplete: false, currentPhaseIndex: 0 },
        { name: 'Spieler 2', hand: [], phaseComplete: false, currentPhaseIndex: 0 }
    ]);

    const [gameplay] = useState(new Gameplay(players, createDeck()));

    // Füge den State für topCard und discardPile hinzu
    const [topCard, setTopCard] = useState<Card | null>(null); // Oberste Karte des Decks
    const [discardPile, setDiscardPile] = useState<Card | null>(null); // Oberste Karte des Ablagestapels

    // Funktion zum Ziehen einer Karte vom Deck
    const handleDrawFromDeck = () => {
        const currentPlayer = players[0];
        const drawnCard = gameplay.drawCardFromDeck(currentPlayer);
        setTopCard(drawnCard); // Aktualisiere die oberste Karte
        setPlayers([...players]); // Spielerhand aktualisieren
    };

    // Funktion zum Ziehen einer Karte vom Ablagestapel
    const handleDrawFromDiscard = () => {
        const currentPlayer = players[0];
        const drawnCard = gameplay.drawCardFromDiscardPile(currentPlayer);
        setDiscardPile(drawnCard); // Aktualisiere die oberste Karte des Ablagestapels
        setPlayers([...players]); // Spielerhand aktualisieren
    };

    // Funktion zum Ablegen einer Karte
    const handleDiscardCard = (card: Card) => {
        const currentPlayer = players[0];
        gameplay.discardCard(currentPlayer, card);
        setDiscardPile(card); // Lege die abgelegte Karte auf den Ablagestapel
        setPlayers([...players]); // Spielerhand aktualisieren
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="App">
                <h1>Phase 10 Game</h1>

                <div className="game-area">
                    <Deck
                        topCard={topCard} // Definiere, was die oberste Karte des Decks ist
                        discardPile={discardPile} // Definiere, was im Ablagestapel ist
                        onDrawDeck={handleDrawFromDeck} // Funktion zum Ziehen einer Karte vom Deck
                        onDrawDiscard={handleDrawFromDiscard} // Funktion zum Ziehen einer Karte vom Ablagestapel
                    />
                </div>

                <div>
                    <h2>Hand von {players[0].name}</h2>
                    <div className="hand">
                        {players[0].hand.map((card, index) => (
                            <CardItem key={index} card={card} onDrop={handleDiscardCard} />
                        ))}
                    </div>
                </div>
            </div>
        </DndProvider>
    );
}

export default App;
