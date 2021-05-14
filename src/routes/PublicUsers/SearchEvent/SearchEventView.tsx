import { AppstoreAddOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Col, Empty, Row, Spin } from 'antd';
import QueryString from 'qs';
import React, { useCallback, useEffect, useState } from 'react';
import axiosInstance from '../../../axios.instances';
import EventCard from '../../../components/EventCard/EventCard';
import ModalShareEvent from '../../../components/Modals/ModalShareEvent';
import Heading1 from '../../../components/PageHeadings/Heading1';
import { EVENTS_API } from '../../../config/apiUrls';
import { useEventContext } from '../../../context/EventContext';
import SearchEventsFilter from './components/SearchEventsFilter';
import { searchEventsStyle } from './_SearchEventsStyle';

const defaultQs = {
  isPublished: true,
  $limit: 6,
  $sort: { createdAt: -1 }
};

const SearchEventView = () => {
  const { eventState, setEventState } = useEventContext();
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [queryFilter, setQueryFilter] = useState<any>({});

  const getEvents = useCallback((qs: any, callback: (data: any[]) => void) => {
    const params = QueryString.stringify({ ...defaultQs, ...qs }, { addQueryPrefix: true });
    setIsLoading(true);
    axiosInstance.get(EVENTS_API + params).then(({ data: resData }) => {
      setIsLoading(false);
      callback(qs?.geometry ? resData : resData.data);
    });
  }, []);

  const handleFilter = (passedQueryFilter: any, callback?: any) => {
    setQueryFilter(passedQueryFilter);
    getEvents(passedQueryFilter, (data: any[]) => {
      if (callback) callback();
      setEvents(data);
    });
  };

  const handleLoadMore = () => {
    const qsLoadMore = {
      ...queryFilter,
      $skip: events.length
    };
    getEvents(qsLoadMore, (data: any[]) => {
      setEvents([...events, ...data]);
    });
  };

  useEffect(() => {
    getEvents({}, setEvents);
  }, [getEvents]);

  return (
    <div className={searchEventsStyle}>
      <Heading1>Search Events</Heading1>
      <section>
        <Row gutter={[12, 12]}>
          <Col xs={24} md={8} lg={6}>
            <SearchEventsFilter handleFilter={handleFilter} />
          </Col>
          <Col xs={24} md={16} lg={18}>
            <Row gutter={[12, 12]}>
              {events.length > 0 ? (
                events.map((event) => (
                  <Col key={event._id} xs={24} sm={12} md={12} lg={12} xl={8}>
                    <EventCard id={event._id} {...event} />
                  </Col>
                ))
              ) : (
                <Col span={24}>
                  <Row justify="center">
                    <Empty />
                  </Row>
                </Col>
              )}
            </Row>
            <Row justify="center" style={{ height: '30px', margin: '20px 0' }}>
              {isLoading ? <Spin size="large" /> : null}
            </Row>
            <Row justify="center">
              <Button type="ghost" icon={isLoading ? <LoadingOutlined /> : <AppstoreAddOutlined />} onClick={handleLoadMore}>
                load more
              </Button>
            </Row>
          </Col>
        </Row>
      </section>
      <ModalShareEvent
        isVisible={!!eventState?.showModalShareEvent}
        event={eventState?.focusEvent}
        toggler={() => setEventState({ showModalShareEvent: false })}
      />
    </div>
  );
};

export default SearchEventView;
