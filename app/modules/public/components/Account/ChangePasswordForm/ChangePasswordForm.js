import { Form, Input, Button } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import withEnhancedForm from '@/modules/shared/helpers/hocs/withEnhancedForm';
import FormErrors from '@/modules/shared/components/FormErrors';
import { FormattedMessage } from 'react-intl';
import {
  isMinLength,
  isRequired,
} from '@/modules/shared/helpers/errors/formValidations';
import { accountErrorMessageProvider } from '@/modules/public/helpers/accountHelpers';
import { compose } from 'redux';
import withPasswordConfirmation from '@/modules/shared/helpers/hocs/withPasswordConfirmation';

class ChangePasswordForm extends React.PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSubmit(values, this.successCallback);
      }
    });
  };

  successCallback = () => {
    this.props.form.resetFields();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      wrapperCol: { span: 10 },
    };

    return (
      <Form onSubmit={this.handleSubmit} {...formItemLayout} layout="vertical">
        <FormErrors errors={this.props.errors} />

        <Form.Item
          label={
            <FormattedMessage id="app.public.changePasswordForm.oldPassword" />
          }
          style={{ marginBottom: 5 }}
        >
          {getFieldDecorator('oldPassword', {
            validateTrigger: 'onBlur',
            rules: [isRequired('oldPassword', accountErrorMessageProvider)],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item
          label={
            <FormattedMessage id="app.public.changePasswordForm.newPassword" />
          }
          style={{ marginBottom: 5 }}
        >
          {getFieldDecorator('newPassword', {
            validateTrigger: 'onBlur',
            rules: [
              isRequired('newPassword', accountErrorMessageProvider),
              isMinLength(8, 'password'),
              {
                validator: this.props.compareToSecondPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item
          label={
            <FormattedMessage id="app.public.changePasswordForm.confirmNewPassword" />
          }
          style={{ marginBottom: 5 }}
        >
          {getFieldDecorator('confirmNewPassword', {
            validateTrigger: 'onBlur',
            rules: [
              isRequired('confirmNewPassword', accountErrorMessageProvider),
              {
                validator: this.props.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.props.handleConfirmPasswordBlur} />)}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={this.props.isSubmitting}
          >
            <FormattedMessage id="app.public.changePasswordForm.changePassword" />
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

ChangePasswordForm.propTypes = {
  onSubmit: PropTypes.func,
  form: PropTypes.object,
  errors: PropTypes.array,
  resource: PropTypes.object,
  isSubmitting: PropTypes.bool.isRequired,
  compareToFirstPassword: PropTypes.func.isRequired,
  compareToSecondPassword: PropTypes.func.isRequired,
  handleConfirmPasswordBlur: PropTypes.func.isRequired,
};

export default compose(
  Form.create({
    name: 'profile',
  }),
  withEnhancedForm(),
  withPasswordConfirmation({
    mainPasswordField: 'newPassword',
    confirmPasswordField: 'confirmNewPassword',
  }),
)(ChangePasswordForm);
