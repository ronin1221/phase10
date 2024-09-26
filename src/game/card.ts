export enum CardColor {
    Red = 'red',
    Yellow = 'yellow',
    Blue = 'blue',
    Green = 'green'
}

export enum CardType {
    Number = 'number',
    Skip = 'skip',
    Wild = 'wild'
}

export interface Card {
    value: number | null;
    type: CardType;
    color: CardColor | null;
}
