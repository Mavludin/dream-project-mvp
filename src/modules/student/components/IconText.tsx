import React from 'react';
import { Space } from 'antd';

type Props = {
  icon: React.FC;
  text: string;
  style: string | undefined;
};

export const IconText = ({ icon, text, style }: Props) => (
  <Space style={{ color: style }}>
    {React.createElement(icon)}
    {text}
  </Space>
);
