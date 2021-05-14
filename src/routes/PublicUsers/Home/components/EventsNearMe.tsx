import React, { useEffect, useState } from 'react';
import { Col, Row, Spin } from 'antd';
import axiosInstance from '../../../../axios.instances';
import EventCard from '../../../../components/EventCard/EventCard';
import { EVENTS_API } from '../../../../config/apiUrls';
import { useAppContext } from '../../../../context/AppContext';

const EventsNearMe = () => {
  const { appState } = useAppContext();
  const [nearEvents, setNearEvents] = useState([]);

  useEffect(() => {
    const nearQuery = {
      $near: {
        $maxDistance: 10000,
        $geometry: {
          type: 'Point',
          coordinates: [appState.geolocation?.lng, appState.geolocation?.lat]
        }
      }
    };
    axiosInstance
      .get(EVENTS_API, { params: { geolocation: nearQuery, geometry: true, parseGeolocation: true, isPublished: true } })
      .then(({ data }) => {
        setNearEvents(data);
      });
  }, [appState.geolocation]);

  return (
    <div className="events-card-wrapper">
      <Row gutter={[24, 24]} justify="start">
        {nearEvents.length > 0 ? (
          nearEvents.map((event: any) => (
            <Col xs={24} sm={12} lg={8} key={event._id}>
              <EventCard
                id={event._id}
                bannerUrl={event.bannerUrl}
                description={event.description}
                organizer={event.organizer}
                title={event.title}
                subtitle={event.subtitle}
              />
            </Col>
          ))
        ) : (
          <div className="spin-wrapper">
            <Spin size="large" />
          </div>
        )}
      </Row>
    </div>
  );
};

export default EventsNearMe;
