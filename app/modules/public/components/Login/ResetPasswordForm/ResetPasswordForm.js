import { Form, Input, Button, Alert } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginFormWrapper from '@/modules/public/components/Login/LoginFormWrapper';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { intlMessages } from '@/modules/public/components/Login/ResetPasswordForm/localization';
import withEnhancedForm from '@/modules/shared/helpers/hocs/withEnhancedForm';
import {
  isMinLength,
  isRequired,
} from '@/modules/shared/helpers/errors/formValidations';
import {
  accountErrorMessageProvider,
  accountIntlMessages,
} from '@/modules/public/helpers/accountHelpers';

class ResetPasswordForm extends React.PureComponent {
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

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirmPassword'], { force: true });
    }
    callback();
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
            <Link to="/login">
              {intlGlobal.formatMessage(intlMessages.login)}
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
            {getFieldDecorator('password', {
              validateTrigger: 'onBlur',
              rules: [
                isRequired('password', accountErrorMessageProvider),
                isMinLength(8, 'password'),
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(
              <Input.Password
                placeholder={intlGlobal.formatMessage(
                  accountIntlMessages.password,
                )}
              />,
            )}
          </Form.Item>
          <Form.Item style={{ marginBottom: 5 }}>
            {getFieldDecorator('confirmPassword', {
              validateTrigger: 'onBlur',
              rules: [
                isRequired('confirmPassword', accountErrorMessageProvider),
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(
              <Input.Password
                onBlur={this.handleConfirmBlur}
                placeholder={intlGlobal.formatMessage(
                  accountIntlMessages.confirmPassword,
                )}
              />,
            )}
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" block>
              {intlGlobal.formatMessage(intlMessages.resetPassword)}
            </Button>
          </Form.Item>
        </Form>
      </LoginFormWrapper>
    );
  }
}

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func,
  form: PropTypes.object,
  errors: PropTypes.array,
};

export default Form.create({
  name: 'reset_password',
})(withEnhancedForm(ResetPasswordForm));
