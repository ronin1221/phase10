import React from 'react';
import { useDrag } from 'react-dnd';
import { Card } from '@/game/card';

const ItemTypes = {
    CARD: 'card',
};

interface CardItemProps {
    card: Card;
    onDrop: (card: Card) => void;
}

export const CardItem: React.FC<CardItemProps> = ({ card, onDrop }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: { card },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (dropResult) {
                onDrop(item.card);
            }
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const getCardImage = (color: string | null, value: number | null) => {
        if (color && value) {
            return `/assets/cards/card_${color}_${value}.svg`;
        } else if (!color && !value) {
            return `/assets/cards/card_wild.svg`; // Beispiel für Joker
        }
        return `/assets/cards/card_back.svg`; // Rückseite für ungültige Karten
    };

    return (
        <img
            ref={drag as unknown as React.LegacyRef<HTMLImageElement>} // Fix für das ref-Problem
            src={getCardImage(card.color, card.value)}
            alt={`Karte ${card.color} ${card.value}`}
            className="card-image"
            style={{
                width: '100px',
                height: '150px',
                opacity: isDragging ? 0.5 : 1,
                margin: '5px',
            }}
        />
    );
};
