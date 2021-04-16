import { css } from '@emotion/css';
import { desktops, tablets } from '../../assets/theme/breakpoints';

export const SignInStyle = css`
  width: 100%;
  position: relative;
  @media (min-width: ${tablets}) {
    padding-top: 100px;
  }

  .page-illustration {
    top: 10px;
    left: 0;
    height: 200px;
    width: 300px;
    @media (min-width: ${tablets}) {
      height: 400px;
      width: 600px;
    }
    @media (min-width: ${desktops}) {
      height: 600px;
      width: 900px;
    }
  }

  .form-column {
    display: flex;
    justify-content: center;
    @media (min-width: ${tablets}) {
      display: block;
    }
  }

  .form-wrapper {
    padding: 20px;
    background: rgb(255, 255, 255, 0.6);
    border-radius: 20px;
    @media (min-width: ${tablets}) {
      margin-top: 50px;
    }
    @media (min-width: ${desktops}) {
      margin-top: 100px;
    }
  }
`;
