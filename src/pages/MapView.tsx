import { AdvancedMarker, APIProvider, Map, Pin, useMap, useMapsLibrary } from '@vis.gl/react-google-maps'
import React, { useEffect } from 'react'
function MapView() {
    let position = { lat: 16.5775, lng: 82.1031 };
    return (
        <div className=" text-white">
            {process.env.MAP_ID}
            <React.Fragment>
                <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}>
                    <Map
                        style={{ width: "600px", height: "600px", margin: "auto" }}
                        mapId={process.env.MAP_ID || "b4f82fc7d1896a73"}
                        defaultCenter={position}
                        defaultZoom={12}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                    >
                        {/* <AdvancedMarker position={position} /> */}
                        <AdvancedMarker position={position}  >
                        
                        </AdvancedMarker>
                       <Directions/>
                    </Map>
                </APIProvider>
            </React.Fragment>
        </div>
    )
}

function Directions() {
    const map = useMap();
    const routesLibrary = useMapsLibrary("routes");
    // direstionsService to get directions between origin and destination
    const [direstionsService,setDirestionsService] = React.useState<google.maps.DirectionsService>();
    const [directionsRenderer,setDirectionsRenderer] = React.useState<google.maps.DirectionsRenderer>();
    useEffect(()=>{
        if(!map || !routesLibrary) return;
        setDirestionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({map}));
    },[map,routesLibrary]);
    useEffect(()=>{
        if(!direstionsService || !directionsRenderer) return;
        direstionsService.route({
            origin: {lat:16.5775,lng:82.1031},
            destination: {lat:17.385044,lng:78.486671},
            waypoints: [
                {
                    location: {lat:16.508586,lng:80.614596},
                    stopover: true
                },
                {
                    location:{lat:16.678059984033368,lng:81.02370874262965},
                    stopover: true
                },
                {
                    location:{lat:16.306652,lng:80.436539},
                    stopover: true
                },{
                    // 16.960780661479365, 80.0153526399152
                    location:{lat:16.960780661479365,lng:80.0153526399152},
                    stopover: true
                },
                //16.678059984033368, 81.02370874262965
            ],
            travelMode: google.maps.TravelMode.DRIVING,
        }).then((response)=>{
            directionsRenderer.setDirections(response);
        }).catch((error)=>{
            console.log(error);
        })
    })
    return (
        <div>
            
        </div>
    )
}
export default MapView