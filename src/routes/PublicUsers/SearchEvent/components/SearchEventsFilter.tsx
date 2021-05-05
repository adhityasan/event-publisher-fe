import { Card, Row, Col, Input, Form, Select, Checkbox, Button, Switch, Divider } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FilterOutlined, LoadingOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
import { requestUserLocation, setSelectOptions } from '../../../../utils/helpers';
import axiosInstance from '../../../../axios.instances';
import { MASTER_EVENT_CATEGORIES_API, MASTER_EVENT_FORMATS_API } from '../../../../config/apiUrls';
import { searchEventFilterStyle } from '../_SearchEventsStyle';
import { useAppContext } from '../../../../context/AppContext';
import localStorage from '../../../../utils/localStorage';

const formLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 }
};

interface SearchEventsFilterProps {
  handleFilter: (passedQueryFilter: any, callback?: any) => void;
}

const SearchEventsFilter: React.FC<SearchEventsFilterProps> = ({ handleFilter }) => {
  const { setAppState } = useAppContext();
  const [categoriesOptions, setCategoriesOptions] = useState<any[]>([]);
  const [onlineFormatId, setOnlineFormatId] = useState<string>('');
  const [fetching, setFetching] = useState(false);
  const fetchRef = useRef(0);
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    const queryFilter: { [key: string]: any } = {};
    if (values.eventCategories && values.eventCategories.length > 0) {
      queryFilter.eventCategories = { $in: values.eventCategories.map((category: any) => category.value) };
    }
    if (values.isOnline) {
      queryFilter.eventFormats = { $in: [onlineFormatId] };
    }
    if (values.isNear) {
      const geolocation = localStorage.geolocation.get();
      queryFilter.geolocation = {
        $near: {
          $maxDistance: 10000,
          $geometry: {
            type: 'Point',
            coordinates: [geolocation?.lng, geolocation?.lat]
          }
        }
      };
      queryFilter.geometry = true;
    }

    handleFilter(queryFilter);
  };

  const handleSearch = useMemo(() => {
    const loadEvents = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setFetching(true);
      form.resetFields();

      const query = {
        $or: [{ title: { $search: value } }, { subtitle: { $search: value } }]
      };
      handleFilter(query, () => {
        if (fetchId !== fetchRef.current) {
          return;
        }

        setFetching(false);
      });
    };
    return debounce(loadEvents, 600);
  }, [handleFilter, form]);

  const onNearEvents = (geolocation: any, location: string) => {
    setAppState({ location: location, geolocation: geolocation });
  };

  useEffect(() => {
    // Get masters data
    axiosInstance.get(MASTER_EVENT_CATEGORIES_API, { params: { $limit: 50 } }).then(({ data: respData }) => {
      const categoriesData: any[] = respData?.data || [];
      const options = setSelectOptions(categoriesData, 'category', '_id');
      setCategoriesOptions(options);
    });
    axiosInstance.get(MASTER_EVENT_FORMATS_API, { params: { $limit: 1, format: 'online' } }).then(({ data: respData }) => {
      setOnlineFormatId(respData.data[0]._id);
    });
  }, []);

  return (
    <Card className={searchEventFilterStyle} title="Filter Events" extra={<a href="#filter-events">More</a>}>
      <Row gutter={[12, 12]} justify="center">
        <Col span={24}>
          <Input.Search
            placeholder="Search by keyword"
            onChange={(e: any) => handleSearch(e.target.value)}
            style={{ width: '100%' }}
            allowClear
          />
        </Col>
        <Divider style={{ margin: '15px 0 5px 0' }} />
        <Col span={24}>
          <Form form={form} {...formLayout} name="create-event-form" className="create-event-form" onFinish={handleSubmit}>
            <Form.Item label="Filter By Categories" name="eventCategories">
              <Select
                showSearch
                mode="multiple"
                labelInValue
                placeholder="Filter by categories"
                options={categoriesOptions}
                filterOption={(input, option: any) =>
                  option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                  option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              />
            </Form.Item>
            <Form.Item label="Online Events Only" name="isOnline" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item name="isNear" valuePropName="checked" noStyle>
              <Checkbox onChange={() => requestUserLocation(onNearEvents)}>Near My Location</Checkbox>
            </Form.Item>
            <Row justify="end" style={{ marginTop: '20px' }}>
              <Button type="primary" htmlType="submit" icon={fetching ? <LoadingOutlined /> : <FilterOutlined />} block>
                Filter Events
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};

export default SearchEventsFilter;
