import React, { useEffect, useState } from 'react';
import { Layout, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { PublicLayoutStyle } from './_RegisteredLayoutStyle';
import { PublicLayoutDesktopNav, PublicLayoutMobileNav } from './components/RegisteredLayoutNav';

const { Content, Header } = Layout;

const RegisteredLayoutView = ({ children }: any) => {
  const [isShowMobileNav, setIsShowMobileNav] = useState(false);

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
  }, []);

  return (
    <div className={PublicLayoutStyle}>
      <Layout>
        <Header id="public-header" className="header">
          <Row gutter={[12, 12]}>
            <Col span={8}>
              <Link to="/">
                <h1 className="eventPublish-logo">eventPublisher</h1>
              </Link>
            </Col>
            <Col span={16}>
              <PublicLayoutDesktopNav toggleMobileNav={toggleMobileNav} />
            </Col>
            <Col span={24}>
              <PublicLayoutMobileNav isShow={isShowMobileNav} />
            </Col>
          </Row>
        </Header>
        <Content className="content">{children}</Content>
      </Layout>
    </div>
  );
};

export default RegisteredLayoutView;
