import React from 'react';
import Heading1 from '../../../components/PageHeadings/Heading1';
import EventTabs from './components/EventTabs';
import FreshEventCarousel from './components/FreshEventCarousel';
import { HomeStyle } from './_HomeStyle';

const HomeView = () => {
  return (
    <div className={HomeStyle}>
      <Heading1>Fresh Upcoming Events</Heading1>
      <section>
        <FreshEventCarousel />
      </section>
      <section>
        <EventTabs />
      </section>
    </div>
  );
};

export default HomeView;
