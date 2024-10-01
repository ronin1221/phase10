import { Card } from './card';
import { Player } from './player';
import { shuffleDeck } from './deck';

export class Gameplay {
    players: Player[];
    deck: Card[];
    discardPile: Card[];

    constructor(players: Player[], deck: Card[]) {
        this.players = players;
        this.deck = shuffleDeck(deck);
        this.discardPile = [];
    }

    // Karte vom Deck ziehen
    drawCardFromDeck(player: Player): void {
        if (this.deck.length > 0) {
            const newCard = this.deck.pop();
            if (newCard) {
                player.hand.push(newCard);
                console.log(`${player.name} hat eine Karte vom Deck gezogen.`);
            }
        } else {
            console.log("Das Deck ist leer.");
        }
    }

    // Karte vom Ablagestapel ziehen
    drawCardFromDiscardPile(player: Player): void {
        if (this.discardPile.length > 0) {
            const newCard = this.discardPile.pop();
            if (newCard) {
                player.hand.push(newCard);
                console.log(`${player.name} hat eine Karte vom Ablagestapel gezogen.`);
            }
        } else {
            console.log("Der Ablagestapel ist leer.");
        }
    }
}
