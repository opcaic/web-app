import { Form, Input, Button, Typography, Select, Radio } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  userRoleEnum,
  emailNotificationsEnum,
} from '@/modules/shared/helpers/enumHelpers';

const { Text } = Typography;

class UserForm extends React.PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const newValues = Object.assign({}, values);
        newValues.emailNotifications = undefined;
        newValues.wantsEmailNotifications =
          values.emailNotifications === emailNotificationsEnum.ON;

        this.props.onSubmit(newValues);
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
          label={<FormattedMessage id="app.admin.userForm.userRole" />}
        >
          {getFieldDecorator('role', { initialValue: this.props.user.role })(
            <Select>
              {userRoleEnum.getValues().map(({ id, text }) => (
                <Select.Option key={id} value={id}>
                  {text}
                </Select.Option>
              ))}
            </Select>,
          )}
        </Form.Item>

        <Form.Item
          label={<FormattedMessage id="app.admin.userForm.organization" />}
        >
          {getFieldDecorator('organization', {
            initialValue: this.props.user.organization,
            rules: [],
          })(<Input />)}
        </Form.Item>

        <Form.Item
          label={
            <FormattedMessage id="app.admin.userForm.emailNotifications" />
          }
        >
          {getFieldDecorator('emailNotifications', {
            initialValue: this.props.user.wantsEmailNotifications
              ? emailNotificationsEnum.ON
              : emailNotificationsEnum.OFF,
          })(
            <Radio.Group buttonStyle="solid">
              {emailNotificationsEnum.helpers
                .getValues()
                .map(({ id, text }) => (
                  <Radio.Button key={id} value={id}>
                    {text}
                  </Radio.Button>
                ))}
            </Radio.Group>,
          )}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            <FormattedMessage id="app.generic.save" />
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({
  name: 'user_form',
})(UserForm);
