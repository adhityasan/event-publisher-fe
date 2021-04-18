import React, { useEffect, useState } from 'react';
import { StarOutlined, PlusCircleOutlined, ProjectOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, List, notification, Row } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import axiosInstance from '../../../axios.instances';
import { EVENT_ORGANIZER_API } from '../../../config/apiUrls';
import { useAppContext } from '../../../context/AppContext';
import Heading1 from '../../../components/PageHeadings/Heading1';
import { ListEventOrganizerStyle } from './_ListEventOrganizerStyle';
import { CREATE_EVENT_ORGANIZER_PATH, DETAIL_EVENT_ORGANIZER_NO_ID_PATH, EO_PATH_NO_ID } from '../../../config/urls';

const ListEventOrganizerView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { appState, setAppState } = useAppContext();
  const history = useHistory();

  useEffect(() => {
    axiosInstance
      .get(EVENT_ORGANIZER_API, { params: { creator: appState.user?._id, $limit: 50 } })
      .then(({ data }) => {
        setAppState({ users_event_organizers: data.data });
      })
      .catch((error: Error) => {
        notification.error({
          message: error.message
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [appState.user?._id, setAppState]);

  const handleSigninEO = (eoId: string) => {
    history.push(EO_PATH_NO_ID + eoId);
  };

  return (
    <div className={ListEventOrganizerStyle}>
      <Row>
        <Col xs={24} sm={12}>
          <Heading1>Event Organizers List</Heading1>
        </Col>
        <Col xs={24} sm={12} className="row-heading-action">
          <Link to={CREATE_EVENT_ORGANIZER_PATH}>
            <Button size="large" type="ghost" icon={<PlusCircleOutlined />}>
              Create Event Organizer
            </Button>
          </Link>
        </Col>
      </Row>
      <section>
        <List
          itemLayout="vertical"
          size="large"
          loading={isLoading}
          pagination={{
            pageSize: 3
          }}
          dataSource={appState?.users_event_organizers || []}
          footer={
            <div>
              <b>event organizers</b> you participated in: {appState?.users_event_organizers?.length || 0}
            </div>
          }
          renderItem={(item) => (
            <List.Item
              key={item._id}
              actions={[
                <Button key="list-vertical-favorit-o" type="text" icon={<StarOutlined />}>
                  favorit
                </Button>,
                <Button
                  key="list-vertical-manage-o"
                  type="text"
                  icon={<ProjectOutlined />}
                  onClick={() => handleSigninEO(item._id)}
                >
                  manage
                </Button>
              ]}
              extra={<img width={272} alt="logo" src={item.pictureUrl} />}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.pictureUrl} />}
                title={<Link to={DETAIL_EVENT_ORGANIZER_NO_ID_PATH}>{item?.name}</Link>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      </section>
    </div>
  );
};

export default ListEventOrganizerView;
