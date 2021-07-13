import React, { useEffect, useState } from 'react';
import { Col, Row, Spin } from 'antd';
import QueryString from 'qs';
import axiosInstance from '../../../../axios.instances';
import EventCard from '../../../../components/EventCard/EventCard';
import { EVENTS_API, MASTER_EVENT_FORMATS_API } from '../../../../config/apiUrls';

const OnlilneEvents = () => {
  const [onlilneEvents, setOnlineEvents] = useState([]);

  useEffect(() => {
    axiosInstance.get(MASTER_EVENT_FORMATS_API, { params: { format: 'online' } }).then(({ data }) => {
      const onlineFormatId: string = data.data[0]._id;
      const params = QueryString.stringify(
        { eventFormats: onlineFormatId, isPublished: true, $sort: { createdAt: -1 } },
        { addQueryPrefix: true }
      );
      axiosInstance.get(EVENTS_API + params).then(({ data: oE }) => {
        setOnlineEvents(oE.data);
      });
    });
  }, []);

  return (
    <div className="events-card-wrapper">
      <Row gutter={[24, 24]} justify="start">
        {onlilneEvents.length > 0 ? (
          onlilneEvents.map((event: any) => (
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

export default OnlilneEvents;
