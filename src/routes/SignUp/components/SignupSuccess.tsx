import React, { memo } from 'react';
import { SignupSuccessStyle } from './_SignupSuccessStyle';

const SignupSuccess = () => {
  return (
    <div className={SignupSuccessStyle}>
      <div className="description">
        <span>Great! We&#39;ve already sign you up,</span>
        <span>Now you can signin into the app</span>
      </div>
    </div>
  );
};

export default memo(SignupSuccess);
