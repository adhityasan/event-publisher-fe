import { css } from '@emotion/css';
import { tablets } from '../../../assets/theme/breakpoints';

export const CreateEventOrganizerStyle = css`
  .row-heading-action {
    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: ${tablets}) {
      justify-content: flex-end;
    }
  }

  .section {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
  }

  .form-wrapper {
    padding: 20px 30px 20px 30px;
    width: 90%;
    background: #fff;
    box-shadow: 0px 0px 10px #ddd;
    border-radius: 20px;
    margin-top: 30px;

    @media (min-width: ${tablets}) {
      padding: 10px 50px 20px 20px;
      width: 70%;
      max-width: 600px;
    }

    .note {
      margin: 10px 0 40px 0;
    }
  }
`;
