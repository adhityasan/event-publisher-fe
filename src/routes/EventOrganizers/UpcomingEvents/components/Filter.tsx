import { DisconnectOutlined, FilterOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import axiosInstance from '../../../../axios.instances';
import { MASTER_EVENT_CATEGORIES_API, MASTER_EVENT_FORMATS_API } from '../../../../config/apiUrls';
import { setSelectOptions } from '../../../../utils/helpers';

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

interface IFilterProps {
  onFilter: (filterValues: any) => void;
}

const Filter: React.FC<IFilterProps> = ({ onFilter }) => {
  const [categoriesOptions, setCategoriesOptions] = useState<any[]>([]);
  const [formatOptions, setFormatOptions] = useState<any[]>([]);

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

  return (
    <Form {...formLayout} name="create-event-form" className="create-event-form" onFinish={onFilter}>
      <Row gutter={[12, 12]} justify="start">
        <Col xs={24} md={12} lg={8} className="for-column">
          <Form.Item label="Search" name="search">
            <Input.Search placeholder="search event title or subtitle" />
          </Form.Item>
          <Form.Item label="Event Date" name="date">
            <DatePicker.RangePicker placeholder={['starts from', 'until']} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={8} className="for-column">
          <Form.Item label="Categories" name="eventCategories">
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
          <Form.Item label="Formats" name="eventFormats">
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
        <Col xs={24} md={12} lg={8} className="for-column">
          <Row gutter={[12, 12]} justify="start">
            <Col xs={24} md={12}>
              <Button type="ghost" htmlType="reset" danger className="full-width" icon={<DisconnectOutlined />}>
                Reset Filter
              </Button>
            </Col>
            <Col xs={24} md={12}>
              <Button type="primary" htmlType="submit" className="full-width" icon={<FilterOutlined />}>
                Filter Data
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default memo(Filter);
