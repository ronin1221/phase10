import {Card} from './card';

export interface Phase {
    description: string;
    requirement: (hand: Card[]) => boolean;
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
    cardCounts.forEach(cardCount => {
        if (cardCount >= setSize) {
            setsFound++;
        }
    });

    return setsFound >= count;
}

// Überprüft, ob der Spieler eine Folge von Karten hat
export function checkSequence(hand: Card[], requiredLength: number): boolean {
    const uniqueValues = Array.from(new Set(hand.map(card => card.value).filter(value => value !== null)))
        .sort((a, b) => (a as number) - (b as number));

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


export const phases: Phase[] = [
    {
        description: "2 Drillinge",
        requirement: (hand) => checkSets(hand, 3, 2)
    },
    {
        description: "1 Drilling + 1 Viererfolge",
        requirement: (hand) => checkSets(hand, 3, 1) && checkSequence(hand, 4)
    },
    {
        description: "1 Vierling + 1 Viererfolge",
        requirement: (hand) => checkSets(hand, 4, 1) && checkSequence(hand, 4)
    },
    {
        description: "1 Siebenerfolge",
        requirement: (hand) => checkSequence(hand, 7)
    },
    {
        description: "1 Achterfolge",
        requirement: (hand) => checkSequence(hand, 8)
    },
    {
        description: "1 Neunerfolge",
        requirement: (hand) => checkSequence(hand, 9)
    },
    {
        description: "2 Vierlinge",
        requirement: (hand) => checkSets(hand, 4, 2)
    },
    {
        description: "7 Karten einer Farbe",
        requirement: (hand) => checkSameColor(hand, 7)
    },
    {
        description: "1 Fünfling + 1 Zwilling",
        requirement: (hand) => checkSets(hand, 5, 1) && checkSets(hand, 2, 1)
    },
    {
        description: "1 Fünfling + 1 Drilling",
        requirement: (hand) => checkSets(hand, 5, 1) && checkSets(hand, 3, 1)
    }
];
