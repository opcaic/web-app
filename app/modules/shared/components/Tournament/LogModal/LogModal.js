import React from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledPre = styled.pre`
  word-break: break-all;
  word-wrap: break-word;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  padding: 5px;
  font-size: 13px;
`;

const LogModal = ({ log, ...rest }) => (
  <Modal width={700} bodyStyle={{ padding: 15 }} {...rest}>
    <StyledPre>{log}</StyledPre>
  </Modal>
);

LogModal.propTypes = {
  log: PropTypes.string,
};

export default LogModal;
