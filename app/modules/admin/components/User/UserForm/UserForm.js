import { Form, Input, Button } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  isRequired,
  isValidEmail,
} from '@/modules/shared/helpers/formValidations';

class UserForm extends React.PureComponent {
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
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const tailFormItemLayout = {
      wrapperCol: { span: 14, offset: 6 },
    };

    return (
      <Form onSubmit={this.handleSubmit} {...formItemLayout}>
        <Form.Item label={<FormattedMessage id="app.generic.id" />}>
          <span className="ant-form-text">{this.props.user.id}</span>
        </Form.Item>
        <Form.Item label={<FormattedMessage id="app.admin.userForm.email" />}>
          {getFieldDecorator('email', {
            initialValue: this.props.user.email,
            rules: [isValidEmail(), isRequired('email')],
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label={<FormattedMessage id="app.admin.userForm.firstName" />}
        >
          {getFieldDecorator('firstName', {
            initialValue: this.props.user.firstName,
            rules: [],
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label={<FormattedMessage id="app.admin.userForm.lastName" />}
        >
          {getFieldDecorator('lastName', {
            initialValue: this.props.user.lastName,
            rules: [],
          })(<Input />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            <FormattedMessage id="app.generic.save" />
          </Button>
          <Button
            type="danger"
            htmlType="submit"
            style={{ marginLeft: '10px' }}
          >
            <FormattedMessage id="app.generic.delete" />
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({
  name: 'user_form',
})(UserForm);
