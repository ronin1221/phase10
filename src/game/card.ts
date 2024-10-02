export enum CardColor {
    Red = 'red',
    Blue = 'blue',
    Green = 'green',
    Yellow = 'yellow',
}

export enum CardType {
    Number = 'number',
    Wild = 'wild',
    Skip = 'skip',
}

export interface Card {
    value: number | null;
    color: CardColor | null;
    type: CardType;
}
