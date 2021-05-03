import { CloseOutlined, ReadOutlined } from '@ant-design/icons';
import { Anchor, Avatar, Button, List } from 'antd';
import React, { memo } from 'react';
import axiosInstance from '../../axios.instances';
import { NOTIFICATIONS_API } from '../../config/apiUrls';
import { useAppContext } from '../../context/AppContext';
import { useNotificationsContext } from '../../context/NotificationContext';
import { NotificationListStyle } from './_NotificationListStyle';

const { Item } = List;
const { Link } = Anchor;

interface INotificationItemProps {
  notif: NotificationsContext.INotification;
  index: number;
  handleRead: (notifIndex: number) => void;
  handleClose: (notifIndex: number) => void;
  handleOpen: (data: any, notifIndex: number) => void;
}

export const NotificationItem: React.FC<INotificationItemProps> = ({ notif, index, handleRead, handleClose, handleOpen }) => (
  <Item
    actions={[
      <Button key="mark-notification-as-read" type="link" onClick={() => handleRead(index)} icon={<ReadOutlined />} />,
      <Button key="close-notification" type="link" onClick={() => handleClose(index)} icon={<CloseOutlined />} />
    ]}
  >
    <List.Item.Meta
      avatar={<Avatar>{notif.from.name[0] + notif.from.name[1]}</Avatar>}
      title={
        <Anchor onClick={() => handleOpen(notif, index)}>
          <Link href={notif.hash} title={notif.from.name} />
        </Anchor>
      }
      description={notif.message}
    />
  </Item>
);

const NotificationList = () => {
  const { setAppState } = useAppContext();
  const { notifications, updateNotifications } = useNotificationsContext();

  const handleRead = (index: number) => {
    axiosInstance.patch(`${NOTIFICATIONS_API}/${notifications[index]._id}`, { isOpened: true });
    handleClose(index);
  };

  const handleClose = (index: number) => {
    const nextNotifications = [...notifications];
    nextNotifications.splice(index, 1);
    updateNotifications(nextNotifications);
  };

  const handleOpen = (data: any, notifIndex: number) => {
    setAppState({ hashModalData: data });
    handleRead(notifIndex);
  };

  return (
    <List
      className={NotificationListStyle}
      dataSource={notifications}
      itemLayout="horizontal"
      renderItem={(notif, index) => (
        <NotificationItem
          key={notif._id}
          index={index}
          notif={notif}
          handleRead={handleRead}
          handleClose={handleClose}
          handleOpen={handleOpen}
        />
      )}
    />
  );
};

export default memo(NotificationList);
