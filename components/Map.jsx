import React from 'react'
import GoogleMapReact from 'google-map-react'
import {FaMapMarkerAlt} from 'react-icons/fa'

const LocationPin = () => (
    <div className="cursor-pointer">
        <FaMapMarkerAlt className="text-red-500 text-2xl animate-bounce" />
    </div>
  )


const Map = ({ location, zoomLevel }) => (
    <div className="map">
  
      <div className="w-full h-[60vh]">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCfdDTOsfd-NsoH1VeX0bfBMcM5f3C2JPY' }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
            <LocationPin
          lat={location.lat}
          lng={location.lng}
        />
        </GoogleMapReact>
      </div>
    </div>
  )

export default Map