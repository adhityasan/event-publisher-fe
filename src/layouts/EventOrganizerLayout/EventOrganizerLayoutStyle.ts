import { css } from '@emotion/css';
import { tablets } from '../../assets/theme/breakpoints';

export const EventOrganizerLayoutStyle = css`
  .eo-sider-logo {
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
      font-family: muli, sans-serif;
      font-weight: 900;
      font-size: 21px;
      font-style: normal;
      margin: 0;
      color: #fff;
    }
  }

  .eo-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .eo-content {
    padding: 20px;
    h1 {
      text-transform: capitalize;
      font-size: 20px;
      margin: 0 0 20px 0;
      @media (min-width: ${tablets}) {
        font-size: 24px;
      }
    }
  }

  .eo-footer {
    padding: 0;
    height: 48px;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
  }
`;
