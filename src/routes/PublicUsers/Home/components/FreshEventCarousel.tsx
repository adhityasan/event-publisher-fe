import React, { useEffect, useState } from 'react';
import { Carousel, notification } from 'antd';
import QueryString from 'qs';
import axiosInstance from '../../../../axios.instances';
import { EVENTS_API } from '../../../../config/apiUrls';
import { toCommonDate } from '../../../../utils/helpers/date';
import { FreshEventCarouselStyle } from './_FreshEventCarouselStyle';

const defaultQs = {
  isPublished: true,
  $limit: 4,
  $sort: { createdAt: -1 }
};

const FreshEventCarousel = () => {
  const [freshEvents, setFreshEvents] = useState([]);

  useEffect(() => {
    const params = QueryString.stringify(defaultQs, { addQueryPrefix: true });
    axiosInstance
      .get(EVENTS_API + params)
      .then(({ data }) => {
        setFreshEvents(data.data);
      })
      .catch((err: Error) => {
        notification.error({
          message: err.message
        });
      });
  }, []);

  return (
    <Carousel autoplay autoplaySpeed={6000} className={FreshEventCarouselStyle}>
      {freshEvents.map((fe: any) => (
        <div key={fe._id} className="carousel-event">
          <div className="info">
            <span className="info-title">{fe.title}</span>
            <span className="info-subtitle">{fe.subtitle}</span>
            <div className="info-date">
              <span className="date-start">{toCommonDate(fe.startDate)}</span>
              <span className="date-divider"> - </span>
              <span className="date-end">{toCommonDate(fe.endDate)}</span>
            </div>
            <div className="info-time">
              <span className="time-start">{fe.startTime}</span>
              <span className="time-divider"> - </span>
              <span className="time-end">{fe.endTime}</span>
            </div>
          </div>
          <div className="banner">
            <img className="banner-img" src={fe.bannerUrl} />
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default FreshEventCarousel;
