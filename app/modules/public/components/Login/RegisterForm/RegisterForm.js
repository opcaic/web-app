import { Form, Input, Button, Checkbox } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  isMinLength,
  isRequired,
  isValidEmail,
} from '@/modules/shared/helpers/errors/formValidations';
import LoginFormWrapper from '@/modules/public/components/Login/LoginFormWrapper';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { intlMessages } from '@/modules/public/components/Login/RegisterForm/localization';
import PropTypes from 'prop-types';
import withEnhancedForm from '@/modules/shared/helpers/hocs/withEnhancedForm';
import {
  accountErrorMessageProvider,
  accountIntlMessages,
} from '@/modules/public/helpers/accountHelpers';
import FormErrors from '@/modules/shared/components/FormErrors';
import { compose } from 'redux';
import withPasswordConfirmation from '@/modules/shared/helpers/hocs/withPasswordConfirmation';
import { FormattedMessage } from 'react-intl';
import Reaptcha from 'reaptcha';
import { settings } from '@/modules/shared/helpers/utils';

class RegisterForm extends React.PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  };

  verifyCaptcha = () => {
    this.props.form.setFieldsValue({ captcha: true });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <LoginFormWrapper title={intlGlobal.formatMessage(intlMessages.title)}>
        <Form onSubmit={this.handleSubmit}>
          <FormErrors errors={this.props.errors} />

          <Form.Item style={{ marginBottom: 5 }}>
            {getFieldDecorator('username', {
              validateTrigger: 'onBlur',
              rules: [isRequired('username', accountErrorMessageProvider)],
            })(
              <Input
                placeholder={intlGlobal.formatMessage(
                  accountIntlMessages.username,
                )}
              />,
            )}
          </Form.Item>
          <Form.Item style={{ marginBottom: 5 }}>
            {getFieldDecorator('email', {
              validateTrigger: 'onBlur',
              rules: [
                isValidEmail(),
                isRequired('email', accountErrorMessageProvider),
              ],
            })(
              <Input
                placeholder={intlGlobal.formatMessage(
                  accountIntlMessages.email,
                )}
              />,
            )}
          </Form.Item>
          <Form.Item style={{ marginBottom: 5 }}>
            {getFieldDecorator('password', {
              validateTrigger: 'onBlur',
              rules: [
                isRequired('password', accountErrorMessageProvider),
                isMinLength(8, 'password'),
                {
                  validator: this.props.compareToSecondPassword,
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
          <Form.Item style={{ marginBottom: 15 }}>
            {getFieldDecorator('confirmPassword', {
              validateTrigger: 'onBlur',
              rules: [
                isRequired('confirmPassword', accountErrorMessageProvider),
                {
                  validator: this.props.compareToFirstPassword,
                },
              ],
            })(
              <Input.Password
                onBlur={this.props.handleConfirmPasswordBlur}
                placeholder={intlGlobal.formatMessage(
                  accountIntlMessages.confirmPassword,
                )}
              />,
            )}
          </Form.Item>
          <Form.Item style={{ marginBottom: 5 }}>
            {getFieldDecorator('captcha', {
              rules: [isRequired('captcha', accountErrorMessageProvider)],
            })(
              <Reaptcha
                sitekey={settings.captchaKey}
                onVerify={this.verifyCaptcha}
              />,
            )}
          </Form.Item>
          <Form.Item style={{ marginBottom: 5 }}>
            {getFieldDecorator('privacyPolicy', {
              valuePropName: 'checked',
              normalize: value => value || undefined,
              rules: [isRequired('privacyPolicy', accountErrorMessageProvider)],
            })(
              <Checkbox>
                <FormattedMessage
                  id="app.public.registrationForm.privacyPolicyText"
                  values={{
                    link: (
                      <a href={settings.privacyPolicyUrl} target="_blank">
                        <FormattedMessage id="app.public.registrationForm.privacyPolicyLink" />
                      </a>
                    ),
                  }}
                />
              </Checkbox>,
            )}
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: '100%',
              }}
            >
              {intlGlobal.formatMessage(intlMessages.register)}
            </Button>
            {intlGlobal.formatMessage(intlMessages.alreadyHaveAccount)}{' '}
            <Link to="/login">
              {intlGlobal.formatMessage(intlMessages.login)}
            </Link>
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
  compareToFirstPassword: PropTypes.func.isRequired,
  compareToSecondPassword: PropTypes.func.isRequired,
  handleConfirmPasswordBlur: PropTypes.func.isRequired,
};

export default compose(
  Form.create({
    name: 'register',
  }),
  withEnhancedForm(),
  withPasswordConfirmation(),
)(RegisterForm);
