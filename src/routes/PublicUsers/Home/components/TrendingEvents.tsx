import React, { useEffect, useState } from 'react';
import { Col, Row, Spin } from 'antd';
import axiosInstance from '../../../../axios.instances';
import EventCard from '../../../../components/EventCard/EventCard';
import { EVENTS_API } from '../../../../config/apiUrls';

const TrendingEvents = () => {
  const [trendingEvents, setTrendingEvents] = useState([]);

  useEffect(() => {
    axiosInstance.get(EVENTS_API, { params: { $limit: 6 } }).then(({ data: tE }) => {
      setTrendingEvents(tE.data);
    });
  }, []);

  return (
    <div className="events-card-wrapper">
      <Row gutter={[24, 24]} justify="start">
        {trendingEvents.length > 0 ? (
          trendingEvents.map((event: any) => (
            <Col xs={24} sm={12} md={8} key={event._id}>
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

export default TrendingEvents;
