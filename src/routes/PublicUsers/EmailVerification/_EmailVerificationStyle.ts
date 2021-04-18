import { css } from '@emotion/css';

export const EmailVerificationStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;

  .verifying-info {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-flow: column wrap;
    min-height: 200px;
    h2 {
      font-weight: bold;
    }
  }

  .page-illustration {
    width: 80%;
    height: 50%;
    max-width: 500px;
    max-height: 500px;
  }
`;
