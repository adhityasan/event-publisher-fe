import React, { memo } from 'react';
import { EnvironmentFilled } from '@ant-design/icons';
import { css } from '@emotion/css';

interface MarkerProps {
  lat: number;
  lng: number;
  text?: string;
}

const MarketStyle = css`
  position: relative;
  .marker-icon {
    position: absolute;
    top: -35px;
    left: --20px;
  }
  .marker-text {
    position: absolute;
    top: -15px;
    left: -8px;
  }
  svg {
    min-width: 20px;
    min-height: 20px;
    margin-bottom: 5px;
  }
`;

const Marker: React.FC<MarkerProps> = ({ text }) => {
  return (
    <div className={MarketStyle}>
      <EnvironmentFilled className="marker-icon" />
      <span className="marker-text">{text}</span>
    </div>
  );
};

export default memo(Marker);
