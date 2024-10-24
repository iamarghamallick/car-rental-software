import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import 'leaflet-control-geocoder';

const MapModal = ({ onSelectLocation, title, onClose }) => {
    const [selectedPosition, setSelectedPosition] = useState(null);

    // Marker component to capture user click events on the map
    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setSelectedPosition(e.latlng); // Set the clicked location as selected position
            },
        });

        return selectedPosition === null ? null : (
            <Marker position={selectedPosition}></Marker>
        );
    };

    // Add the search control to the map when it's created
    const addSearchControl = (map) => {
        const provider = new OpenStreetMapProvider();
        const searchControl = new GeoSearchControl({
            provider,
            style: 'bar',
            showMarker: false,
            retainZoomLevel: false,
            autoClose: true,
        });

        // Add the search control to the map
        map.addControl(searchControl);

        // Listen to search results and update the marker position
        map.on('geosearch/showlocation', (result) => {
            setSelectedPosition(result.location); // Update the selected position based on search result
        });
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000 }}>
            <div style={{ position: 'relative', margin: '50px auto', width: '80%', height: '80%', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
                <h2>{title}</h2>
                <MapContainer
                    center={[22.2, 87.3]}
                    zoom={13}
                    style={{ height: "70%", width: "100%" }}
                    whenCreated={addSearchControl} // This adds the search control when the map is created
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    <SearchControl />
                    <LocationMarker />
                </MapContainer>
                <div style={{ marginTop: '10px' }}>
                    <button onClick={() => onSelectLocation(selectedPosition)}>Confirm Location</button>
                    <button onClick={onClose} style={{ marginLeft: '10px' }}>Close</button>
                </div>
            </div>
        </div>
    );
};

const SearchControl = () => {
    const map = useMap();

    useEffect(() => {
        const control = L.Control.geocoder({
            defaultMarkGeocode: true,
            placeholder: 'Search for a location',
        }).addTo(map);

        return () => {
            map.removeControl(control);
        };
    }, [map]);

    return null;
};

export default MapModal;
