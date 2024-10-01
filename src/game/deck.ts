import { Card } from './card';

// Funktion zum Erstellen eines Kartendecks
export function createDeck(): Card[] {
    const deck: Card[] = [];
    const colors = ['red', 'blue', 'green', 'yellow'];
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    colors.forEach(color => {
        values.forEach(value => {
            deck.push({ value, color, type: 'number' });
        });
    });

    // Joker und Skip-Karten hinzufügen
    deck.push({ value: null, color: null, type: 'wild' });
    deck.push({ value: null, color: null, type: 'skip' });

    return deck;
}

// Funktion zum Mischen des Decks
export function shuffleDeck(deck: Card[]): Card[] {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}
