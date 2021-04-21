import React from 'react';
import ModalShareEvent from '../../../components/Modals/ModalShareEvent';
import Heading1 from '../../../components/PageHeadings/Heading1';
import { useEventContext } from '../../../context/EventContext';
import EventTabs from './components/EventTabs';
import FreshEventCarousel from './components/FreshEventCarousel';
import { HomeStyle } from './_HomeStyle';

const HomeView = () => {
  const { eventState, setEventState } = useEventContext();
  return (
    <div className={HomeStyle}>
      <Heading1>Fresh Upcoming Events</Heading1>
      <section>
        <FreshEventCarousel />
      </section>
      <section>
        <EventTabs />
      </section>
      <ModalShareEvent
        isVisible={!!eventState?.showModalShareEvent}
        event={eventState?.focusEvent}
        toggler={() => setEventState({ showModalShareEvent: false })}
      />
    </div>
  );
};

export default HomeView;
