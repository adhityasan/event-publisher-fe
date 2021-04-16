import { css } from '@emotion/css';
import { tablets } from '../../../assets/theme/breakpoints';
import { primary } from '../../../assets/theme/colors';

export const PublicLayoutDesktopNavStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;

  .navlink {
    color: rgba(0, 0, 0, 0.85);
  }
  .active {
    color: #665df5;
  }
  .menu {
    display: none;
    flex-flow: row wrap;
    justify-content: flex-end;
    width: 100%;
    @media (min-width: ${tablets}) {
      display: flex;
    }
  }
  .menu-item {
    font-weight: 400;
    margin: 0 10px;
    .icon {
      margin-right: 10px;
    }
  }
  .burger-button {
    @media (min-width: ${tablets}) {
      display: none;
    }
    :hover {
      color: ${primary};
      border-color: ${primary};
    }
  }
`;

export const PublicLayoutMobileNavStyle = css`
  .navlink {
    color: rgba(0, 0, 0, 0.85);
  }
  .menu {
    width: 100%;
    display: flex;
    flex-flow: column wrap;
    position: absolute;
    top: -1000px;
    transition: all 0.5s;
    @media (min-width: ${tablets}) {
      display: none;
    }
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 20px;
    box-shadow: 0px 2px 4px rgba(217, 217, 217, 0.5);
  }
  .show {
    top: 30px;
  }
  .menu-item {
    text-align: center;
    line-height: 50px;
    font-weight: 400;
    margin: 5px 0;
    .icon {
      margin-right: 10px;
    }
  }
`;

export default { PublicLayoutDesktopNavStyle, PublicLayoutMobileNavStyle };
