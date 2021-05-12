import React, { useEffect, useState } from 'react';
import { Button, Col, DatePicker, Form, Input, notification, Row, Select } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Dragger from 'antd/lib/upload/Dragger';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { useParams } from 'react-router';
import EoAccessHOC from '../../../components/EoAccessHOC/EoAccessHOC';
import Heading1 from '../../../components/PageHeadings/Heading1';
import { uploadProps } from '../../../config/uploadProps';
import { CreateEventStyle } from './_CreateEventStyle';
import axiosInstance from '../../../axios.instances';
import { EVENTS_API, MASTER_EVENT_CATEGORIES_API, MASTER_EVENT_FORMATS_API } from '../../../config/apiUrls';
import { setPictureUrl, setSelectOptions } from '../../../utils/helpers';
import PlaceAutoComplete from '../../../components/PlaceAutoComplete/PlaceAutoComplete';
import Map from '../../../components/Map/Map';
import Marker from '../../../components/Map/Marker';

const formLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 }
};

const CreateEventView = () => {
  const [categoriesOptions, setCategoriesOptions] = useState<any[]>([]);
  const [formatOptions, setFormatOptions] = useState<any[]>([]);
  const [geolocation, setGeolocation] = useState<any>(null);
  const [isPublish, setIsPublish] = useState(true);
  const [form] = Form.useForm();
  const { eoId } = useParams<{ eoId: string }>();

  useEffect(() => {
    axiosInstance.get(MASTER_EVENT_CATEGORIES_API, { params: { $limit: 50 } }).then(({ data }) => {
      const categoriesData: any[] = data?.data || [];
      const options = setSelectOptions(categoriesData, 'category', '_id');
      setCategoriesOptions(options);
    });
    axiosInstance.get(MASTER_EVENT_FORMATS_API, { params: { $limit: 50 } }).then(({ data }) => {
      const categoriesData: any[] = data?.data || [];
      const options = setSelectOptions(categoriesData, 'format', '_id');
      setFormatOptions(options);
    });
  }, []);

  const onPlaceSelected = (place: string) => {
    // set location field value first
    form.setFieldsValue({ location: place });

    if (place) {
      geocodeByAddress(place)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          setGeolocation({ type: 'Point', coordinates: [lng, lat] });
          // set location field value first
        })
        // eslint-disable-next-line no-console
        .catch(console.error);
    } else {
      setGeolocation(null);
    }
  };

  const handleSaveAsDraft = () => {
    setIsPublish(false);
    form.submit();
  };

  const onSubmit = (values: any) => {
    const preparedData = {
      ...values,
      organizer: eoId,
      bannerUrl: setPictureUrl(values.bannerUrl.file.response.id),
      eventCategories: values.eventCategories.map((opt: any) => opt.value),
      eventFormats: values.eventFormats.map((opt: any) => opt.value),
      startDate: values.startDate.unix(),
      endDate: values.endDate.unix(),
      startTime: values.startTime.format('hh:mm a'),
      endTime: values.endTime.format('hh:mm a'),
      location: values.location.label,
      geolocation: geolocation,
      isPublish: isPublish
    };

    axiosInstance
      .post(EVENTS_API, preparedData)
      .then(() => {
        const message = isPublish ? 'Event Saved & Published' : 'Event Saved as Draft';
        const description = isPublish ? 'You can see your event in upcoming events' : 'You can see your event in drafted events';
        notification.success({
          message,
          description,
          placement: 'bottomRight'
        });
        setIsPublish(true);
        setGeolocation(null);
        form.resetFields();
      })
      .catch((err: Error) => {
        notification.error({
          message: err.message,
          placement: 'bottomRight'
        });
      });
  };

  return (
    <EoAccessHOC>
      <div className={CreateEventStyle}>
        <Heading1>Create Event</Heading1>
        <section className="main-section">
          <Form form={form} {...formLayout} name="create-event-form" className="create-event-form" onFinish={onSubmit}>
            <Row gutter={[12, 12]} justify="start">
              <Col xs={24} md={12} lg={7} className="for-column">
                <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input event title!' }]}>
                  <Input placeholder="event title" />
                </Form.Item>
                <Form.Item label="Subtitle" name="subtitle">
                  <Input placeholder="event subtitle" />
                </Form.Item>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[{ required: true, message: 'Please input event description!' }]}
                >
                  <Input.TextArea rows={4} className="full-width" placeholder="event description" />
                </Form.Item>
                <Form.Item label="Content" name="content">
                  <Input.TextArea rows={4} className="full-width" placeholder="event content [optional]" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={7} className="for-column">
                <Form.Item label="Start Date" name="startDate" rules={[{ required: true, message: 'Please input start date!' }]}>
                  <DatePicker className="full-width" placeholder="event start date" />
                </Form.Item>
                <Form.Item label="End Date" name="endDate" rules={[{ required: true, message: 'Please input end date!' }]}>
                  <DatePicker className="full-width" placeholder="event end date" />
                </Form.Item>
                <Form.Item label="Start Time" name="startTime" rules={[{ required: true, message: 'Please input start time!' }]}>
                  <DatePicker.TimePicker showSecond={false} className="full-width" placeholder="event start time" />
                </Form.Item>
                <Form.Item label="End Time" name="endTime" rules={[{ required: true, message: 'Please input end time!' }]}>
                  <DatePicker.TimePicker showSecond={false} className="full-width" placeholder="event end time" />
                </Form.Item>
                <Form.Item
                  label="Categories"
                  name="eventCategories"
                  rules={[{ required: true, message: 'Please choose categories!' }]}
                >
                  <Select
                    showSearch
                    mode="multiple"
                    labelInValue
                    placeholder="choose categories"
                    options={categoriesOptions}
                    filterOption={(input, option: any) =>
                      option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                      option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  />
                </Form.Item>
                <Form.Item label="Formats" name="eventFormats" rules={[{ required: true, message: 'Please choose format!' }]}>
                  <Select
                    showSearch
                    mode="multiple"
                    labelInValue
                    placeholder="choose formats"
                    options={formatOptions}
                    filterOption={(input, option: any) =>
                      option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                      option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={10} className="for-column">
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
                <Form.Item label="Event Location" name="location">
                  <PlaceAutoComplete onSelect={onPlaceSelected} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                {geolocation && (
                  <Map
                    width="100%"
                    height="255px"
                    id="event-location-preview"
                    center={
                      geolocation
                        ? {
                            lat: geolocation.coordinates[1],
                            lng: geolocation.coordinates[0]
                          }
                        : undefined
                    }
                    zoom={geolocation ? 15 : 10}
                  >
                    <Marker lat={geolocation?.coordinates[1] || 0} lng={geolocation?.coordinates[0] || 0} text="location" />
                  </Map>
                )}
              </Col>
            </Row>
            <Row gutter={[12, 12]} style={{ marginTop: '20px' }} justify="end">
              <Col>
                <Button type="ghost" htmlType="button" size="large" onClick={() => handleSaveAsDraft()}>
                  Save as Draft
                </Button>
              </Col>
              <Col>
                <Button type="primary" htmlType="submit" size="large">
                  Submit &amp; Publish Event
                </Button>
              </Col>
            </Row>
          </Form>
        </section>
      </div>
    </EoAccessHOC>
  );
};

export default CreateEventView;
