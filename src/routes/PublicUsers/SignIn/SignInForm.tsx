import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { INTEREST_PATH, SIGNUP_PATH } from '../../../config/urls';
import { SIGNIN_API } from '../../../config/apiUrls';
import { useAppContext } from '../../../context/AppContext';
import localStorage from '../../../utils/localStorage';
import axiosInstance from '../../../axios.instances';
import { useSocketContext } from '../../../context/SocketContext';
import { emitAuthentication } from '../../../sockets.api/Authentication';
import { subsNotification } from '../../../sockets.api/NotificationsSocket';
import { useNotificationsContext } from '../../../context/NotificationContext';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 18 }
};

const SigninForm = () => {
  const { socket } = useSocketContext();
  const { setNotification } = useNotificationsContext();
  const { updateAppState } = useAppContext();
  const history = useHistory();

  const onFinish = (values: any) => {
    axiosInstance
      .post(SIGNIN_API, {
        email: values?.email,
        password: values?.password,
        strategy: 'local'
      })
      .then(({ data }) => {
        // socket.io client authentication
        emitAuthentication(socket, data?.accessToken).then(() => {
          subsNotification(socket, (data: any) => {
            // set notification data to notificationContext
            setNotification(data);
            // show notification
            notification.info({
              message: data.message,
              placement: 'topRight',
              top: 74,
              duration: 8
            });
          });
        });
        // set local storage accessToken
        if (!localStorage.accessToken.isExist()) {
          localStorage.accessToken.init();
          localStorage.accessToken.set(data?.accessToken);
        }
        // set app context initial value
        updateAppState({ accessToken: data?.accessToken, auth: true, user: data?.user });
        // REDIRECT TO INTEREST PAGE IF USER DOESN'T HAVE INTEREST CATEGORIES
        if (data?.user?.interest && data?.user?.interest?.length === 0) {
          history.push(INTEREST_PATH);
        }
      })
      .catch((err: Error) => {
        notification.error({
          message: err.message,
          placement: 'bottomRight'
        });
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
