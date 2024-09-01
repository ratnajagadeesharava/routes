import React from 'react'
import GooglePlacesAutocomplete, { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete'
import { Position } from '../models/Maps.Model'
import { error } from 'console'
import { Stop } from '../models/Route'
function GoogleAutoComplete({ stop, handleStop }: { stop: Stop, handleStop: (stop: Stop) => void }) {
  const [value, setValue] = React.useState<any>(null)
  const [position, setPosition] = React.useState<Position>()
  function handleChange(address: any) {
    setValue(address)
    geocodeByPlaceId(address.value.place_id)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setPosition({ lat, lng })
        stop.latitude = lat.toString();
        stop.longitude = lng.toString();
        stop.stopName = address.value.description;
        handleStop(stop);
      }
      ).catch((error) => {
        console.log('error', error)
      });
  }
  return (
    <div className='w-80'>
      <GooglePlacesAutocomplete
        apiKey={process.env.REACT_APP_GOOGLE_API_KEY || ""}
        selectProps={{
          placeholder: 'Search for a place',
          className: 'w-full w-80  px-4 py-2 text-gray-700 bg-gray-200 rounded border border-gray-200 focus:border-gray-500 focus:bg-white focus:outline-none',
          value,
          onChange: (newValue) => handleChange(newValue),
        }}
      />
    </div>
  )
}
export default GoogleAutoComplete