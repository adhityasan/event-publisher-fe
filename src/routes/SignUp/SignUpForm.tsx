import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Button, Modal } from 'antd';
import { SIGNIN_PATH } from '../../config/urls';
import { SIGNUP_API } from '../../config/apiUrls';
import SignupSuccess from './components/SignupSuccess';
import axiosInstance from '../../axios.instances';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

const SignupForm = () => {
  const history = useHistory();

  const onSuccess = () => {
    Modal.success({
      title: 'Signup Success',
      content: <SignupSuccess />,
      okCancel: false,
      okText: 'Signin To My Account',
      width: 350,
      onOk: () => history.push(SIGNIN_PATH)
    });
  };

  const onError = (errorMessage: string) => {
    Modal.error({
      title: 'Something Went Wrong',
      content: errorMessage
    });
  };

  const onFinish = (value: any) => {
    axiosInstance
      .post(SIGNUP_API, {
        email: value.email,
        password: value.password,
        name: value.name
      })
      .then(() => {
        onSuccess();
      })
      .catch((err: Error) => {
        onError(err.message);
      });
  };
  const onFinishFailed = () => {};

  return (
    <Form {...layout} name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="confirm-password"
        rules={[{ required: true, message: 'Please confirm your password again!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Sign up
        </Button>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Link to={SIGNIN_PATH}>Already have an account ?</Link>
      </Form.Item>
    </Form>
  );
};

export default SignupForm;
