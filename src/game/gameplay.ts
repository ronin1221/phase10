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
        if (this.deck.length > 0 && player.hand.length < 11) { // Maximal 11 Karten
            const newCard = this.deck.pop();
            if (newCard) {
                player.hand.push(newCard);
                console.log(`${player.name} hat eine Karte vom Deck gezogen.`);
            }
        } else {
            console.log("Das Deck ist leer oder der Spieler hat bereits 11 Karten.");
        }
    }

    // Karte vom Ablagestapel ziehen
    drawCardFromDiscardPile(player: Player): void {
        if (this.discardPile.length > 0 && player.hand.length < 11) { // Maximal 11 Karten
            const newCard = this.discardPile.pop();
            if (newCard) {
                player.hand.push(newCard);
                console.log(`${player.name} hat eine Karte vom Ablagestapel gezogen.`);
            }
        } else {
            console.log("Der Ablagestapel ist leer oder der Spieler hat bereits 11 Karten.");
        }
    }

    // Karte ablegen, um auf 10 Karten zu kommen
    discardCard(player: Player, card: Card): void {
        if (player.hand.length === 11) { // Der Spieler muss 11 Karten haben, um eine abzulegen
            player.hand = player.hand.filter(c => c !== card);
            this.discardPile.push(card);
            console.log(`${player.name} hat eine Karte abgelegt.`);
        } else {
            console.log("Der Spieler muss 11 Karten haben, um eine ablegen zu können.");
        }
    }

    // Zug beenden
    endTurn(player: Player): void {
        if (player.hand.length === 10) {
            console.log(`${player.name} hat seinen Zug beendet.`);
            // Logik zum Wechseln des Spielers etc.
        } else {
            console.log("Der Spieler muss 10 Karten haben, um den Zug zu beenden.");
        }
    }
}
