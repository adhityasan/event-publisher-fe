import React, { memo, useRef } from 'react';
import { InboxOutlined, LeftCircleOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, notification, Row, Upload } from 'antd';
import { Link } from 'react-router-dom';
import Heading1 from '../../../components/PageHeadings/Heading1';
import { LIST_EVENT_ORGANIZER_PATH } from '../../../config/urls';
import { CreateEventOrganizerStyle } from './CreateEventOrganizerStyle';
import { setPictureUrl } from '../../../utils/helpers';
import { EVENT_ORGANIZER_API } from '../../../config/apiUrls';
import axiosInstance from '../../../axios.instances';
import { uploadProps } from '../../../config/uploadProps';

const { Dragger } = Upload;

const CreateEventOrganizerView = () => {
  const resetButton = useRef<HTMLButtonElement>(null);

  const onSubmit = (values: any) => {
    const preparedData = {
      name: values.name,
      description: values.description,
      content: values.content,
      contact: {
        email: values.email,
        phone: values.phone
      },
      pictureUrl: setPictureUrl(values.pictureUrl.file.response.id)
    };
    axiosInstance
      .post(EVENT_ORGANIZER_API, preparedData)
      .then(() => {
        notification.success({
          message: 'Creaet Event Organizer Success',
          description:
            'you can back to list event organizers to manage event organizer that you just create, or stay in this page to create new event organizer',
          placement: 'bottomRight',
          duration: 7000
        });
        if (resetButton) {
          resetButton.current?.click();
        }
      })
      .catch((err: Error) => {
        notification.error({
          message: 'Create Event Organizer Failed',
          description: err.message,
          placement: 'bottomRight'
        });
      });
  };

  return (
    <div className={CreateEventOrganizerStyle}>
      <Row>
        <Col xs={24} sm={12}>
          <Heading1>Create Event Organizers</Heading1>
        </Col>
        <Col xs={24} sm={12} className="row-heading-action">
          <Link to={LIST_EVENT_ORGANIZER_PATH}>
            <Button size="large" type="ghost" icon={<LeftCircleOutlined />}>
              Event Organizer List
            </Button>
          </Link>
        </Col>
      </Row>
      <section className="section">
        <div className="form-wrapper">
          <div className="note">
            <i>* E.O stands for event organizer</i>
          </div>
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} layout="horizontal" onFinish={onSubmit}>
            <Form.Item name="name" label="E.O Name" rules={[{ required: true, message: 'input event organizer name!' }]}>
              <Input placeholder="event organizer name" />
            </Form.Item>
            <Form.Item
              name="description"
              label="E.O Description"
              rules={[{ required: true, message: 'input event organizer description!' }]}
            >
              <Input.TextArea rows={2} placeholder="simply describe your event organizer" />
            </Form.Item>
            <Form.Item name="content" label="E.O Content" rules={[{ required: true, message: 'input event organizer content!' }]}>
              <Input.TextArea rows={7} placeholder="anything you can tell about your event organizer" />
            </Form.Item>
            <Form.Item name="email" label="Email Contact" rules={[{ required: true, message: 'input event organizer email!' }]}>
              <Input placeholder="email contact" />
            </Form.Item>
            <Form.Item name="phone" label="Phone Contact" rules={[{ required: true, message: 'input event organizer phone!' }]}>
              <Input placeholder="phone contact" />
            </Form.Item>
            <Form.Item name="pictureUrl" label="E.O Logo" rules={[{ required: true, message: 'input event organizer logo!' }]}>
              <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                  upload your event organizer logo or profile picture, it will be you event organizer identifier
                </p>
              </Dragger>
            </Form.Item>
            <Row>
              <Col xs={24} sm={12} style={{ textAlign: 'right' }}>
                <Button ref={resetButton} size="large" type="dashed" htmlType="reset" danger>
                  Reset Form
                </Button>
              </Col>
              <Col xs={24} sm={12} style={{ textAlign: 'right' }}>
                <Button size="large" type="primary" htmlType="submit">
                  Create Event Organizer
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </section>
    </div>
  );
};

export default memo(CreateEventOrganizerView);
