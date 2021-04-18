import { css } from '@emotion/css';
import UndrawLikeDislike from '../../../assets/svg/undraw_like_dislike.svg';
import { tablets } from '../../../assets/theme/breakpoints';

export const InterestStyle = css`
  display: flex;
  align-items: center;
  flex-flow: column;
  padding: 40px 0px;
  background: url(${UndrawLikeDislike});
  background-repeat: no-repeat;
  background-position: left bottom;
  height: calc(100vh - 64px);
  @media (min-width: ${tablets}) {
    padding: 80px 0px;
  }

  h1 {
    text-align: center;
  }

  .interestPicker {
    background: rgba(255, 255, 255, 0.7);
    margin-top: 20px;
    padding: 20px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 600px;
    flex-flow: row wrap;
  }

  .next-wrapper {
    padding: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;
