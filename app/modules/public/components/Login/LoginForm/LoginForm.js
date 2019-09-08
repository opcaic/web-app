import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginFormWrapper from '@/modules/public/components/Login/LoginFormWrapper';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { intlMessages } from '@/modules/public/components/Login/LoginForm/localization';
import withEnhancedForm from '@/modules/shared/helpers/hocs/withEnhancedForm';
import { isRequired } from '@/modules/shared/helpers/errors/formValidations';
import {
  accountErrorMessageProvider,
  accountIntlMessages,
} from '@/modules/public/helpers/accountHelpers';
import FormErrors from '@/modules/shared/components/FormErrors';

class LoginForm extends React.PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <LoginFormWrapper title={intlGlobal.formatMessage(intlMessages.title)}>
        <Form onSubmit={this.handleSubmit}>
          <FormErrors errors={this.props.errors} />

          <Form.Item style={{ marginBottom: 10 }}>
            {getFieldDecorator('email', {
              validateTrigger: 'onBlur',
              rules: [isRequired('email', accountErrorMessageProvider)],
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder={intlGlobal.formatMessage(
                  accountIntlMessages.email,
                )}
                size="large"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              validateTrigger: 'onBlur',
              rules: [isRequired('password', accountErrorMessageProvider)],
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder={intlGlobal.formatMessage(
                  accountIntlMessages.password,
                )}
                size="large"
              />,
            )}
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            {getFieldDecorator('rememberMe', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>
                {intlGlobal.formatMessage(intlMessages.rememberMe)}
              </Checkbox>,
            )}
            <Link to="/forgot-password" style={{ float: 'right' }}>
              {intlGlobal.formatMessage(intlMessages.forgotPassword)}
            </Link>
            <Button type="primary" htmlType="submit" block>
              {intlGlobal.formatMessage(intlMessages.login)}
            </Button>
            {intlGlobal.formatMessage(intlMessages.noAccountYet)}{' '}
            <Link to="/register">
              {intlGlobal.formatMessage(intlMessages.register)}
            </Link>
          </Form.Item>
        </Form>
      </LoginFormWrapper>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  form: PropTypes.object,
  errors: PropTypes.array,
};

export default Form.create({
  name: 'login',
})(withEnhancedForm(LoginForm));
