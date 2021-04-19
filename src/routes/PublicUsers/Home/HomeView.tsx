import React, { useEffect, useState } from 'react';
import { Carousel, notification } from 'antd';
import Heading1 from '../../../components/PageHeadings/Heading1';
import axiosInstance from '../../../axios.instances';
import { EVENTS_API } from '../../../config/apiUrls';
import { HomeStyle } from './_HomeStyle';
import { toCommonDate } from '../../../utils/helpers/date';

const HomeView = () => {
  const [freshEvents, setFreshEvents] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(EVENTS_API, { params: { $limit: 4, $sort: { createdAt: -1 } } })
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
    <div className={HomeStyle}>
      <Heading1>Fresh Upcoming Events</Heading1>
      <section>
        <Carousel autoplay autoplaySpeed={6000}>
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
      </section>
    </div>
  );
};

export default HomeView;
