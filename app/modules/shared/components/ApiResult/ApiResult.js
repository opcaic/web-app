import React from 'react';
import PropTypes from 'prop-types';
import Spin from '@/modules/shared/components/Spin';
import { Result } from 'antd';
import { FormattedMessage } from 'react-intl';

const ApiResult = props => {
  if (props.error) {
    if (props.error.status === 403) {
      return (
        <Result
          status="403"
          title={<FormattedMessage id="app.shared.apiResult.403title" />}
          subTitle={<FormattedMessage id="app.shared.apiResult.403subTitle" />}
        />
      );
    }

    if (props.error.status === 404) {
      return (
        <Result
          status="404"
          title={<FormattedMessage id="app.shared.apiResult.404title" />}
          subTitle={<FormattedMessage id="app.shared.apiResult.404subTitle" />}
        />
      );
    }

    return (
      <Result
        status="error"
        title={<FormattedMessage id="app.shared.apiResult.genericTitle" />}
        subTitle={
          <FormattedMessage id="app.shared.apiResult.genericSubTitle" />
        }
      />
    );
  }

  if (props.loading) {
    return <Spin spinning={props.loading} />;
  }

  return props.children;
};

ApiResult.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

export default ApiResult;
