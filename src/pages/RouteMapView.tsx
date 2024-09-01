import { useEffect, useState } from 'react';
import MapView from '../components/Map/MapView';
import Route from '../components/common/models/Route';
import { useSelector, useStore } from 'react-redux';
import { RootState } from '../store/store';
import RouteCard from '../components/Route/RouteCard';
import { useNavigate, useParams } from 'react-router-dom';
import Popup from '../components/common/ui/Modal';
import Modal from '../components/common/ui/Modal';
function RouteMapView() {
    const { routes } = useSelector((state: RootState) => state.routes);
    const navigate = useNavigate();
    const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
    const handleRouteClick = (route: Route) => {
        setSelectedRoute(route);
    };
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setSelectedRoute(routes[0])
    }, []);

    const handleAdd = () => {
        navigate('/create')
    }
    const handleExport =()=>{
        const blob = new Blob([JSON.stringify(routes)], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = "routes.json";
        document.body.appendChild(link);
    
        link.click();
        
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    return (
        <div className="flex h-screen bg-gray-900 text-white">
           <Modal isOpen={isOpen} setIsOpen={setIsOpen}  />
            <div className="w-1/3 p-4 pb-20 h-screen flex flex-col justify-between ">
                <div className=''>
                    <h1 className="text-2xl font-bold mb-4">Routes</h1>
                    <div className="space-y-4 cards-container">
                        {routes.map((route) => (
                            <RouteCard
                                key={route.RouteId}
                                route={route}
                                selectedRoute={selectedRoute}
                                handleRouteClick={handleRouteClick}
                            />
                        ))}
                    </div>
                </div>
                <div className="add-buttons flex justify-evenly items-center mt-4">
                    <button className="button text-white bg-teal-500 font-bold py-2 px-4 rounded" onClick={handleAdd}>Add Route</button>
                    <button className="button text-white bg-teal-500 font-bold py-2 px-4 rounded" onClick={()=>setIsOpen(true)}>bulk upload</button>
                    <button className="button text-white bg-teal-500 font-bold py-2 px-4 rounded" onClick={handleExport}>Export</button>
                </div>
            </div>
            <div className="w-2/3 h-100 p-4">
                <div className="bg-gray-800 h-full rounded-3xl relative p-4">
                    {selectedRoute && <MapView route={selectedRoute} />}
                </div>
            </div>
        </div>
    );
};
export default RouteMapView;
