import React, {useEffect, useRef, useState} from "react";
import './CityMap.css';
import { Link }  from 'react-router-dom';
import Navbar from "../components/Navbar";

export default function CityMap() {
    const iframeRef = useRef(null);
    const [loaded, setloaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setloaded(true), 100)
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        iframe.onload = () => {
            try {
                const iframeWindow = iframe.contentWindow;
                const mapCanvas = iframeWindow.document.querySelector('canvas');

                if (mapCanvas) {
                    mapCanvas.style.pointerEvents = 'none';
                    mapCanvas.style.transform = 'scale(1.6)';
                    mapCanvas.style.transformOrigin = 'center center';
                }
            } catch (e) {
                console.warn('Не удалось зафиксировать карту (ограничения iframe): ', e);
            }
        }
    }, []);

    return (
        <div className={`citymap-page ${loaded ? "loaded" : ""}`}>
        <Navbar />
        <iframe
            ref={iframeRef}
            src='/map/map.html'
            title='Карта Города'
            className='map-iframe'
        />.
        </div>
  );
}