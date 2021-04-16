import { css } from '@emotion/css';
import { tablets } from '../../assets/theme/breakpoints';
import { primary } from '../../assets/theme/colors';

export const LoadingAppStyle = css`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: flex-start;
  justify-content: center;
  padding-top: 250px;
  @media (min-width: ${tablets}) {
    justify-content: center;
    align-items: center;
    padding-top: 0;
  }

  .content {
    display: flex;
    flex-flow: row;
  }

  .app-load-icon {
    font-size: 30px;
    background: linear-gradient(to right, #c0bcfb, ${primary});
    background-clip: text;
    -webkit-text-fill-color: transparent;
    @media (min-width: ${tablets}) {
      font-size: 50px;
    }
  }

  .spin {
    margin-left: 20px;
    vertical-align: center;
    display: flex;
    align-items: center;
  }
`;
