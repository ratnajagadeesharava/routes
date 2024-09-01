import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps'
import React, { useEffect } from 'react'
import { Position } from '../common/models/Maps.Model';
import Route from '../common/models/Route';
import { sampleRoutes } from '../../Data/sampleRoutes';
import Directions from './Directions';


type MapViewProps = {
    route: Route;
}
function MapView({ route }: MapViewProps) {
    const mapId = process.env.REACT_APP_MAP_ID || "b4f82fc7d1896a73";  
    return (


        <div className="text-white">
            {/* {routes1[0].name} */}

            <React.Fragment
                
            >
                
                <Map
                    style={{
                        width: "60vw",
                        height: "88vh",
                        margin: "auto"
                    }}
                    
                    mapId={mapId}
                    defaultCenter={{ lat: parseFloat(route.stops[0].latitude), lng: parseFloat(route.stops[0].longitude) }}
                    defaultZoom={9}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                />
                {/* <AdvancedMarker position={position} /> */}
                <Directions route={route} />

            </React.Fragment>
        </div>

    )
}

export default MapView