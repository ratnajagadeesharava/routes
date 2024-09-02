import React, {memo, Suspense, useState } from 'react';
import RouteCard from '../components/Route/RouteCard';
import { useNavigate } from 'react-router-dom';
import useRoutes from '../hooks/useRoutes';
import Modal from '../components/common/ui/Modal';
import useExport from '../hooks/useExport';
// TODO:add pagination
function RouteMapView() {
    const MapView = React.lazy(() => import('../components/Map/MapView'));
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { routes, selectedRoute, handleRouteClick } = useRoutes();
    const handleExport = useExport(routes);
    const handleAdd = () => {
        navigate('/create')
    }
    console.log(routes);
    return (
        <div className="flex h-screen bg-gray-900 text-white">
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
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
                    <button className="button text-white bg-teal-500 font-bold py-2 px-4 rounded" onClick={() => setIsOpen(true)}>bulk upload</button>
                    <button className="button text-white bg-teal-500 font-bold py-2 px-4 rounded" onClick={handleExport}>Export</button>
                </div>
            </div>
            <div className="w-2/3 h-100 p-4">
                <div className="bg-gray-800 h-full rounded-3xl relative p-4">
                    <Suspense fallback={<div>Loading...</div>}>
                    {selectedRoute && <MapView route={selectedRoute} />}
                    </Suspense>
                </div>
            </div>
        </div>
    );
};
export default memo(RouteMapView);
