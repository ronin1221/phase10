import {Card, CardColor, CardType} from './card';



export function createDeck(): Card[] {
    const deck: Card[] = [];

    for (let color in CardColor) {
        for (let i = 1; i <= 12; i++) {
            // @ts-ignore
            deck.push({value: i, type: CardType.Number, color: CardColor[color as keyof CardColor]});
        }
    }
    for (let i = 0; i < 4; i++) {
        deck.push({value: null, type: CardType.Wild, color: null});
    }
    for (let color in CardColor) {
        deck.push({value: null, type: CardType.Skip, color: CardColor[color as keyof typeof CardColor]});
    }

    return deck;
}

export function shuffleDeck(deck: Card[]): Card[] {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}