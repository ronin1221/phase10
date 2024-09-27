import React from 'react';

interface GameControlsProps {
    onDraw: () => void;
    onPlay: () => void; // Korrigiere hier den Typ, damit onPlay keine Argumente erwartet
}

const GameControls: React.FC<GameControlsProps> = ({ onDraw, onPlay }) => {
    return (
        <div className="game-controls">
            <button onClick={onDraw}>Karte ziehen</button>
            <button onClick={onPlay}>Karte ablegen</button> {/* Keine Karte hier als Argument */}
        </div>
    );
};

export default GameControls;
