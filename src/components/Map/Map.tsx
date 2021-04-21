import React, { memo, ReactElement } from 'react';
import GoogleMapReact from 'google-map-react';

interface GeoLocation {
  lat: number;
  lng: number;
}

interface MapProps {
  width: string;
  height: string;
  id: string;
  zoom?: number;
  containerStyles?: {
    [key: string]: any;
  };
  children?: ReactElement;
  center?: GeoLocation;
}

const defaultcenter: GeoLocation = { lat: -6.165389299999999, lng: 106.8112819 }; // default center is Jakarta

const Map: React.FC<MapProps> = ({ width, height, id, zoom = 10, children, containerStyles, center }) => {
  return (
    <div id={id} style={{ width, height, ...containerStyles }}>
      <GoogleMapReact defaultCenter={defaultcenter} center={center} defaultZoom={10} zoom={zoom}>
        {children}
      </GoogleMapReact>
    </div>
  );
};

export default memo(Map);
