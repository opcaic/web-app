import { Layout } from 'antd';
import React from 'react';

export default function PageLayout(props) {
  return (
    <Layout className="layout" style={{ height: '100vh' }}>
      {props.children}
    </Layout>
  );
}
