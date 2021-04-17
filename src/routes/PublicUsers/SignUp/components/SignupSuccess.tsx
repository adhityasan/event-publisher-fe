import React, { memo } from 'react';
import { SignupSuccessStyle } from './_SignupSuccessStyle';

const SignupSuccess = () => {
  return (
    <div className={SignupSuccessStyle}>
      <div className="description">
        <span>Great! We&#39;ve already sign you up,</span>
        <span>
          <b>We have sent some link to your email,</b> Please open the link to verify your account
        </span>
      </div>
    </div>
  );
};

export default memo(SignupSuccess);
