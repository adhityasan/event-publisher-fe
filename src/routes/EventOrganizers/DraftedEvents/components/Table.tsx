import React from 'react';
import dayjs from 'dayjs';
import { Button, Image, notification, Popconfirm, Table } from 'antd';
import { css } from '@emotion/css';
import { ColumnProps } from 'antd/lib/table';
import { UploadOutlined } from '@ant-design/icons';
import PreviewImageSVG from '../../../../assets/svg/preview_image.svg';
import axiosInstance from '../../../../axios.instances';
import { EVENTS_API } from '../../../../config/apiUrls';

export const TableStyle = css`
  thead th {
    color: #ffffff;
    font-weight: bold;
    text-align: center;
    background-color: #001529;

    .ant-checkbox-wrapper {
      display: none;
    }
  }

  tbody td {
    text-align: center;
  }
  .table-striped-rows tr:nth-child(2n) td {
    background-color: #fbfbfb;
  }
  .table-striped-rows .ant-table-row-selected td {
    background-color: #dcf5ff !important;
  }
  .table-striped-rows thead {
    background-color: #f1f1f1;
  }
  .resiCountColumn {
    max-width: 100px;
    .resiCountButton {
      color: #ffffff;
      font-weight: bold;
      font-size: 15px;
      background-color: #047210;
    }
  }
`;

const onPublish = (eventId: string, eventTitle: string) => {
  axiosInstance.patch(`${EVENTS_API}/${eventId}`, { isPublished: true }).then(() => {
    notification.success({
      message: `Event: ${eventTitle} Published`,
      description: 'your event has been published to public and can be searched from events page',
      placement: 'bottomRight'
    });
  });
};

const columns: ColumnProps<any>[] = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    width: 200,
    fixed: 'left'
  },
  {
    title: 'Subtitle',
    dataIndex: 'subtitle',
    key: 'subtitle'
  },
  {
    title: 'Date',
    dataIndex: 'startDate',
    key: 'startDate',
    render: (startDate: number, record: any) =>
      `${dayjs.unix(startDate).format('DD/MM/YYYY')} - ${dayjs.unix(record?.endDate).format('DD/MM/YYYY')}`
  },
  {
    title: 'Time',
    dataIndex: 'startTime',
    key: 'startTime',
    render: (startTime: number, record: any) => `${startTime} - ${record?.endTime}`
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location'
  },
  {
    title: 'Banner',
    dataIndex: 'bannerUrl',
    key: 'bannerUrl',
    render: (bannerUrl: string) => (
      <Image
        width={80}
        src={PreviewImageSVG}
        preview={{
          src: bannerUrl
        }}
      />
    )
  },
  {
    title: 'Action',
    dataIndex: '_id',
    key: '_id',
    width: 200,
    fixed: 'right',
    render: (id: string, record: any) => {
      const eventTitle = record?.title;
      return (
        <>
          <Popconfirm
            placement="top"
            title={'are you sure want to publish ?'}
            onConfirm={() => onPublish(id, eventTitle)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="dashed" icon={<UploadOutlined />}>
              Publish
            </Button>
          </Popconfirm>
        </>
      );
    }
  }
];

interface ITableProps {
  data: any;
}
const DraftedEventsTable: React.FC<ITableProps> = ({ data }) => {
  return (
    <div className={TableStyle}>
      <Table columns={columns} className="table-striped-rows" rowKey="_id" dataSource={data} scroll={{ x: 1500, y: 500 }} />
    </div>
  );
};

export default DraftedEventsTable;
