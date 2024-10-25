import dynamic from "next/dynamic"

export const Map = dynamic(() => import('./Map'), { ssr: false });
export const MapModal = dynamic(() => import('./MapModal'), { ssr: false });
export const RouteMapModal = dynamic(() => import('./RouteMapModal'), { ssr: false });