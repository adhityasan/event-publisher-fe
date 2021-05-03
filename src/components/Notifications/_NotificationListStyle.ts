import { css } from '@emotion/css';
import { tablets } from '../../assets/theme/breakpoints';

export const NotificationListStyle = css`
  min-width: 80%;

  @media (min-width: ${tablets}) {
    min-width: 500px;
  }
`;
