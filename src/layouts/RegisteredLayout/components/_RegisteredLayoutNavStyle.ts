import { css } from '@emotion/css';
import { phone, tablets } from '../../../assets/theme/breakpoints';
import { lightText, primary } from '../../../assets/theme/colors';

export const RegisteredLayoutDesktopNavStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;

  .navlink {
    color: ${lightText};
  }
  .active {
    color: ${lightText};
    background: #847cff;
  }
  .menu {
    display: none;
    flex-flow: row wrap;
    justify-content: flex-end;
    width: 100%;
    @media (min-width: ${tablets}) {
      display: flex;
      align-items: center;
    }
  }
  .notification-icon {
    cursor: pointer;
    svg {
      width: 18px;
      height: 18px;
      color: #fff;
    }
  }
  .menu-item {
    font-weight: 400;
    margin: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      margin-right: 10px;
    }
  }
  .burger-button {
    @media (min-width: ${tablets}) {
      display: none;
    }
    color: ${lightText};
    background: ${primary};
    border-color: ${lightText};

    :hover {
      color: ${lightText};
      border-color: ${lightText};
      border-width: 2px;
    }
  }
  .user-menu {
    margin: 0 10px;
    background: ${primary};
    span {
      color: ${lightText};
      text-transform: lowercase;
    }
  }
`;

export const RegisteredLayoutMobileNavStyle = css`
  .navlink {
    color: inherit;
  }
  .active {
    color: ${lightText};
  }
  .menu {
    width: 80%;
    margin: 0 10% 0 10%;
    display: flex;
    align-items: center;
    flex-flow: column wrap;
    position: absolute;
    top: -1000px;
    left: 0;
    transition: all 0.5s;
    background: #fff;
    background: ${primary};
    color: #fff;
    /* border: 1px solid #ddd; */
    border-radius: 20px;
    box-shadow: 0px 4px 10px rgba(94, 44, 233, 0.8);
    @media (min-width: ${phone}) {
      width: 60%;
      margin: 0 20% 0 20%;
    }
    @media (min-width: ${tablets}) {
      display: none;
    }
  }
  .email-tag {
    line-height: 15px;
    border-radius: 8px;
    box-sizing: border-box;
    border: 1px solid #fff;
    padding: 10px;
    width: 80%;
    text-align: center;
  }
  .first-child {
    border-radius: 20px 20px 0 0;
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

export const UserMenuStyle = css`
  .user-menu-item {
    line-height: 30px;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      text-transform: capitalize;
    }
  }
`;

export default { RegisteredLayoutDesktopNavStyle, RegisteredLayoutMobileNavStyle, UserMenuStyle };
