import React, {useState} from 'react';
import {createDeck, shuffleDeck} from '/game/deck';

function App() {
    const [deck, setDeck] = useState(shuffleDeck(createDeck()));

    return (
        <div>
            <h1> Phase10 </h1>
            <h1> Platzhalter</h1>
        </div>
    );
}

export default App;