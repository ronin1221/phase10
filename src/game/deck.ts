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

// Überprüft, ob der Spieler eine bestimmte Anzahl von Sets hat
export function checkSets(hand: Card[], setSize: number, count: number): boolean {
    const cardCounts = new Map<number, number>();

    hand.forEach(card => {
        if (card.value !== null) {
            cardCounts.set(card.value, (cardCounts.get(card.value) || 0) + 1);
        }
    });

    let setsFound = 0;
    cardCounts.forEach(count => {
        if (count >= setSize) {
            setsFound++;
        }
    });

    return setsFound >= count;
}

// Überprüft, ob der Spieler eine Folge von Karten hat
export function checkSequence(hand: Card[], requiredLength: number): boolean {
    const uniqueValues = Array.from(new Set(hand.map(card => card.value).filter(value => value !== null))).sort((a, b) => (a as number) - (b as number));

    let maxSequenceLength = 1;
    let currentSequenceLength = 1;

    for (let i = 1; i < uniqueValues.length; i++) {
        if ((uniqueValues[i] as number) === (uniqueValues[i - 1] as number) + 1) {
            currentSequenceLength++;
        } else {
            currentSequenceLength = 1;
        }

        if (currentSequenceLength > maxSequenceLength) {
            maxSequenceLength = currentSequenceLength;
        }
    }

    return maxSequenceLength >= requiredLength;
}

// Überprüft, ob der Spieler Karten von einer bestimmten Farbe hat
export function checkSameColor(hand: Card[], requiredCount: number): boolean {
    const colorCounts = new Map<string, number>();

    hand.forEach(card => {
        if (card.color) {
            colorCounts.set(card.color, (colorCounts.get(card.color) || 0) + 1);
        }
    });

    let found = false;
    colorCounts.forEach(count => {
        if (count >= requiredCount) {
            found = true;
        }
    });

    return found;
}
