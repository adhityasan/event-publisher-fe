import { css } from '@emotion/css';
import React, { memo } from 'react';
import { primary } from '../../assets/theme/colors';

interface InterestTagProps {
  category: string;
  isChecked?: boolean;
  onClick?: () => void;
}

const InterestTagWrapperStyle = css`
  padding: 5px;

  .interest-tag {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 10px;
    background: #fff;
    color: ${primary};
    border: 1px solid ${primary};
    cursor: pointer;
    span {
      text-transform: capitalize;
    }
  }

  .checked {
    color: #fff;
    background: rgb(102, 93, 245, 0.8);
  }
`;

const InterestTag: React.FC<InterestTagProps> = ({ category, isChecked, onClick }) => {
  return (
    <div className={InterestTagWrapperStyle} onClick={onClick}>
      <div className={isChecked ? 'interest-tag checked' : 'interest-tag'}>
        <span>{category}</span>
      </div>
    </div>
  );
};

export default memo(InterestTag);
