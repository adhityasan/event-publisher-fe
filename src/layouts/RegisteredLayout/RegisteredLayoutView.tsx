import React, { useEffect, useState } from 'react';
import { Layout, Col, Row } from 'antd';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { RegisteredLayoutStyle } from './_RegisteredLayoutStyle';
import { RegisteredLayoutDesktopNav, RegisteredLayoutMobileNav } from './components/RegisteredLayoutNav';
import ModalCommitteeInvitation from '../../components/Modals/ModalCommitteeInvitation';
import { useAppContext } from '../../context/AppContext';

const { Content, Header } = Layout;

const RegisteredLayoutView = ({ children }: any) => {
  const location = useLocation();
  const history = useHistory();
  const [isShowMobileNav, setIsShowMobileNav] = useState(false);
  const { appState } = useAppContext();

  const toggleMobileNav = () => {
    setIsShowMobileNav(!isShowMobileNav);
  };

  const listenScrollEvent = () => {
    const publicHeaderDOM = document.getElementById('public-header');
    if (publicHeaderDOM) {
      if (window.scrollY > 25) {
        publicHeaderDOM.setAttribute('class', 'ant-layout-header header scrolled');
      } else {
        publicHeaderDOM.setAttribute('class', 'ant-layout-header header');
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
    return () => {
      window.removeEventListener('scroll', listenScrollEvent);
    };
  }, []);

  const handleCloseModal = () => {
    history.push(location.pathname);
  };

  return (
    <div className={RegisteredLayoutStyle}>
      <Layout>
        <Header id="public-header" className="header">
          <Row gutter={[12, 12]}>
            <Col span={8}>
              <Link to="/">
                <h1 className="eventPublish-logo">eventPublisher</h1>
              </Link>
            </Col>
            <Col span={16}>
              <RegisteredLayoutDesktopNav toggleMobileNav={toggleMobileNav} />
            </Col>
            <Col span={24}>
              <RegisteredLayoutMobileNav isShow={isShowMobileNav} />
            </Col>
          </Row>
        </Header>
        <Content className="content">{children}</Content>
      </Layout>
      <ModalCommitteeInvitation
        isVisible={location.hash === '#committee-invitation'}
        handleClose={handleCloseModal}
        data={appState.hashModalData}
      />
    </div>
  );
};

export default RegisteredLayoutView;
