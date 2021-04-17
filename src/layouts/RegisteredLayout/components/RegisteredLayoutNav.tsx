import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
import {
  UserOutlined,
  MenuOutlined,
  SearchOutlined,
  LoginOutlined,
  HeartOutlined,
  BellOutlined,
  PushpinOutlined,
  ControlOutlined,
  ApartmentOutlined
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import RegisteredLayoutNav from './_RegisteredLayoutNavStyle';
import {
  ACCOUNT_SETTING_PATH,
  INTEREST_PATH,
  LIST_EVENT_ORGANIZER_PATH,
  NOTIFICATION_PATH,
  SAVED_EVENTS_PATH,
  SEARCH_EVENT_PATH,
  SIGNOUT_PATH
} from '../../../config/urls';
import { useAppContext } from '../../../context/AppContext';

const userMenus = (
  <Menu className={RegisteredLayoutNav.UserMenuStyle}>
    <Menu.Item className="user-menu-item">
      <NavLink to={LIST_EVENT_ORGANIZER_PATH}>
        <ApartmentOutlined />
        Event Organizers
      </NavLink>
    </Menu.Item>
    <Menu.Item className="user-menu-item">
      <NavLink to={INTEREST_PATH}>
        <PushpinOutlined />
        Interest Categories
      </NavLink>
    </Menu.Item>
    <Menu.Item className="user-menu-item">
      <NavLink to={SAVED_EVENTS_PATH}>
        <HeartOutlined />
        Saved Events
      </NavLink>
    </Menu.Item>
    <Menu.Item className="user-menu-item">
      <NavLink to={ACCOUNT_SETTING_PATH}>
        <ControlOutlined />
        Accounts Settings
      </NavLink>
    </Menu.Item>
    <Menu.Item className="user-menu-item">
      <NavLink to={SIGNOUT_PATH}>
        <LoginOutlined />
        Sign Out
      </NavLink>
    </Menu.Item>
  </Menu>
);

const Menus = ({ menuClassName }: { menuClassName?: string }) => {
  const { appState } = useAppContext();
  return (
    <div className={menuClassName}>
      <NavLink to={SEARCH_EVENT_PATH} className="navlink">
        <div className="menu-item">
          <SearchOutlined className="icon" />
          SEARCH EVENT
        </div>
      </NavLink>
      <Dropdown className="user-menu" overlay={userMenus} placement="topRight">
        <Button className="user-menu-button">
          <UserOutlined className="icon" />
          {appState.user?.email}
        </Button>
      </Dropdown>
    </div>
  );
};

export const RegisteredLayoutDesktopNav = ({ toggleMobileNav }: { toggleMobileNav: () => void }) => {
  return (
    <div className={RegisteredLayoutNav.RegisteredLayoutDesktopNavStyle}>
      <Menus menuClassName="menu" />
      <NavLink to={NOTIFICATION_PATH} className="navlink">
        <div className="menu-item">
          <BellOutlined className="icon notification-icon" />
        </div>
      </NavLink>
      <Button
        className="burger-button"
        type="default"
        shape="circle"
        icon={<MenuOutlined className="burger-icon" />}
        onClick={toggleMobileNav}
      />
    </div>
  );
};

const MobileMenus = ({ menuClassName }: { menuClassName?: string }) => {
  const { appState } = useAppContext();
  return (
    <div className={menuClassName}>
      <NavLink to={SEARCH_EVENT_PATH} className="navlink">
        <div className="menu-item">
          <SearchOutlined className="icon" />
          Search Event
        </div>
      </NavLink>
      <span className="email-tag">{appState.user?.email}</span>
      <NavLink to={LIST_EVENT_ORGANIZER_PATH} className="navlink">
        <div className="menu-item">
          <ApartmentOutlined className="icon" />
          Event Organizers
        </div>
      </NavLink>
      <NavLink to={INTEREST_PATH} className="navlink">
        <div className="menu-item">
          <PushpinOutlined className="icon" />
          Interest Categories
        </div>
      </NavLink>
      <NavLink to={SAVED_EVENTS_PATH} className="navlink">
        <div className="menu-item">
          <HeartOutlined className="icon" />
          Saved Events
        </div>
      </NavLink>
      <NavLink to={ACCOUNT_SETTING_PATH} className="navlink">
        <div className="menu-item">
          <ControlOutlined className="icon" />
          Accounts Settings
        </div>
      </NavLink>
      <NavLink to={SIGNOUT_PATH} className="navlink">
        <div className="menu-item">
          <LoginOutlined className="icon" />
          Sign Out
        </div>
      </NavLink>
    </div>
  );
};

export const RegisteredLayoutMobileNav = ({ isShow }: { isShow: boolean }) => {
  const menuClassName = isShow ? 'menu show' : 'menu';
  return (
    <div className={RegisteredLayoutNav.RegisteredLayoutMobileNavStyle}>
      <MobileMenus menuClassName={menuClassName} />
    </div>
  );
};
