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
import { PassedEventStyle } from './_PassedEventStyle';

const PassedEventsView = () => {
  const { appState } = useAppContext();
  const [dataTable, setDataTable] = useState([]);

  const onFilter = useCallback(
    (filterValues?: any) => {
      const passedEventsQuery: any = {
        $limit: 10,
        isPublished: true,
        startDate: {
          $lt: dayjs().startOf('day').unix()
        },
        organizer: appState.eo_management?.eo._id,
        $sort: {
          createdAt: -1
        }
      };
      if (filterValues) {
        if (filterValues.search) passedEventsQuery.$search = filterValues.search;
      }

      const qs = QueryString.stringify(passedEventsQuery, { addQueryPrefix: true });
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
      <div className={PassedEventStyle}>
        <Heading1>Passed Events</Heading1>
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

export default memo(PassedEventsView);
