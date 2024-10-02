import React from 'react';
import { useDrop } from 'react-dnd';
import { Card } from '@/game/card';

const ItemTypes = {
    CARD: 'card',
};

interface DiscardPileProps {
    onDrop: (card: Card) => void;
}

export const DiscardPile: React.FC<DiscardPileProps> = ({ onDrop }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.CARD,
        drop: (item: { card: Card }) => {
            onDrop(item.card); // Beim Ablegen der Karte auf den Ablagestapel
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop as unknown as React.LegacyRef<HTMLDivElement>} // Fix für das ref-Problem
            style={{
                height: '200px',
                width: '150px',
                border: '2px dashed gray',
                backgroundColor: isOver ? 'lightgreen' : 'white',
            }}
        >
            <p>Ablagestapel</p>
        </div>
    );
};
