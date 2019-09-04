import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Avatar } from 'antd';

const AvatarContainer = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
`;

const LoginFormWrapper = ({ children, title, withAvatar }) => (
  <div>
    {withAvatar && (
      <AvatarContainer>
        <Avatar size={80} icon="user" style={{ backgroundColor: '#87d068' }} />
      </AvatarContainer>
    )}

    <Title>{title}</Title>
    {children}
  </div>
);

LoginFormWrapper.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  withAvatar: PropTypes.bool,
};

LoginFormWrapper.defaultProps = {
  withAvatar: true,
};

export default LoginFormWrapper;
