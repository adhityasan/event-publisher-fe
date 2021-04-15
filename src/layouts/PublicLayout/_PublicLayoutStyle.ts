import { css } from '@emotion/css';
import { desktops, lgdesktops, tablets } from '../../assets/theme/breakpoints';

export const PublicLayoutStyle = css`
  .header {
    padding: 0 20px;
    background: #fff;
    position: fixed;
    z-index: 2;
    width: 100%;
    transition: border 0.2s, background 0.4s;
    @media (min-width: ${tablets}px) {
      padding: 0 50px;
    }
    @media (min-width: ${desktops}px) {
      padding: 0 100px;
    }
    @media (min-width: ${lgdesktops}px) {
      padding: 0 10%;
    }
  }
  .scrolled {
    background: #eee;
  }
  .content {
    padding: 0 20px;
    margin-top: 64px;
    background: #fff;
    position: relative;

    @media (min-width: ${tablets}px) {
      padding: 0 50px;
    }
    @media (min-width: ${desktops}px) {
      padding: 0 100px;
    }
    @media (min-width: ${lgdesktops}px) {
      padding: 0 10%;
    }
  }
`;
