import { Form, Input, Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginFormWrapper from '@/modules/public/components/Login/LoginFormWrapper';
import { intl } from '@/modules/shared/helpers/IntlGlobalProvider';
import { intlMessages } from '@/modules/public/components/Login/ForgotPasswordForm/localization';
import withEnhancedForm from '@/modules/shared/helpers/hocs/withEnhancedForm';
import FormErrors from '@/modules/shared/components/FormErrors';
import {
  accountErrorMessageProvider,
  accountIntlMessages,
} from '@/modules/public/helpers/accountHelpers';
import { isRequired } from '@/modules/shared/helpers/errors/formValidations';

class ForgotPasswordForm extends React.PureComponent {
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
          title={intl.formatMessage(intlMessages.title)}
          withAvatar={false}
        >
          <div style={{ marginBottom: 20 }}>
            {intl.formatMessage(intlMessages.resultText)}
          </div>

          <Button type="default" htmlType="button" block>
            <Link to="/">
              {intl.formatMessage(intlMessages.backToHomepage)}
            </Link>
          </Button>
        </LoginFormWrapper>
      );
    }

    return (
      <LoginFormWrapper
        title={intl.formatMessage(intlMessages.title)}
        withAvatar={false}
      >
        <div style={{ marginBottom: 20 }}>
          {intl.formatMessage(intlMessages.description)}
        </div>

        <Form onSubmit={this.handleSubmit}>
          <FormErrors errors={this.props.errors} />

          <Form.Item style={{ marginBottom: 10 }}>
            {getFieldDecorator('email', {
              rules: [isRequired('email', accountErrorMessageProvider)],
            })(
              <Input
                placeholder={intl.formatMessage(accountIntlMessages.email)}
                size="large"
              />,
            )}
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" block>
              {intl.formatMessage(intlMessages.sendPasswordResetEmail)}
            </Button>
          </Form.Item>
        </Form>
      </LoginFormWrapper>
    );
  }
}

ForgotPasswordForm.propTypes = {
  onSubmit: PropTypes.func,
  form: PropTypes.object,
  errors: PropTypes.array,
};

export default Form.create({
  name: 'forgot_password',
})(withEnhancedForm(ForgotPasswordForm));