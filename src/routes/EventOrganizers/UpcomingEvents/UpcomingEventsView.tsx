import { Col } from 'antd';
import dayjs from 'dayjs';
import QueryString from 'qs';
import React, { memo, useCallback, useEffect, useState } from 'react';
import axiosInstance from '../../../axios.instances';
import EoAccessHOC from '../../../components/EoAccessHOC/EoAccessHOC';
import Heading1 from '../../../components/PageHeadings/Heading1';
import { EVENTS_API } from '../../../config/apiUrls';
import { useAppContext } from '../../../context/AppContext';
import Filter from './components/Filter';
import Table from './components/Table';
import { UpcomingEventStyle } from './_UpcomingEventStyle';

const UpcomingEventsView = () => {
  const { appState } = useAppContext();
  const [dataTable, setDataTable] = useState([]);

  const onFilter = useCallback(
    (filterValues?: any) => {
      const upcomingEventsQuery: any = {
        $limit: 10,
        isPublished: true,
        startDate: {
          $gt: dayjs().endOf('day').unix()
        },
        organizer: appState.eo_management?.eo._id,
        $sort: {
          createdAt: -1
        }
      };
      if (filterValues) {
        if (filterValues.search) upcomingEventsQuery.$search = filterValues.search;
      }

      const qs = QueryString.stringify(upcomingEventsQuery, { addQueryPrefix: true });
      axiosInstance.get(EVENTS_API + qs).then(({ data }) => {
        setDataTable(data.data);
      });
    },
    [appState.eo_management]
  );

  useEffect(() => {
    onFilter();
  }, [onFilter]);

  return (
    <EoAccessHOC>
      <div className={UpcomingEventStyle}>
        <Heading1>Upcoming Events</Heading1>
        <section className="filter-section">
          <Filter onFilter={onFilter} />
        </section>
        <section className="main-section">
          <Col span={24}>
            <Table data={dataTable} />
          </Col>
        </section>
      </div>
    </EoAccessHOC>
  );
};

export default memo(UpcomingEventsView);
