import React from 'react';
import dayjs from 'dayjs';
import { Image, Table } from 'antd';
import { css } from '@emotion/css';
import { ColumnProps } from 'antd/lib/table';
import PreviewImageSVG from '../../../../assets/svg/preview_image.svg';

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
      <div style={{ padding: '10px' }}>
        <Image
          width={80}
          src={PreviewImageSVG}
          preview={{
            src: bannerUrl
          }}
        />
      </div>
    )
  }
];

interface ITableProps {
  data: any;
}
const UpcomingEventsTable: React.FC<ITableProps> = ({ data }) => {
  return (
    <div className={TableStyle}>
      <Table columns={columns} className="table-striped-rows" rowKey="_id" dataSource={data} scroll={{ x: 1500, y: 500 }} />
    </div>
  );
};

export default UpcomingEventsTable;
