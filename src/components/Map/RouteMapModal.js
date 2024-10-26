import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import axios from 'axios';

const RouteMapModal = ({ origin, destination, onClose, title }) => {
    const [route, setRoute] = useState(null);

    // Fetch the route when the component mounts or when origin/destination change
    useEffect(() => {
        const fetchRoute = async () => {
            console.log(origin, destination);
            if (origin && destination) {
                try {
                    const response = await axios.get(
                        `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`
                    );
                    const routeCoords = response.data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
                    console.log(routeCoords);
                    setRoute(routeCoords); // Update the route with coordinates
                } catch (error) {
                    console.error("Error fetching route", error);
                }
            }
        };

        fetchRoute();
    }, [origin, destination]);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000 }}>
            <div style={{ position: 'relative', margin: '50px auto', width: '100%', height: '100%', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
                <h2 className="text-center text-lg font-semibold m-4">{title}</h2>
                <MapContainer
                    center={origin ? [origin.lat, origin.lng] : [22.5744, 88.3629]}
                    zoom={12}
                    style={{ height: "70%", width: "100%" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    {/* Markers for origin and destination */}
                    {origin && <Marker position={[origin.lat, origin.lng]} />}
                    {destination && <Marker position={[destination.lat, destination.lng]} />}
                    {/* Polyline for the route */}
                    {route && <Polyline positions={route} color="blue" />}
                </MapContainer>
                <div className='mt-3 flex justify-center'>
                    <button className="bg-blue-500 text-white p-2 px-4 rounded-lg" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default RouteMapModal;
