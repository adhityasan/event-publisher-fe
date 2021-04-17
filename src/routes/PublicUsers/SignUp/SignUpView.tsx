import React from 'react';
import { Row, Col } from 'antd';
import { ReactComponent as UndrawLogic } from '../../../assets/svg/undraw_logic.svg';
import { SignUpStyle } from './_SignUpStyle';
import SignupForm from './SignUpForm';

const SignInView = () => {
  return (
    <div className={SignUpStyle}>
      <Row justify="center">
        <Col md={12} lg={14}>
          <UndrawLogic className="page-illustration" />
        </Col>
        <Col sm={24} md={12} lg={10} className="form-column">
          <div className="form-wrapper">
            <SignupForm />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignInView;
