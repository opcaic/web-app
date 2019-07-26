import { Form, Input, Button } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';

class UserForm extends React.PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.props.form.getFieldsValue());
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form layout="vertical" onSubmit={this.handleSubmit} {...formItemLayout}>
        <Form.Item
          label={<FormattedMessage id="app.generic.id" defaultMessage="ID" />}
        >
          <span className="ant-form-text">{this.props.user.id}</span>
        </Form.Item>
        <Form.Item label="Email">
          {getFieldDecorator('email', {
            initialValue: this.props.user.email,
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              { required: true, message: 'Email is required!' },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            <FormattedMessage id="app.generic.save" defaultMessage="Save" />
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({
  name: 'user_form',
})(UserForm);
