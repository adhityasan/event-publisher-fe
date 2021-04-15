import { Spin } from 'antd';
import React, { memo } from 'react';
import { LoadingAppStyle } from './_LoadingAppStyle';

const LoadingApp = () => {
  return (
    <div className={LoadingAppStyle}>
      <div className="content">
        <h1 className="eventPublish-logo app-load-icon">eventPublisher</h1>
        <Spin size="large" className="spin" />
      </div>
    </div>
  );
};

export default memo(LoadingApp);
