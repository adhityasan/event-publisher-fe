import { ContainerOutlined, HeartOutlined, LikeOutlined, ShareAltOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Avatar, Card } from 'antd';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { tablets } from '../../assets/theme/breakpoints';
import { DETAIL_EVENT_PATH } from '../../config/urls';
import { useEventContext } from '../../context/EventContext';

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
  const { setEventState } = useEventContext();
  const onShare = () => {
    const showModalShareEvent = true;
    const focusEvent = {
      _id: id,
      title,
      bannerUrl,
      subtitle,
      description,
      organizer
    };
    setEventState({ showModalShareEvent, focusEvent });
  };
  return (
    <Card
      className={EventCardStyle}
      cover={<img className="cover-img" title={description} alt={title} src={bannerUrl} />}
      actions={[
        <ContainerOutlined title="register" key="registration" />,
        <LikeOutlined title="like" key="like" />,
        <HeartOutlined title="save" key="save" />,
        <ShareAltOutlined onClickCapture={onShare} title="share" key="share" />
      ]}
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
