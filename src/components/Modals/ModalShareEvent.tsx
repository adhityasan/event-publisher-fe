import { CopyOutlined, FacebookFilled, LinkOutlined, MailOutlined, TwitterCircleFilled } from '@ant-design/icons';
import { Button, Col, Input, Modal, Row, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { APP_URL } from '../../config/app';

interface IModalShareEventProps {
  isVisible: boolean;
  event: any;
  toggler: () => void;
}

const ModalShareEvent: React.FC<IModalShareEventProps> = ({ isVisible, event, toggler }) => {
  const eventUrl = APP_URL + '/event/' + event?._id;
  const tweetUrl = `https://twitter.com/intent/tweet?url=${eventUrl}`;
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isVisible === false) {
      setIsCopied(false);
    }
  }, [isVisible]);

  return (
    <Modal title="Share Event" visible={isVisible} footer={null} width="440px" onCancel={toggler}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Input.Search
            addonBefore={<LinkOutlined />}
            defaultValue={eventUrl}
            value={eventUrl}
            enterButton={
              <Button
                icon={
                  <Tooltip placement="rightTop" title={isCopied ? 'copied' : 'copy to clipboard'}>
                    <CopyToClipboard text={eventUrl} onCopy={() => setIsCopied(true)}>
                      <CopyOutlined style={{ cursor: 'pointer' }} />
                    </CopyToClipboard>
                  </Tooltip>
                }
              />
            }
          />
        </Col>
        <Col xs={24} span={8}>
          <Button
            href={tweetUrl}
            type="primary"
            className="full-width"
            style={{ background: 'rgb(29, 161, 242)', border: 'none' }}
            icon={<TwitterCircleFilled />}
          >
            Twitter
          </Button>
        </Col>
        <Col xs={24} span={8}>
          <Button
            type="primary"
            className="full-width"
            style={{ background: '#3B5998', border: 'none' }}
            icon={<FacebookFilled />}
          >
            Facebook
          </Button>
        </Col>
        <Col xs={24} span={8}>
          <Button type="primary" className="full-width" style={{ background: '#ED548A', border: 'none' }} icon={<MailOutlined />}>
            Email
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalShareEvent;
