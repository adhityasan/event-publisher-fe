import React, { useMemo, useState, useRef } from 'react';
import { Upload, Row, Col, Form, Select, Typography, Spin } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import QueryString from 'qs';
import { debounce } from 'lodash';
import { uploadProps } from '../../../config/uploadProps';
import EoAccessHOC from '../../../components/EoAccessHOC/EoAccessHOC';
import Heading1 from '../../../components/PageHeadings/Heading1';
import { CertificationsStyle } from './_CertificationsStyle';
import axiosInstance from '../../../axios.instances';
import { EVENTS_API } from '../../../config/apiUrls';
import { useAppContext } from '../../../context/AppContext';

const { Dragger } = Upload;
const { Text } = Typography;

const formLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 }
};

const CertificationsView = () => {
  const { appState } = useAppContext();
  const [eventId, setEventId] = useState();
  const [eventSearchOptions, setEventSearchOptions] = useState<any[]>([]);
  const [form] = Form.useForm();
  const fetchRef = useRef(0);
  const [fetching, setFetching] = useState(false);

  const handleSearchEvent = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setEventSearchOptions([]);
      setFetching(true);

      const querySearch = QueryString.stringify(
        {
          $or: [{ title: { $search: value } }, { subtitle: { $search: value } }],
          organizer: appState.eo_management?.eo._id
        },
        { addQueryPrefix: true }
      );

      axiosInstance.get(EVENTS_API + querySearch).then(({ data: respData }) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        const buildOptions = respData.data.map((event: any) => ({
          value: event._id,
          label: (
            <span>
              <Text>{`${event.title} `}</Text>
            </span>
          )
        }));

        setEventSearchOptions(buildOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, 300);
  }, [appState.eo_management?.eo._id]);

  const onSubmit = () => {};

  const handleChange = (value: any) => {
    console.log(eventId);
    setEventId(value?.value || null);
  };

  return (
    <EoAccessHOC>
      <div className={CertificationsStyle}>
        <Heading1>Certification</Heading1>
        <section className="main-section">
          <Form form={form} {...formLayout} name="certification-form" className="certification-form" onFinish={onSubmit}>
            <Row align="middle" justify="center">
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item
                  name="bannerUrl"
                  label="Banner Image"
                  rules={[{ required: true, message: 'input event organizer logo!' }]}
                  valuePropName="file"
                >
                  <Dragger {...uploadProps}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">upload your event banner , it will be your event identifier</p>
                  </Dragger>
                </Form.Item>
                <Form.Item
                  name="event"
                  label="Event to Certify"
                  rules={[{ required: true, message: 'input event organizer logo!' }]}
                  valuePropName="file"
                >
                  <Select
                    showSearch
                    labelInValue
                    placeholder="Search event"
                    onSearch={handleSearchEvent}
                    allowClear
                    notFoundContent={fetching ? <Spin size="small" /> : null}
                    style={{ width: '100%' }}
                    options={eventSearchOptions}
                    filterOption={false}
                    onChange={(nvalue: string) => handleChange(nvalue)}
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </section>
      </div>
    </EoAccessHOC>
  );
};

export default CertificationsView;
