import { Card } from './card';

export interface Player {
    name: string;
    hand: Card[];
    phaseComplete: boolean;
    currentPhaseIndex: number;
}
