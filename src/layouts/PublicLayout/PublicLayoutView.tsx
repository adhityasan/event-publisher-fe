import React, { useEffect, useState } from 'react';
import { Layout, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { PublicLayoutStyle } from './_PublicLayoutStyle';
import { PublicLayoutDesktopNav, PublicLayoutMobileNav } from './components/PublicLayoutNav';

const { Content, Header } = Layout;

const PublicLayoutView = ({ children }: any) => {
  const [headerClassName, setHeaderClaassName] = useState('header');
  const [isShowMobileNav, setIsShowMobileNav] = useState(false);

  const toggleMobileNav = () => {
    setIsShowMobileNav(!isShowMobileNav);
  };

  const listenScrollEvent = () => {
    if (window.scrollY > 25) {
      setHeaderClaassName('header scrolled');
    } else {
      setHeaderClaassName('header');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
  });

  return (
    <div className={PublicLayoutStyle}>
      <Layout>
        <Header className={headerClassName}>
          <Row>
            <Col span={8}>
              <Link to="/">
                <h1 className="eventPublish-logo">eventPublish</h1>
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

export default PublicLayoutView;
