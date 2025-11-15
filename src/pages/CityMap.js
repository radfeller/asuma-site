// src/pages/CityMap.js
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "../components/Navbar";
import "./CityMap.css";

export default function CityMap() {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);

    useEffect(() => {
        const container = mapContainerRef.current;
        if (!container || mapRef.current) return;

        const img = new Image();
        img.src = "/map/map.png";

        img.onload = () => {
            const imageWidth = img.width;   // 697
            const imageHeight = img.height; // 725

            const map = L.map(container, {
                crs: L.CRS.Simple,
                zoomControl: false,
                scrollWheelZoom: true,
                doubleClickZoom: true,
                dragging: true,
                minZoom: 0,
                maxZoom: 5,
            });

            mapRef.current = map;

            const bounds = [
                [0, 0],
                [imageHeight, imageWidth]
            ];

            L.imageOverlay("/map/map.png", bounds).addTo(map);

            map.setMaxBounds(bounds);
            map.options.maxBoundsViscosity = 1.0;

            const center = [imageHeight / 2, imageWidth / 2];
            const initialZoom = map.getBoundsZoom(bounds); // максимум, чтобы влезла

            map.fitBounds(bounds);
            map.setView(center, initialZoom);

            map.options.minZoom = initialZoom + 2;
            map.options.maxZoom = initialZoom + 3;

            const resizeObserver = new ResizeObserver(() => {
                map.invalidateSize();
                const newZoom = map.getBoundsZoom(bounds);
                map.setView(center, newZoom);
            });
            resizeObserver.observe(container);

            return () => {
                resizeObserver.disconnect();
                map.remove();
            };
        };
    }, []);

    return (
        <div className="citymap-page">
            <Navbar />
            <div ref={mapContainerRef} className="map-container" />
        </div>
    );
}