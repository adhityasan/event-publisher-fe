import React, { memo } from 'react';

const EventOrganizerLayoutView = ({ children }: any) => {
  return (
    <div>
      <h1>Public Layout</h1>
      <div>{children}</div>
    </div>
  );
};

export default memo(EventOrganizerLayoutView);
