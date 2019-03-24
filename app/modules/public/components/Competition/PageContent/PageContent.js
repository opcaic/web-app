import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
const { Title } = Typography;

const PageContent = props => (
  <div
    className="container"
    style={{
      padding: '10px 25px',
      background: '#fff',
      minHeight: 280,
      marginTop: 30,
    }}
  >
    <Title>{props.title}</Title>
    {props.children}
  </div>
);

PageContent.propTypes = {
  children: PropTypes.any,
  title: PropTypes.node.isRequired,
};

export default PageContent;
