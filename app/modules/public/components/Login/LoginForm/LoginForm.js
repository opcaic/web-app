import { Form, Icon, Input, Button, Checkbox, Alert } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginFormWrapper from '@/modules/public/components/Login/LoginFormWrapper';
import { intl } from '@/modules/shared/helpers/IntlGlobalProvider';
import { intlMessages } from '@/modules/public/components/Login/LoginForm/localization';
import withEnhancedForm from '@/modules/shared/helpers/hocs/withEnhancedForm';

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

          <Form.Item style={{ marginBottom: 10 }}>
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: intl.formatMessage(intlMessages.emailRequired),
                },
              ],
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder={intl.formatMessage(intlMessages.email)}
                size="large"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: intl.formatMessage(intlMessages.passwordRequired),
                },
              ],
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder={intl.formatMessage(intlMessages.password)}
                size="large"
              />,
            )}
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <Link to="/reset-password" style={{ float: 'right' }}>
              Forgot password
            </Link>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: '100%',
              }}
            >
              Log in
            </Button>
            {intl.formatMessage(intlMessages.noAccountYet)}{' '}
            <Link to="/register">
              {intl.formatMessage(intlMessages.register)}
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
