import { Spin } from 'antd';
import React, { memo } from 'react';
import { LoadingAppStyle } from './_LoadingAppStyle';

interface ILoadingAppProps {
  width?: string;
  height?: string;
}

const LoadingApp: React.FC<ILoadingAppProps> = ({ width, height }) => {
  return (
    <div className={LoadingAppStyle} style={{ width, height }}>
      <div className="content">
        <h1 className="eventPublish-logo app-load-icon">eventPublisher</h1>
        <Spin size="large" className="spin" />
      </div>
    </div>
  );
};

export default memo(LoadingApp);
