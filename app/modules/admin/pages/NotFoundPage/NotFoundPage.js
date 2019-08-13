import React from 'react';
import { Result, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

/* eslint-disable react/prefer-stateless-function */
class NotFoundPage extends React.PureComponent {
  render() {
    return (
      <Result
        status="404"
        title="404"
        subTitle={<FormattedMessage id="app.admin.notFound.text" />}
        extra={
          <Button type="primary">
            <Link to="/admin">
              <FormattedMessage id="app.admin.notFound.backToDashboard" />
            </Link>
          </Button>
        }
      />
    );
  }
}

export default NotFoundPage;
