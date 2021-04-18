import { css } from '@emotion/css';
import { tablets } from '../../../assets/theme/breakpoints';

export const ListEventOrganizerStyle = css`
  .row-heading-action {
    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: ${tablets}) {
      justify-content: flex-end;
    }
  }
`;
