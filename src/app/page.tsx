'use client'; // Dies macht die Seite zu einer Client-Komponente

import React from 'react';
import App from '../App'; // Importiere dein Spiel

const HomePage: React.FC = () => {
    return (
        <div>
            <App /> {/* Das Phase10-Spiel hier rendern */}
        </div>
    );
};

export default HomePage;
