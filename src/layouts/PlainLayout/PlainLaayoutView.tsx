import React from 'react';
import { css } from '@emotion/css';

const PlainLayoutStyle = css`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const PlainLaayoutView = ({ children }: any) => {
  return <div className={PlainLayoutStyle}>{children}</div>;
};

export default PlainLaayoutView;
