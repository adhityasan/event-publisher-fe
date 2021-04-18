import React, { memo, useState } from 'react';
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
  const { appState } = useAppContext();
  const [isSiderCollapsed, setIsSiderCollapsed] = useState(false);
  const eoId = appState.eo_management?.eo._id || '';

  const toggleSiderCollapse = () => setIsSiderCollapsed(!isSiderCollapsed);

  return (
    <Layout className={EventOrganizerLayoutStyle} style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={isSiderCollapsed} onCollapse={toggleSiderCollapse} className="eo-sider">
        <div className="eo-sider-logo">
          <h1 className="eo-eventPublish-logo">{isSiderCollapsed ? '  eP' : 'eventPublisher'}</h1>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" className="eo-menu">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to={EO_DASHBOARD_PATH.replace(':eoId', eoId)}>Dashboard</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<CalendarOutlined />} title="Events">
            <Menu.Item key="2">
              <Link to={EO_EVENT_CREATE_PATH.replace(':eoId', eoId)}>Create Event</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to={EO_EVENT_DRAFTED_PATH.replace(':eoId', eoId)}>Drafted Events</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to={EO_EVENT_UPCOMING_PATH.replace(':eoId', eoId)}>Upcominng Events</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to={EO_EVENT_PASSED_PATH.replace(':eoId', eoId)}>Passed Events</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Committee">
            <Menu.Item key="7">
              <Link to={EO_COMMITTEE_LIST_PATH.replace(':eoId', eoId)}>Committee List</Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link to={EO_COMMITTEE_INVITE_PATH.replace(':eoId', eoId)}>Invite Committee</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<IdcardOutlined />}>
            <Link to={EO_CERTIFICATION_PATH.replace(':eoId', eoId)}>Certification</Link>
          </Menu.Item>
          <Menu.Item key="10" icon={<ExpandOutlined />}>
            <Link to={EO_PREVIEW_PATH.replace(':eoId', eoId)}>E.O Preview</Link>
          </Menu.Item>
          <Menu.Item key="11" icon={<SettingOutlined />}>
            <Link to={EO_SETTINGS_PATH.replace(':eoId', eoId)}>E.O Settings</Link>
          </Menu.Item>
          <Menu.Item key="12" icon={<PoweroffOutlined />}>
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
            <a href="https://github.com/adhityasan/event-publisher-fe">eventPublisher ©2020</a>
          </Tooltip>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default memo(EventOrganizerLayoutView);
