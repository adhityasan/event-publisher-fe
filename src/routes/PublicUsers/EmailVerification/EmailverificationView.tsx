import { Spin } from 'antd';
import axios, { AxiosError } from 'axios';
import React, { useCallback, useEffect } from 'react';
import { Modal } from 'antd';
import { useHistory } from 'react-router';
import { ReactComponent as UndrawIdeation } from '../../../assets/svg/undraw_ideation.svg';
import { EMAIL_VERIFICATION_API } from '../../../config/apiUrls';
import { useQuery } from '../../../utils/hooks/useQuery';
import { EmailVerificationStyle } from './_EmailVerificationStyle';
import { SIGNIN_PATH } from '../../../config/urls';

const EmailverificationView = () => {
  const query = useQuery();
  const history = useHistory();

  const onSuccess = useCallback(
    (email: string) => {
      Modal.success({
        title: 'Email Verification Success',
        content: `${email} has been verified!`,
        okCancel: false,
        okText: 'Signin To My Account',
        width: 350,
        onOk: () => history.push(SIGNIN_PATH),
        autoFocusButton: 'ok'
      });
    },
    [history]
  );

  const onError = useCallback(
    (errorMessage: string) => {
      Modal.error({
        title: 'Something Went Wrong',
        content: errorMessage,
        onOk: () => history.push(SIGNIN_PATH),
        autoFocusButton: 'ok'
      });
    },
    [history]
  );

  useEffect(() => {
    const verifyUrl = EMAIL_VERIFICATION_API;
    const verifyToken = query.get('verifyToken');
    axios
      .get(verifyUrl, { params: { verifyToken } })
      .then(({ data }) => onSuccess(data?.email))
      .catch((error: AxiosError) => {
        const erroMessage = error?.response?.data?.message || error.message;
        onError(erroMessage);
      });
  }, [query, onSuccess, onError]);

  return (
    <div className={EmailVerificationStyle}>
      <div className="verifying-info">
        <h2>Verifying Your Email...</h2>
        <Spin className="spin" size="large" />
      </div>
      <UndrawIdeation className="page-illustration" />
    </div>
  );
};

export default EmailverificationView;
