import { Form, Input, Button, Checkbox } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

class RegisterForm extends React.PureComponent {
  state = {
    confirmDirty: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
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
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Form
        {...formItemLayout}
        onSubmit={this.handleSubmit}
        style={{ width: 600 }}
      >
        <Form.Item
          label={
            <FormattedMessage
              id="app.registrationForm.username"
              defaultMessage="Username"
            />
          }
        >
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'Please input your username!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label={
            <FormattedMessage
              id="app.registrationForm.email"
              defaultMessage="Email"
            />
          }
        >
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid e-mail!',
              },
              {
                required: true,
                message: 'Please input your e-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label={
            <FormattedMessage
              id="app.registrationForm.password"
              defaultMessage="Password"
            />
          }
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                min: 8,
                message: 'The password must be at least 8 characters long',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item
          label={
            <FormattedMessage
              id="app.registrationForm.confirmPassword"
              defaultMessage="Confirm password"
            />
          }
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>
              I have read the <Link to="/agreement">agreement</Link>
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            <FormattedMessage
              id="app.registrationForm.register"
              defaultMessage="Register"
            />
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({
  name: 'register',
})(RegisterForm);
