import {Card, CardColor} from "@/game/card";

function checkSameColor(hand: Card[], requiredCount: number): boolean {
    const colorCounts = new Map<CardColor, number>();

    hand.forEach(card => {
        if (card.color) {
            colorCounts.set(card.color, (colorCounts.get(card.color) || 0) + 1);
        }
    });

    let colorsFound = 0;
    colorCounts.forEach(count => {
        if (count >= requiredCount) {
            colorsFound++;
        }
    });

    return colorsFound > 0; // Mindestens eine Farbe hat genügend Karten
}
