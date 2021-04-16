import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import { SIGNUP_PATH } from '../../config/urls';
import { SIGNIN_API } from '../../config/apiUrls';
import { useAppContext } from '../../context/AppContext';
import localStorage from '../../utils/localStorage';
import axiosInstance from '../../axios.instances';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 18 }
};

const SigninForm = () => {
  const { updateAppState } = useAppContext();

  const onFinish = (values: any) => {
    axiosInstance
      .post(SIGNIN_API, {
        email: values?.email,
        password: values?.password,
        strategy: 'local'
      })
      .then(({ data }) => {
        updateAppState({ accessToken: data?.accessToken, auth: true, user: data?.user });
        localStorage.accessToken.init();
        localStorage.accessToken.set(data?.accessToken);
      });
  };

  const onFinishFailed = () => {};

  return (
    <Form {...layout} name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Sign in
        </Button>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Link to={SIGNUP_PATH}>Doesn&#39;t have an account ?</Link>
      </Form.Item>
    </Form>
  );
};

export default SigninForm;
