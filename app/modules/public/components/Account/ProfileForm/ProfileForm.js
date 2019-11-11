import { Form, Input, Button } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import withEnhancedForm from '@/modules/shared/helpers/hocs/withEnhancedForm';
import FormErrors from '@/modules/shared/components/FormErrors';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';

class ProfileForm extends React.PureComponent {
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
      wrapperCol: { xs: 24, md: 16, lg: 10 },
    };

    return (
      <Form onSubmit={this.handleSubmit} {...formItemLayout} layout="vertical">
        <FormErrors errors={this.props.errors} />

        <Form.Item
          label={<FormattedMessage id="app.public.profileForm.email" />}
        >
          <span className="ant-form-text">{this.props.resource.email} </span>
        </Form.Item>
        <Form.Item
          label={<FormattedMessage id="app.public.profileForm.username" />}
        >
          <span className="ant-form-text">{this.props.resource.username}</span>
        </Form.Item>
        <Form.Item
          label={<FormattedMessage id="app.public.profileForm.organization" />}
        >
          {getFieldDecorator('organization', {
            initialValue: this.props.resource.organization,
            rules: [],
          })(<Input />)}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={this.props.isSubmitting}
          >
            <FormattedMessage id="app.generic.save" />
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

ProfileForm.propTypes = {
  onSubmit: PropTypes.func,
  form: PropTypes.object,
  errors: PropTypes.array,
  resource: PropTypes.object,
  isSubmitting: PropTypes.bool.isRequired,
};

export default compose(
  Form.create({
    name: 'profile',
  }),
  withEnhancedForm(),
)(ProfileForm);
