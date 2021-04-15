import { css } from '@emotion/css';
import { primary } from '../../assets/theme/colors';

export const LoadingAppStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  .content {
    display: flex;
    flex-flow: row;
  }

  .app-load-icon {
    font-size: 50px;
    background: linear-gradient(to right, #c0bcfb, ${primary});
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .spin {
    margin-left: 20px;
    vertical-align: center;
    display: flex;
    align-items: center;
  }
`;
