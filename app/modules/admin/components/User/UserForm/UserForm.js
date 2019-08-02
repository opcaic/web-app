import { Form, Input, Button, Typography } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
const { Text } = Typography;

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
          <span className="ant-form-text">
            {this.props.user.email}{' '}
            {this.props.user.emailVerified ? (
              <Text style={{ fontSize: 12 }}>
                (<FormattedMessage id="app.admin.userForm.emailVerified" />)
              </Text>
            ) : (
              <Text style={{ fontSize: 12 }} type="danger">
                (<FormattedMessage id="app.admin.userForm.emailNotVerified" />)
              </Text>
            )}
          </span>
        </Form.Item>
        <Form.Item
          label={<FormattedMessage id="app.admin.userForm.username" />}
        >
          <span className="ant-form-text">{this.props.user.username}</span>
        </Form.Item>
        <Form.Item
          label={<FormattedMessage id="app.admin.userForm.organization" />}
        >
          {getFieldDecorator('organization', {
            initialValue: this.props.user.organization,
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
