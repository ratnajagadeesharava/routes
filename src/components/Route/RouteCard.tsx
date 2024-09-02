import  { memo } from 'react'
import Route from '../common/models/Route'
import { useNavigate } from 'react-router-dom';
import { useStore } from 'react-redux';
import { removeFromRoutes } from '../../store/slices/RouteSlice';
function RouteCard({ route, selectedRoute, handleRouteClick }: { route: Route, selectedRoute: Route | null, handleRouteClick: (route: Route) => void }) {
    const store = useStore();
    const navigate = useNavigate();
    const handleEditRoute = () => {
        const routeId = route.RouteId;
        navigate(`edit/${routeId}`);
    }
    const handleDelete = () => {
        store.dispatch(removeFromRoutes(route));
    }
    return (
        <div
            key={route.RouteId}
            className={`bg-gray-800 p-4 rounded cursor-pointer ${selectedRoute?.RouteId === route.RouteId ? 'border-2 border-blue-500' : ''}`}
            onClick={() => handleRouteClick(route)}
        >
            <h2 className="text-xl font-semibold">{route.name}</h2>
            <div className="flex space-x-2 mt-2">
                <span className={`px-2 py-1 rounded text-sm ${route.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {route.status}
                </span>
                <span className="px-2 py-1 rounded bg-gray-700 text-sm">
                    {route.direction}
                </span>
            </div>
            <div className="mt-2">
                <span className="text-gray-400">Route ID: </span>
                {route.RouteId}
            </div>
            <div className="mt-2">
                <span className="text-gray-400">Stops: </span>
                {route.stops.map((stop, index) => (
                    <span key={stop.stopId} className="mr-2">
                        {stop.stopName}
                        {index < route.stops.length - 1 && ' →'}
                    </span>
                ))}
            </div>
            <div className="flex justify-end space-x-2 mt-3">
                <button
                    onClick={handleEditRoute}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                >
                    Edit
                </button>
                <button

                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}
export default memo(RouteCard);

