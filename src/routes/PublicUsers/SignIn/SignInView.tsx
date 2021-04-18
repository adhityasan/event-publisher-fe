import React from 'react';
import { Row, Col } from 'antd';
import { ReactComponent as UndrawSafe } from '../../../assets/svg/undraw_safe.svg';
import { SignInStyle } from './_SignInStyle';
import SigninForm from './SignInForm';

const SignInView = () => {
  return (
    <div className={SignInStyle}>
      <Row justify="center">
        <Col md={12} lg={14}>
          <UndrawSafe className="page-illustration" />
        </Col>
        <Col sm={24} md={12} lg={10} className="form-column">
          <div className="form-wrapper">
            <SigninForm />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignInView;
