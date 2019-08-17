import React from 'react';
import { Spin as AntdSpin } from 'antd';
import PropTypes from 'prop-types';

const Spin = props => {
  const { renderInside, children, ...rest } = props;

  if (renderInside === true) {
    return <AntdSpin {...rest}>{children}</AntdSpin>;
  }

  if (props.spinning === true) {
    return <AntdSpin {...rest} />;
  }

  return <div>{children}</div>;
};

Spin.propTypes = {
  children: PropTypes.node,
  renderInside: PropTypes.bool,
  spinning: PropTypes.bool.isRequired,
};

Spin.defaultProps = {
  renderInside: false,
};

export default Spin;
