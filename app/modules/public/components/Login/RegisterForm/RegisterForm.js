import { Form, Input, Button } from 'antd';
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
      form.validateFields(['confirmPassword'], { force: true });
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
};

export default Form.create({
  name: 'register',
})(withEnhancedForm(RegisterForm));
