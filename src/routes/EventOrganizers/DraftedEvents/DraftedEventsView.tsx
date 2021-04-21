import { Col } from 'antd';
import React, { memo, useCallback, useEffect, useState } from 'react';
import axiosInstance from '../../../axios.instances';
import EoAccessHOC from '../../../components/EoAccessHOC/EoAccessHOC';
import Heading1 from '../../../components/PageHeadings/Heading1';
import { EVENTS_API } from '../../../config/apiUrls';
import { useAppContext } from '../../../context/AppContext';
import Filter from './components/Filter';
import Table from './components/Table';
import { DraftedEventStyle } from './_DraftedEventStyle';

const DraftedEventsView = () => {
  const { appState } = useAppContext();
  const [dataTable, setDataTable] = useState([]);

  const onFilter = useCallback(
    (filterValues?: any) => {
      const queryDraftedEvents: any = {
        $limit: 10,
        isPublished: false,
        organizer: appState.eo_management?.eo._id
      };
      if (filterValues) {
        if (filterValues.search) queryDraftedEvents.$search = filterValues.search;
      }

      axiosInstance.get(EVENTS_API, { params: queryDraftedEvents }).then(({ data }) => {
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
      <div className={DraftedEventStyle}>
        <Heading1>Drafted Events</Heading1>
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

export default memo(DraftedEventsView);
