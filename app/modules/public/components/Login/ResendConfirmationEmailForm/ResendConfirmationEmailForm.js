import { Form, Input, Button, Alert } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginFormWrapper from '@/modules/public/components/Login/LoginFormWrapper';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { intlMessages } from '@/modules/public/components/Login/ResendConfirmationEmailForm/localization';
import withEnhancedForm from '@/modules/shared/helpers/hocs/withEnhancedForm';
import {
  isRequired,
  isValidEmail,
} from '@/modules/shared/helpers/errors/formValidations';
import {
  accountErrorMessageProvider,
  accountIntlMessages,
} from '@/modules/public/helpers/accountHelpers';
import { compose } from 'redux';

class ResendConfirmationEmailForm extends React.PureComponent {
  state = {
    hasResult: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSubmit(values, this.successCallback);
      }
    });
  };

  successCallback = () => {
    this.setState({ hasResult: true });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    if (this.state.hasResult) {
      return (
        <LoginFormWrapper
          title={intlGlobal.formatMessage(intlMessages.title)}
          withAvatar={false}
        >
          <div style={{ marginBottom: 20 }}>
            {intlGlobal.formatMessage(intlMessages.resultText)}
          </div>

          <Button type="primary" htmlType="button" block>
            <Link to="/">
              {intlGlobal.formatMessage(intlMessages.backToHomepage)}
            </Link>
          </Button>
        </LoginFormWrapper>
      );
    }

    return (
      <LoginFormWrapper
        title={intlGlobal.formatMessage(intlMessages.title)}
        withAvatar={false}
      >
        <Form onSubmit={this.handleSubmit}>
          {this.props.errors && (
            <div style={{ marginBottom: 10 }}>
              {this.props.errors.map((x, key) => (
                // eslint-disable-next-line react/no-array-index-key
                <Alert message={x} key={key} type="error" />
              ))}
            </div>
          )}

          <Form.Item style={{ marginBottom: 5 }}>
            {getFieldDecorator('email', {
              validateTrigger: 'onBlur',
              rules: [
                isRequired('email', accountErrorMessageProvider),
                isValidEmail(accountErrorMessageProvider),
              ],
            })(
              <Input
                placeholder={intlGlobal.formatMessage(
                  accountIntlMessages.email,
                )}
              />,
            )}
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" block>
              {intlGlobal.formatMessage(intlMessages.resendEmail)}
            </Button>
          </Form.Item>
        </Form>
      </LoginFormWrapper>
    );
  }
}

ResendConfirmationEmailForm.propTypes = {
  onSubmit: PropTypes.func,
  form: PropTypes.object,
  errors: PropTypes.array,
};

export default compose(
  Form.create({
    name: 'resend_confirmation_email',
  }),
  withEnhancedForm(),
)(ResendConfirmationEmailForm);
