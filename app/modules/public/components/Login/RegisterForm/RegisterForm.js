import { Form, Input, Button, Alert } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {
  isMinLength,
  isValidEmail,
} from '@/modules/shared/helpers/errors/formValidations';
import LoginFormWrapper from '@/modules/public/components/Login/LoginFormWrapper';
import { intl } from '@/modules/shared/helpers/IntlGlobalProvider';
import { intlMessages } from '@/modules/public/components/Login/RegisterForm/localization';
import PropTypes from 'prop-types';
import withEnhancedForm from '@/modules/shared/helpers/hocs/withEnhancedForm';

class RegisterForm extends React.PureComponent {
  state = {
    confirmDirty: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
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
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState(prevState => ({
      confirmDirty: prevState.confirmDirty || !!value,
    }));
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <LoginFormWrapper title={intl.formatMessage(intlMessages.title)}>
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
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: (
                    <FormattedMessage id="app.registrationForm.usernameRequired" />
                  ),
                },
              ],
            })(
              <Input placeholder={intl.formatMessage(intlMessages.username)} />,
            )}
          </Form.Item>
          <Form.Item style={{ marginBottom: 5 }}>
            {getFieldDecorator('email', {
              rules: [
                isValidEmail(),
                {
                  required: true,
                  message: (
                    <FormattedMessage id="app.registrationForm.emailRequired" />
                  ),
                },
              ],
            })(<Input placeholder={intl.formatMessage(intlMessages.email)} />)}
          </Form.Item>
          <Form.Item style={{ marginBottom: 5 }}>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: (
                    <FormattedMessage id="app.registrationForm.passwordRequired" />
                  ),
                },
                isMinLength(8, 'password'),
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(
              <Input.Password
                placeholder={intl.formatMessage(intlMessages.password)}
              />,
            )}
          </Form.Item>
          <Form.Item style={{ marginBottom: 5 }}>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: (
                    <FormattedMessage id="app.registrationForm.confirmPasswordRequired" />
                  ),
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(
              <Input.Password
                onBlur={this.handleConfirmBlur}
                placeholder={intl.formatMessage(intlMessages.confirmPassword)}
              />,
            )}
          </Form.Item>
          {/* <Form.Item>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
              <Checkbox>
                I have read the <Link to="/agreement">agreement</Link>
              </Checkbox>,
            )}
          </Form.Item> */}
          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: '100%',
              }}
            >
              <FormattedMessage id="app.registrationForm.register" />
            </Button>
            {intl.formatMessage(intlMessages.alreadyHaveAccount)}{' '}
            <Link to="/login">{intl.formatMessage(intlMessages.login)}</Link>
          </Form.Item>
        </Form>
      </LoginFormWrapper>
    );
  }
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
  form: PropTypes.object,
  errors: PropTypes.array,
};

export default Form.create({
  name: 'register',
})(withEnhancedForm(RegisterForm));
