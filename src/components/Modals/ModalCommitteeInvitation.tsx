import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, Col, Modal, Row, Typography } from 'antd';
import React, { memo } from 'react';
import axiosInstance from '../../axios.instances';
import { API_URL } from '../../config/app';

interface ModalCommitteeInvitationProps {
  isVisible: boolean;
  data: any;
  handleClose: () => void;
}

const ModalCommitteeInvitation: React.FC<ModalCommitteeInvitationProps> = ({ isVisible, data, handleClose }) => {
  const handleAcceptance = () => {
    axiosInstance.patch(API_URL + data.detailPath, { status: 'accepted' }).then(() => {
      handleClose();
    });
  };

  const handleRejection = () => {
    axiosInstance.patch(API_URL + data.detailPath, { status: 'rejected' }).then(() => {
      handleClose();
    });
  };

  return (
    <Modal title="Committee Invitation" visible={isVisible} footer={null} onCancel={handleClose}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Typography.Text>{data?.message || ''}</Typography.Text>
        </Col>
        <Col span={24}>
          <Row gutter={[12, 12]} justify="end">
            <Col span={12}>
              <Button type="primary" icon={<CloseCircleOutlined />} danger block onClick={handleRejection}>
                Reject Invitation
              </Button>
            </Col>
            <Col span={12}>
              <Button type="primary" icon={<CheckCircleOutlined />} block onClick={handleAcceptance}>
                Accept Invitation
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};

export default memo(ModalCommitteeInvitation);
