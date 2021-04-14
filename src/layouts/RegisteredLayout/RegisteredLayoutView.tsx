import React, { memo } from 'react';

const PublicLayoutView = ({ children }: any) => {
  return (
    <div>
      <h1>Registered Layout</h1>
      <div>{children}</div>
    </div>
  );
};

export default memo(PublicLayoutView);
