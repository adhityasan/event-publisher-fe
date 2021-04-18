import { css } from '@emotion/css';
import React, { memo } from 'react';
import { phone } from '../../assets/theme/breakpoints';
import { primary } from '../../assets/theme/colors';

const Heading1Style = css`
  margin: 30px 0 30px 0;
  font-weight: 700;
  color: ${primary};
  text-align: center;
  @media (min-width: ${phone}) {
    text-align: left;
  }
`;

const Heading1 = ({ children }: any) => {
  return <h1 className={Heading1Style}>{children}</h1>;
};

export default memo(Heading1);
