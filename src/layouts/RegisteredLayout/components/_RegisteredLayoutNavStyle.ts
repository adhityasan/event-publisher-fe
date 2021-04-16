import { css } from '@emotion/css';
import { phone, tablets } from '../../../assets/theme/breakpoints';
import { primary } from '../../../assets/theme/colors';

export const RegisteredLayoutDesktopNavStyle = css`
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

export const RegisteredLayoutMobileNavStyle = css`
  .navlink {
    color: rgba(0, 0, 0, 0.85);
  }
  .menu {
    width: 80%;
    margin: 0 10% 0 10%;
    display: flex;
    flex-flow: column wrap;
    position: absolute;
    top: -1000px;
    left: 0;
    transition: all 0.5s;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 20px;
    box-shadow: 0px 4px 10px rgba(217, 217, 217, 0.8);
    @media (min-width: ${phone}) {
      width: 60%;
      margin: 0 20% 0 20%;
    }
    @media (min-width: ${tablets}) {
      display: none;
    }
  }
  .show {
    top: 30px;
    left: 0;
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

export default { RegisteredLayoutDesktopNavStyle, RegisteredLayoutMobileNavStyle };
