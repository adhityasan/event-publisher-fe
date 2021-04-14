import React from 'react';
import { Button } from 'antd';
import { BulbOutlined, LoginOutlined, MenuOutlined, SearchOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import PublicLayoutNavStyle from './_PublicLayoutNavStyle';
import { ABOUT_PATH, SIGNIN_PATH, SEARCH_EVENT_PATH } from '../../../config/urls';

const Menus = ({ menuClassName }: { menuClassName?: string }) => (
  <div className={menuClassName}>
    <NavLink to={ABOUT_PATH} className="navlink">
      <div className="menu-item">
        <BulbOutlined className="icon" />
        ABOUT
      </div>
    </NavLink>
    <NavLink to={SEARCH_EVENT_PATH} className="navlink">
      <div className="menu-item">
        <SearchOutlined className="icon" />
        SEARCH EVENT
      </div>
    </NavLink>
    <NavLink to={SIGNIN_PATH} className="navlink">
      <div className="menu-item">
        <LoginOutlined className="icon" />
        SIGN IN
      </div>
    </NavLink>
  </div>
);

export const PublicLayoutDesktopNav = ({ toggleMobileNav }: { toggleMobileNav: () => void }) => {
  return (
    <div className={PublicLayoutNavStyle.PublicLayoutDesktopNavStyle}>
      <Menus menuClassName="menu" />
      <Button className="burger-button" type="dashed" shape="circle" icon={<MenuOutlined />} onClick={toggleMobileNav} />
    </div>
  );
};

export const PublicLayoutMobileNav = ({ isShow }: { isShow: boolean }) => {
  const menuClassName = isShow ? 'menu show' : 'menu';
  return (
    <div className={PublicLayoutNavStyle.PublicLayoutMobileNavStyle}>
      <Menus menuClassName={menuClassName} />
    </div>
  );
};
