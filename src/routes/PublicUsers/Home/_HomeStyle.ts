import { css } from '@emotion/css';
import { tablets } from '../../../assets/theme/breakpoints';

export const HomeStyle = css`
  .carousel-event {
    height: 300px;
    position: relative;
    display: flex;
    @media (min-width: ${tablets}) {
      height: 500px;
    }
  }

  .info {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 10px;
    border-radius: 8px;
    background: rgb(103, 93, 250, 0.8);
    position: absolute;
    color: #fff;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    @media (min-width: ${tablets}) {
      top: 10px;
      left: 10px;
      bottom: unset;
      width: auto;
    }

    .info-title {
      font-weight: 900;
      text-transform: capitalize;
      font-size: 15px;
      margin-right: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      @media (min-width: ${tablets}) {
        font-size: 20px;
      }
    }
    .info-subtitle {
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: 700;
      color: #b0b0ff;
    }
  }

  .banner {
    height: 100%;
    border-radius: 0.5rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
    background-color: #201d4a;
    img {
      height: fit-content;
      width: 100%;
    }

    @media (min-width: ${tablets}) {
      border-radius: 0.5rem;
      img {
        height: 100%;
        width: auto;
      }
    }
  }
`;
