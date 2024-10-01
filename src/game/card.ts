// Definiere Enum für CardType
export enum CardType {
    Number = 'number',
    Skip = 'skip',
    Wild = 'wild',
}

// Definiere Enum für CardColor
export enum CardColor {
    Red = 'red',
    Blue = 'blue',
    Green = 'green',
    Yellow = 'yellow',
}

// Definiere das Card Interface
export interface Card {
    value: number | null;  // Wert der Karte (z.B. 1-12 oder null für spezielle Karten)
    color: CardColor | null; // Farbe der Karte
    type: CardType;  // Typ der Karte (number, skip, wild)
}
