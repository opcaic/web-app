import React from 'react';
import { compose } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { Button, Result } from 'antd';
import PropTypes from 'prop-types';
import * as qs from 'query-string';
import NoMenuPageLayout from '@/modules/public/components/layout/NoMenuPageLayout';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';

/* eslint-disable react/prefer-stateless-function */
export class RegistrationSuccessfulPage extends React.PureComponent {
  render() {
    return (
      <NoMenuPageLayout size="medium">
        <Result
          status="success"
          title={<FormattedMessage id="app.registrationSuccessful.title" />}
          subTitle={
            <FormattedHTMLMessage
              id="app.registrationSuccessful.text"
              values={{ email: qs.parse(this.props.location.search).email }}
            />
          }
          extra={[
            <Button type="primary" key="console">
              <Link to="/">
                <FormattedMessage id="app.registrationSuccessful.backToHomepage" />
              </Link>
            </Button>,
          ]}
        />
      </NoMenuPageLayout>
    );
  }
}

RegistrationSuccessfulPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default compose(withRouter)(RegistrationSuccessfulPage);
