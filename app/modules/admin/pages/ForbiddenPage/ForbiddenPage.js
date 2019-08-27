import React from 'react';
import { Result, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

/* eslint-disable react/prefer-stateless-function */
class ForbiddenPage extends React.PureComponent {
  render() {
    return (
      <Result
        status="403"
        title="403"
        subTitle={<FormattedMessage id="app.admin.forbidden.text" />}
        extra={
          <Button type="primary">
            <Link to="/admin">
              <FormattedMessage id="app.admin.forbidden.backToDashboard" />
            </Link>
          </Button>
        }
      />
    );
  }
}

export default ForbiddenPage;
