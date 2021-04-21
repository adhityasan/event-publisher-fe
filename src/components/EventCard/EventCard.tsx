import { HeartOutlined, LikeOutlined, ShareAltOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Avatar, Card } from 'antd';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { tablets } from '../../assets/theme/breakpoints';
import { DETAIL_EVENT_PATH } from '../../config/urls';

interface EventCardProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bannerUrl: string;
  organizer: any;
}

const { Meta } = Card;

const EventCardStyle = css`
  width: 100%;
  @media (min-width: ${tablets}) {
    width: 100%;
    height: 315px;
  }
  .ant-card-cover {
    display: flex;
    justify-content: center;
    background: #211d4a;
    height: 170px;
    overflow: hidden;
  }
  .cover-img {
    height: 100%;
    width: auto;
  }
  .ant-card-meta-title,
  .ant-card-meta-description {
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    overflow: hidden;
  }
`;

const EventCard: React.FC<EventCardProps> = ({ id, title, bannerUrl, subtitle, description, organizer }) => {
  return (
    <Card
      className={EventCardStyle}
      cover={<img className="cover-img" title={description} alt={title} src={bannerUrl} />}
      actions={[<LikeOutlined key="like" />, <HeartOutlined key="save" />, <ShareAltOutlined key="share" />]}
    >
      <Meta
        avatar={<Avatar src={organizer.pictureUrl} />}
        title={<Link to={DETAIL_EVENT_PATH.replace(':eventId', id)}>{title}</Link>}
        description={subtitle}
      />
    </Card>
  );
};

export default memo(EventCard);
