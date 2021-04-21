import React from 'react';
import { Tabs } from 'antd';
import { NumberOutlined, VideoCameraOutlined, CompassOutlined } from '@ant-design/icons';
import OnlilneEvents from './OnlilneEvents';
import TrendingEvents from './TrendingEvents';
import { requestUserLocation } from '../../../../utils/helpers';
import { useAppContext } from '../../../../context/AppContext';
import localStorage from '../../../../utils/localStorage';
import EventsNearMe from './EventsNearMe';
import { TabsStyle } from './_TabsStyle';

const { TabPane } = Tabs;

const TabLabel = ({ icon: Icon, text }: any) => (
  <span className="tab-label">
    <Icon />
    {text}
  </span>
);

const EventTabs = () => {
  const { setAppState } = useAppContext();

  const onNearEvents = (geolocation: any, location: string) => {
    setAppState({ location: location, geolocation: geolocation });
  };
  const handleTabChange = (tabKey: any) => {
    if (tabKey === 'near') {
      if (!localStorage.location.get() || localStorage.location.get() === 'null') {
        requestUserLocation(onNearEvents);
      } else {
        onNearEvents(localStorage.geolocation.get(), localStorage.location.get());
      }
    }
  };

  return (
    <Tabs defaultActiveKey="1" onChange={handleTabChange} className={TabsStyle}>
      <TabPane tab={<TabLabel text="Online Events" icon={VideoCameraOutlined} />} key="online">
        <OnlilneEvents />
      </TabPane>
      <TabPane tab={<TabLabel text="Trending Events" icon={NumberOutlined} />} key="trending">
        <TrendingEvents />
      </TabPane>
      <TabPane tab={<TabLabel text="Events Near Me" icon={CompassOutlined} />} key="near">
        <EventsNearMe />
      </TabPane>
    </Tabs>
  );
};

export default EventTabs;
