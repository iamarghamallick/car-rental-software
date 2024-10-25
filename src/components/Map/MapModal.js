import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import 'leaflet-control-geocoder';

const MapModal = ({ onSelectLocation, title, onClose }) => {
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [locationName, setLocationName] = useState('');

    // Fetch location name based on latitude and longitude
    const fetchLocationName = async (lat, lon) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
            const data = await response.json();
            setLocationName(data.display_name || 'Unknown location'); // Set the fetched location name
        } catch (error) {
            console.error("Error fetching location name:", error);
            setLocationName('Unable to retrieve location');
        }
    };

    const reverseGeocode = async (lat, lng) => {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
        const data = await response.json();
        return data.display_name;
    };

    // Marker component to capture user click events on the map
    const LocationMarker = () => {
        useMapEvents({
            click: async (e) => {
                fetchLocationName(e.latlng.lat, e.latlng.lng);
                const placeName = await reverseGeocode(e.latlng.lat, e.latlng.lng); // Fetch location name for the selected position
                setSelectedPosition({ latlng: e.latlng, name: placeName }); // Set the clicked location as selected position
            },
        });

        return selectedPosition === null ? null : (
            <Marker position={selectedPosition.latlng}></Marker>
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
            const { x: lon, y: lat } = result.location;
            setSelectedPosition(result.location); // Update the selected position based on search result
            fetchLocationName(lat, lon); // Fetch location name for the search result
        });
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000 }}>
            <div style={{ position: 'relative', margin: '50px auto', width: '80%', height: '80%', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
                <h2 className="text-center text-lg font-semibold m-4">{title}</h2>
                {locationName && <p className="text-center text-gray-600">Selected Location: {locationName}</p>}
                <MapContainer
                    center={[22.5744, 88.3629]}
                    zoom={3}
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
                    <button className="bg-blue-500 text-white p-2 px-4 rounded-lg" onClick={() => onSelectLocation(selectedPosition, locationName)}>Confirm Location</button>
                    <button className="bg-blue-500 text-white p-2 px-4 rounded-lg" onClick={onClose} style={{ marginLeft: '10px' }}>Close</button>
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
