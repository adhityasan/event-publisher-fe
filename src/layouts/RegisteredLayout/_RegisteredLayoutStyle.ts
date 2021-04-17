import { css } from '@emotion/css';
import { desktops, lgdesktops, tablets } from '../../assets/theme/breakpoints';
import { lightText, primary } from '../../assets/theme/colors';

export const RegisteredLayoutStyle = css`
  .eventPublish-logo {
    color: ${lightText};
  }
  .header {
    padding: 0 20px;
    background: ${primary};
    color: ${lightText};
    position: fixed;
    z-index: 2;
    width: 100%;
    transition: border 0.2s, background 0.4s, box-shadow 0.4s;
    @media (min-width: ${tablets}) {
      padding: 0 50px;
    }
    @media (min-width: ${desktops}) {
      padding: 0 100px;
    }
    @media (min-width: ${lgdesktops}) {
      padding: 0 10%;
    }
  }
  .scrolled {
    box-shadow: 0px 4px 10px rgba(94, 44, 233, 0.8);
  }
  .content {
    padding: 0 20px;
    margin-top: 64px;
    background: #fff;
    position: relative;

    @media (min-width: ${tablets}) {
      padding: 0 50px;
    }
    @media (min-width: ${desktops}) {
      padding: 0 100px;
    }
    @media (min-width: ${lgdesktops}) {
      padding: 0 10%;
    }
  }
`;
