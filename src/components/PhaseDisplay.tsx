import React from "react";

interface PhaseDisplayProps {
    currentPhase: string;
}

const PhaseDisplay: React.FC<PhaseDisplayProps> = ({currentPhase}) => {
    return (
        <div className="phase-display">
            <h2>Aktuelle Phase</h2>
            <p>{currentPhase}</p>
        </div>
    );
};

export default PhaseDisplay;