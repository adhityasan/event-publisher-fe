import React, { memo } from 'react';
import {
  CalendarOutlined,
  ExpandOutlined,
  IdcardOutlined,
  PieChartOutlined,
  PoweroffOutlined,
  SettingOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { Avatar, Layout, Menu, Tooltip } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Link } from 'react-router-dom';
import { EventOrganizerLayoutStyle } from './EventOrganizerLayoutStyle';
import { useAppContext } from '../../context/AppContext';
import {
  LIST_EVENT_ORGANIZER_PATH,
  EO_EVENT_CREATE_PATH,
  EO_DASHBOARD_PATH,
  EO_EVENT_DRAFTED_PATH,
  EO_EVENT_UPCOMING_PATH,
  EO_EVENT_PASSED_PATH,
  EO_COMMITTEE_LIST_PATH,
  EO_COMMITTEE_INVITE_PATH,
  EO_CERTIFICATION_PATH,
  EO_PREVIEW_PATH,
  EO_SETTINGS_PATH
} from '../../config/urls';

const { Header, Content, Footer, Sider } = Layout;

const EventOrganizerLayoutView = ({ children }: any) => {
  const { appState, setAppState } = useAppContext();
  const eoId = appState.eo_management?.eo._id || '';
  const activeMenu = appState.eo_management_active_menu || 'eo-dashboard';

  const toggleSiderCollapse = () => {
    setAppState({ eo_management_sider_collapse: !appState.eo_management_sider_collapse });
  };

  const setActiveMenu = (key: string) => {
    setAppState({ eo_management_active_menu: key });
  };

  return (
    <Layout className={EventOrganizerLayoutStyle} style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={!!appState.eo_management_sider_collapse}
        onCollapse={toggleSiderCollapse}
        className="eo-sider"
      >
        <div className="eo-sider-logo">
          <h1 className="eo-eventPublish-logo">{!!appState.eo_management_sider_collapse ? '  eP' : 'eventPublisher'}</h1>
        </div>
        <Menu theme="dark" selectedKeys={[activeMenu]} mode="inline" className="eo-menu">
          <Menu.Item key="eo-dashboard" icon={<PieChartOutlined />} onClick={() => setActiveMenu('eo-dashboard')}>
            <Link to={EO_DASHBOARD_PATH.replace(':eoId', eoId)}>Dashboard</Link>
          </Menu.Item>
          <SubMenu key="eo-events" icon={<CalendarOutlined />} title="Events">
            <Menu.Item key="eo-events-create" onClick={() => setActiveMenu('eo-events-create')}>
              <Link to={EO_EVENT_CREATE_PATH.replace(':eoId', eoId)}>Create Event</Link>
            </Menu.Item>
            <Menu.Item key="eo-events-drafted" onClick={() => setActiveMenu('eo-events-drafted')}>
              <Link to={EO_EVENT_DRAFTED_PATH.replace(':eoId', eoId)}>Drafted Events</Link>
            </Menu.Item>
            <Menu.Item key="eo-events-upcoming" onClick={() => setActiveMenu('eo-events-upcoming')}>
              <Link to={EO_EVENT_UPCOMING_PATH.replace(':eoId', eoId)}>Upcoming Events</Link>
            </Menu.Item>
            <Menu.Item key="eo-events-passed" onClick={() => setActiveMenu('eo-events-passed')}>
              <Link to={EO_EVENT_PASSED_PATH.replace(':eoId', eoId)}>Passed Events</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="eo-committee" icon={<TeamOutlined />} title="Committee">
            <Menu.Item key="eo-committee-list" onClick={() => setActiveMenu('eo-committee-list')}>
              <Link to={EO_COMMITTEE_LIST_PATH.replace(':eoId', eoId)}>Committee List</Link>
            </Menu.Item>
            <Menu.Item key="eo-committee-invite" onClick={() => setActiveMenu('eo-committee-invite')}>
              <Link to={EO_COMMITTEE_INVITE_PATH.replace(':eoId', eoId)}>Invite Committee</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="eo-certification" onClick={() => setActiveMenu('eo-certification')} icon={<IdcardOutlined />}>
            <Link to={EO_CERTIFICATION_PATH.replace(':eoId', eoId)}>Certification</Link>
          </Menu.Item>
          <Menu.Item key="eo-preview" onClick={() => setActiveMenu('eo-preview')} icon={<ExpandOutlined />}>
            <Link to={EO_PREVIEW_PATH.replace(':eoId', eoId)}>E.O Preview</Link>
          </Menu.Item>
          <Menu.Item key="eo-setttings" onClick={() => setActiveMenu('eo-setttings')} icon={<SettingOutlined />}>
            <Link to={EO_SETTINGS_PATH.replace(':eoId', eoId)}>E.O Settings</Link>
          </Menu.Item>
          <Menu.Item key="eo-signout" onClick={() => setActiveMenu('eo-dashboard')} icon={<PoweroffOutlined />}>
            <Link to={LIST_EVENT_ORGANIZER_PATH.replace(':eoId', eoId)}>E.O Signout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="eo-header">
          <Avatar shape="square" size="large" src={appState.eo_management?.eo.pictureUrl} />
        </Header>
        <Content className="eo-content">{children}</Content>
        <Footer className="eo-footer">
          <Tooltip placement="top" title="by kao: @adhityasnjy">
            <a href="https://github.com/adhityasan/event-publisher-fe">event publisher ©2021</a>
          </Tooltip>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default memo(EventOrganizerLayoutView);
