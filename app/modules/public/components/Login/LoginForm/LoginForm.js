import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

class LoginForm extends React.PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values);
      if (!err) {
        this.props.onSubmit(values, this.submitErrorsCallback);
      }
    });
  };

  submitErrorsCallback = errors => {
    const values = this.props.form.getFieldsValue();
    const fieldsData = {};

    Object.entries(errors).forEach(element => {
      const key = element[0];
      const fieldErrors = element[1];

      fieldsData[key] = {
        value: values[key],
        errors: fieldErrors.map(error => new Error(error)),
      };
    });

    this.props.form.setFields(fieldsData);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form onSubmit={this.handleSubmit} {...formItemLayout}>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <Link to="/reset-passowrd" style={{ float: 'right' }}>
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
          Or <Link to="/register">register now!</Link>
        </Form.Item>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  form: PropTypes.object,
};

export default Form.create({
  name: 'login',
})(LoginForm);
