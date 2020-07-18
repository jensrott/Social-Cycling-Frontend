import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { GoogleMap, withGoogleMap, DirectionsRenderer, Marker } from 'react-google-maps';

import ReactTooltip from 'react-tooltip';

import * as style from './style.json';

const Map = ({ origin, destination }) => {

    const [directions, setDirections] = useState(null);

    useEffect(() => {
        const DirectionsService = new window.google.maps.DirectionsService();
        DirectionsService.route({
            origin: { lat: origin.lat, lng: origin.lng },
            destination: { lat: destination.lat, lng: destination.lng },
            travelMode: window.google.maps.TravelMode.BICYCLING,
        }, (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
                setDirections(result);
            } else {
                console.error(`error fetching directions ${result}`);
            }
        })
    }, [])

    const MapComponent = withGoogleMap((props) =>
        <GoogleMap
            defaultZoom={7}
            defaultOptions={{ styles: style }}
        >
            {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
    )

    return (
        <React.Fragment>
            <MapComponent
                data-tip="Click the icons to see the start and stop location!"
                loadingElement={<div style={{ height: `15rem` }} />}
                containerElement={<div style={{ height: `15rem`, borderRadius: `10 px` }} />}
                mapElement={<div style={{ height: `100%`, borderRadius: `10 px` }} />}
            />
            <ReactTooltip />
        </React.Fragment>
    )
}

Map.propTypes = {
    origin: PropTypes.object,
    destination: PropTypes.object,
}

export default Map;