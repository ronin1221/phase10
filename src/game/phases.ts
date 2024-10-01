import {Card} from './card';
import {checkSets, checkSequence, checkSameColor} from './deck';

export interface Phase {
    description: string;
    requirement: (hand: Card[]) => boolean;
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
