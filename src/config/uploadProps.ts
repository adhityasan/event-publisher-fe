import { UploadProps } from 'antd';
import localStorage from '../utils/localStorage';
import { UPLOADS_API } from './apiUrls';

export const uploadProps: UploadProps = {
  name: 'file',
  action: UPLOADS_API,
  headers: {
    authorization: `Bearer ${localStorage.accessToken.get()}`
  },
  listType: 'picture-card',
  className: 'avatar-uploader',
  multiple: false
};
