import { useSelector } from "react-redux"
import Route from "../components/common/models/Route";
import { useCallback, useEffect, useState } from "react";
import { RootState } from "../store/store";

const useRoutes = ()=>{
    const {routes} = useSelector(((state:RootState)=>state.routes));
    const [selectedRoute,setSelectedRoute] = useState<Route | null>(null);
    useEffect(()=>{
        if(routes.length > 0 && !selectedRoute){
            setSelectedRoute(routes[0])
        }
    },[routes,selectedRoute]);
    const handleRouteClick = useCallback((route:Route)=>{
        setSelectedRoute(route);
    },[])
    
    return {
        routes,
        selectedRoute,
        handleRouteClick
    }
    
};

export default useRoutes;