import React, { useEffect, useState } from 'react';
import GoogleAutoComplete from '../components/common/ui/GoogleAutoComplete';
import Route, { Stop } from '../components/common/models/Route';
import { useSelector, useStore } from 'react-redux';
import { addToRoutes, updateRoute } from '../store/slices/RouteSlice';
import { Navigate, useParams } from 'react-router-dom';
import { RootState } from '../store/store';

interface IStop extends Stop {

  showCoordinates: boolean;
}

const CreateRoute: React.FC = () => {
  const [routeName, setRouteName] = useState('');
  const [routeId, setRouteId] = useState(0);
  const [stopId, setStopId] = useState(1);
  const routeStore = useStore();
  const { routes } = useSelector((state: RootState) => state.routes);
  const [stops, setStops] = useState<IStop[]>([
    { stopId: 1, stopName: '', latitude: '', longitude: '', showCoordinates: false },
    { stopId: 2, stopName: '', latitude: '', longitude: '', showCoordinates: false },
  ]);
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  const [direction, setDirection] = useState<'UP' | 'DOWN'>('UP');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const route = routes.find(r => r.RouteId == parseInt(id));
      if (route) {
        setRouteName(route.name);
        setRouteId(route.RouteId);
        setDirection(route.direction);
        setStatus(route.status);
        setStops(route.stops.map(stop => {
          return {
            ...stop,
            showCoordinates: true
          }
        }));
        setIsUpdate(true);
      }
    }
  }, [id])
  const handleSaveRoute = () => {
    const newRoute: Route = {
      name: routeName,
      RouteId: routeId,
      direction,
      status,
      stops: stops

    }
    if(!isUpdate)
    routeStore.dispatch(addToRoutes(newRoute));
    else
    routeStore.dispatch(updateRoute(newRoute));
    
    setIsSubmitted(true);
    
  }

  const handleStop = (stop: Stop) => {
    const newStops = [...stops];
    let oldStop = newStops.find(s => s.stopId === stop.stopId);
    if (oldStop) {
      oldStop.stopName = stop.stopName;
      oldStop.latitude = stop.latitude;
      oldStop.longitude = stop.longitude;
    }
    setStops(newStops);
  }
  const addStop = () => {
    const newStop: IStop = {
      stopId: stopId,
      stopName: '',
      latitude: '',
      longitude: '',
      showCoordinates: false,
    };
    setStopId(stopId => stopId + 1);
    setStops([...stops, newStop]);
  };

  const updateStop = (id: number, field: keyof IStop, value: string | boolean) => {
    const updatedStops = stops.map(stop =>
      stop.stopId === id ? { ...stop, [field]: value } : stop
    );
    setStops(updatedStops);
    validateField(`stop-${id}-${field}`, value.toString());
  };

  const deleteStop = (id: number) => {
    if (stops.length > 2) {
      const updatedStops = stops.filter(stop => stop.stopId !== id);
      setStops(updatedStops);
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget.outerHTML);
    e.currentTarget.style.opacity = '0.4';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      const items = [...stops];
      const draggedItem = items[draggedIndex];
      items.splice(draggedIndex, 1);
      items.splice(index, 0, draggedItem);
      setStops(items);
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setDraggedIndex(null);
    e.currentTarget.style.opacity = '1';
  };

  const validateField = (field: string, value: string) => {
    if (!value.trim()) {
      setErrors(prev => ({ ...prev, [field]: 'This field is required' }));
      return false;
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
      return true;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    let newErrors: { [key: string]: string } = {};

    if (!validateField('routeName', routeName)) {
      newErrors['routeName'] = 'Route name is required';
      isValid = false;
    }
    stops.forEach((stop, index) => {
      if (!validateField(`stop-${stop.stopId}-name`, stop.stopName)) {
        newErrors[`stop-${stop.stopId}-name`] = `${index === 0 ? 'Start' : index === stops.length - 1 ? 'End' : `Stop ${index + 1}`} name is required`;
        isValid = false;
      }
      if (stop.showCoordinates) {
        if (!validateField(`stop-${stop.stopId}-latitude`, stop.latitude)) {
          newErrors[`stop-${stop.stopId}-latitude`] = `${index === 0 ? 'Start' : index === stops.length - 1 ? 'End' : `Stop ${index + 1}`} latitude is required`;
          isValid = false;
        }
        if (!validateField(`stop-${stop.stopId}-longitude`, stop.longitude)) {
          newErrors[`stop-${stop.stopId}-longitude`] = `${index === 0 ? 'Start' : index === stops.length - 1 ? 'End' : `Stop ${index + 1}`} longitude is required`;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);

    if (isValid) {
      setSubmissionError(null);
      console.log('Form submitted successfully');
      handleSaveRoute();
      // Here you would typically send the data to your backend
    } else {
      setSubmissionError('Please fill in all required fields correctly.');
      console.log('Form has errors', newErrors);
    }
  };
  if(isSubmitted){
    return <Navigate to="/"/>
  }

  return (
    <div className="bg-gray-900 text-white p-6 max-w-2xl mx-auto  rounded shadow-md 
    ">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">New Route</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {submissionError && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {submissionError}
          </div>
        )}

        <div>
          <label htmlFor="routeName" className="block mb-1">
            Route Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="routeName"
            value={routeName}
            onChange={(e) => {
              setRouteName(e.target.value);
              validateField('routeName', e.target.value);
            }}
            placeholder="Enter route name"
            className={`w-full bg-gray-800 rounded px-3 py-2 ${errors['routeName'] ? 'border border-red-500' : ''}`}
            required
          />
          {errors['routeName'] && <p className="text-red-500 text-sm mt-1">{errors['routeName']}</p>}
        </div>

        <div>
          <label htmlFor="direction" className="block mb-1">
            Direction <span className="text-red-500">*</span>
          </label>
          <select
            id="direction"
            value={direction}
            onChange={(e) => setDirection(e.target.value as 'UP' | 'DOWN')}
            className="w-full bg-gray-800 rounded px-3 py-2 appearance-none"
            required
          >
            <option value="UP">UP</option>
            <option value="DOWN">DOWN</option>
          </select>
        </div>

        {/* <div>
          <label htmlFor="routeId" className="block mb-1">
            Route ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="routeId"
            value={routeId}
            onChange={(e) => {
              setRouteId(e.target.value);
              validateField('routeId', e.target.value);
            }}
            placeholder="Enter route ID"
            className={`w-full bg-gray-800 rounded px-3 py-2 ${errors['routeId'] ? 'border border-red-500' : ''}`}
            required
          />
          {errors['routeId'] && <p className="text-red-500 text-sm mt-1">{errors['routeId']}</p>}
        </div> */}

        <div>
          <label className="block mb-1">Stops <span className="text-red-500">*</span></label>
          <div className="max-h-80 overflow-y-auto pr-2">
            <div className="space-y-2">
              {stops.map((stop, index) => (
                <div
                  key={stop.stopId}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className="bg-gray-800 p-4 rounded flex items-center space-x-2"
                >
                  <div className="cursor-move">☰</div>
                  <div className="flex-grow space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold w-14">
                        {index === 0 ? 'Start' : index === stops.length - 1 ? 'End' : `Stop ${index + 1}`}
                      </span>
                      {!stop.showCoordinates && <GoogleAutoComplete stop={stop} handleStop={handleStop} />}
                      {stop.showCoordinates && <input
                        type="text"
                        value={stop.stopName}
                        onChange={(e) => updateStop(stop.stopId, 'stopName', e.target.value)}
                        placeholder={`Enter ${index === 0 ? 'start' : index === stops.length - 1 ? 'end' : `stop ${index + 1}`} name`}
                        className={`flex-grow bg-gray-700 rounded px-3 py-2 ${errors[`stop-${stop.stopId}-name`] ? 'border border-red-500' : ''}`}
                        required
                      />}
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={stop.showCoordinates}
                          onChange={(e) => updateStop(stop.stopId, 'showCoordinates', e.target.checked)}
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="text-sm">Coordinates</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => deleteStop(stop.stopId)}
                        className="bg-red-500 hover:bg-red-600 p-2 rounded"
                        disabled={stops.length <= 2}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    {errors[`stop-${stop.stopId}-name`] && <p className="text-red-500 text-sm">{errors[`stop-${stop.stopId}-name`]}</p>}
                    {stop.showCoordinates && (
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={stop.latitude}
                          onChange={(e) => updateStop(stop.stopId, 'latitude', e.target.value)}
                          placeholder="Latitude"
                          className={`flex-1 bg-gray-700 rounded px-3 py-2 ${errors[`stop-${stop.stopId}-latitude`] ? 'border border-red-500' : ''}`}
                          required
                        />
                        <input
                          type="text"
                          value={stop.longitude}
                          onChange={(e) => updateStop(stop.stopId, 'longitude', e.target.value)}
                          placeholder="Longitude"
                          className={`flex-1 bg-gray-700 rounded px-3 py-2 ${errors[`stop-${stop.stopId}-longitude`] ? 'border border-red-500' : ''}`}
                          required
                        />
                      </div>
                    )}
                    {stop.showCoordinates && errors[`stop-${stop.stopId}-latitude`] && <p className="text-red-500 text-sm">{errors[`stop-${stop.stopId}-latitude`]}</p>}
                    {stop.showCoordinates && errors[`stop-${stop.stopId}-longitude`] && <p className="text-red-500 text-sm">{errors[`stop-${stop.stopId}-longitude`]}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={addStop}
            className="mt-2 text-blue-400 hover:text-blue-300"
          >
            + Add another stop
          </button>
        </div>

        <div>
          <label className="block mb-1">Status <span className="text-red-500">*</span></label>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setStatus('Active')}
              className={`flex-1 py-2 px-4 rounded ${status === 'Active'
                ? 'bg-gray-700 text-white'
                : 'bg-gray-800 text-gray-400'
                }`}
            >
              Active
            </button>
            <button
              type="button"
              onClick={() => setStatus('Inactive')}
              className={`flex-1 py-2 px-4 rounded ${status === 'Inactive'
                ? 'bg-gray-700 text-white'
                : 'bg-gray-800 text-gray-400'
                }`}
            >
              Inactive
            </button>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-red-400 hover:text-red-300"
          >
            Delete Route
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateRoute;