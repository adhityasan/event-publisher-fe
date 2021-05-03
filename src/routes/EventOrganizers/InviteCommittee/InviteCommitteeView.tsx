import { Button, Col, List, notification, Row, Select, Spin, Typography } from 'antd';
import QueryString from 'qs';
import React, { memo, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import { UserAddOutlined } from '@ant-design/icons';
import axiosInstance from '../../../axios.instances';
import EoAccessHOC from '../../../components/EoAccessHOC/EoAccessHOC';
import Heading1 from '../../../components/PageHeadings/Heading1';
import { ACTION_INVITE_COMMITTEE_API, USERS_API } from '../../../config/apiUrls';
import { InviteCommitteeStyle } from './_InviteCommitteeStyle';
import { useAppContext } from '../../../context/AppContext';
import { primary } from '../../../assets/theme/colors';

const { Text } = Typography;

const InviteCommitteeView = () => {
  const [userSearchOptions, setUserSearchOptions] = useState<any[]>([]);
  const { appState } = useAppContext();
  const [fetching, setFetching] = useState(false);
  const fetchRef = React.useRef(0);
  const userId = appState.user?._id;
  const [searchValue, setSearchValue] = useState<any>(null);
  const [pendingInvitations, setPendingInvitations] = useState<any[]>([]);

  const fetchPendingInvitations = useMemo(
    () => () => {
      const queryString = QueryString.stringify(
        { organizer: appState.eo_management?.eo._id, status: 'pending' },
        { addQueryPrefix: true }
      );
      axiosInstance.get(ACTION_INVITE_COMMITTEE_API + queryString).then(({ data: respData }) => {
        setPendingInvitations(respData.data);
      });
    },
    [appState.eo_management?.eo._id]
  );

  const handleSearchUser = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setUserSearchOptions([]);
      setFetching(true);

      const querySearch = QueryString.stringify(
        {
          $or: [{ email: { $search: value } }, { name: { $search: value } }],
          _id: {
            $nin: [userId]
          }
        },
        { addQueryPrefix: true }
      );

      axiosInstance.get(USERS_API + querySearch).then(({ data: respData }) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        const buildOptions = respData.data.map((usr: any) => ({
          value: usr._id,
          label: (
            <span>
              <Text strong>{`${usr.email} `}</Text>
              <Text style={{ color: primary, fontSize: '14px' }}>{usr.name}</Text>
            </span>
          )
        }));

        setUserSearchOptions(buildOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, 300);
  }, [userId]);

  const handleInvite = () => {
    const inviteData = {
      organizer: appState.eo_management?.eo._id,
      to: searchValue.value
    };
    axiosInstance
      .post(ACTION_INVITE_COMMITTEE_API, inviteData)
      .then(() => {
        notification.success({
          message: 'Committee invitation sent',
          description: 'you will get notified if theres any respond',
          placement: 'bottomRight'
        });
      })
      .catch((err: Error) => {
        notification.error({
          message: err.message,
          placement: 'bottomRight'
        });
      })
      .finally(() => {
        fetchPendingInvitations();
        setSearchValue(null);
      });
  };

  useEffect(() => {
    fetchPendingInvitations();
  }, [fetchPendingInvitations]);

  return (
    <EoAccessHOC>
      <div className={InviteCommitteeStyle}>
        <Heading1>Invite Committee</Heading1>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <section className="main-section">
              <Row justify="center">
                <Typography.Title level={4}>Search &amp; Invite User as Committee</Typography.Title>
              </Row>
              <Row justify="center">
                <Col xs={24} sm={18} md={12} lg={8}>
                  <Select
                    showSearch
                    labelInValue
                    placeholder="Search user by email or name"
                    onSearch={handleSearchUser}
                    allowClear
                    notFoundContent={fetching ? <Spin size="small" /> : null}
                    style={{ width: '100%' }}
                    options={userSearchOptions}
                    filterOption={false}
                    value={searchValue}
                    onChange={(nvalue: string) => setSearchValue(nvalue)}
                    size="large"
                  />
                </Col>
              </Row>
              <Row justify="center" style={{ marginTop: '20px' }}>
                <Button type="primary" icon={<UserAddOutlined />} disabled={!searchValue} onClick={handleInvite}>
                  Invite as Committee
                </Button>
              </Row>
            </section>
          </Col>
          <Col span={24}>
            <section className="main-section">
              <Row justify="center">
                <Typography.Title level={4}>Pending Invitations List</Typography.Title>
              </Row>
              <Row justify="center">
                <List>
                  {pendingInvitations.map((pi: any) => (
                    <List.Item key={pi._id}>
                      {pi?.to?.email} - {pi?.to?.name}
                    </List.Item>
                  ))}
                </List>
              </Row>
            </section>
          </Col>
        </Row>
      </div>
    </EoAccessHOC>
  );
};

export default memo(InviteCommitteeView);
