import React, { useState } from 'react';
import dynamic from "next/dynamic";

// Dynamically load the MapModal (no SSR)
const MapModal = dynamic(() => import('./MapModal'), { ssr: false });

const Map = () => {
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [isOriginModalOpen, setIsOriginModalOpen] = useState(false);
    const [isDestinationModalOpen, setIsDestinationModalOpen] = useState(false);

    const handleOriginSelect = (location) => {
        setOrigin(location);
        setIsOriginModalOpen(false);
    };

    const handleDestinationSelect = (location) => {
        setDestination(location);
        setIsDestinationModalOpen(false);
    };

    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <button onClick={() => setIsOriginModalOpen(true)}>Select Origin</button>
                <span>{origin ? ` Origin: [${origin.lat}, ${origin.lng}]` : " No Origin Selected"}</span>
                <br />
                <button onClick={() => setIsDestinationModalOpen(true)}>Select Destination</button>
                <span>{destination ? ` Destination: [${destination.lat}, ${destination.lng}]` : " No Destination Selected"}</span>
            </div>

            {/* Origin Modal */}
            {isOriginModalOpen && (
                <MapModal
                    onSelectLocation={handleOriginSelect}
                    title="Select Origin Location"
                    onClose={() => setIsOriginModalOpen(false)}
                />
            )}

            {/* Destination Modal */}
            {isDestinationModalOpen && (
                <MapModal
                    onSelectLocation={handleDestinationSelect}
                    title="Select Destination Location"
                    onClose={() => setIsDestinationModalOpen(false)}
                />
            )}
        </div>
    );
};

export default Map;
