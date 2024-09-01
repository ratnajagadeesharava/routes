import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps'
import React, { useEffect, useRef } from 'react'
import { Position } from '../common/models/Maps.Model';
import Route from '../common/models/Route';
interface DirectionProps {
    origin: google.maps.LatLngLiteral;
    destination: google.maps.LatLngLiteral;
    waypoints: google.maps.DirectionsWaypoint[];
}
interface Waypoint {
    stopover: boolean;
    location: Position;
}

function Directions({ route }: { route: Route }) {

    const origin: Position = { lat: parseFloat(route.stops[0].latitude), lng: parseFloat(route.stops[0].longitude) };
    const destination: Position = { lat: parseFloat(route.stops[route.stops.length - 1].latitude), lng: parseFloat(route.stops[route.stops.length - 1].longitude) };

    const waypoints: Waypoint[] = route.stops.slice(1, route.stops.length - 1).map(stop => {
        return { location: { lat: parseFloat(stop.latitude), lng: parseFloat(stop.longitude) }, stopover: true };
    }); 
    const map = useMap();
    const routesLibrary = useMapsLibrary("routes");
    const [directionService, setDirectionService] = React.useState<google.maps.DirectionsService>();
    const [directionsRenderer, setDirectionsRenderer] = React.useState<google.maps.DirectionsRenderer>();

    // const markerRefs = useRef<google.maps.Marker[]>([]);

    useEffect(() => {
        if (!map || !routesLibrary) return;
        setDirectionService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(
            new routesLibrary.DirectionsRenderer({ map, suppressMarkers: false })
        );
    }, [map, routesLibrary]);

    useEffect(() => {
        if (!directionService || !directionsRenderer) return;
        directionService.route({
            origin: origin,
            destination: destination,
            waypoints: [
                ...waypoints
            ],
            travelMode: google.maps.TravelMode.DRIVING,
        }).then(
            res => {
                directionsRenderer.setDirections(res);
                const direction = res.routes[0].legs[0];
                const originMarker = new google.maps.Marker({
                    position: direction.start_location,
                    map: map,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 1,
                        fillColor: "#4285f4",
                        fillOpacity: 1,
                        strokeColor: "#FFFFFF",
                        strokeWeight: 1,
                    }
                });
                const destinationMarker = new google.maps.Marker(
                    {
                        position: direction.end_location,
                        map: map,

                        icon: {
                            path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW,
                            scale: 7,
                            fillColor: "#4285f4",
                            fillOpacity: 1,
                            strokeColor: "#FFFFFF",
                            strokeWeight: 1,
                        }
                    }
                );
                // markerRefs.current.push(originMarker);
                // markerRefs.current.push(destinationMarker);

            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }, [directionService, directionsRenderer, route])
    return (
        <div></div>
    )
}

export default Directions