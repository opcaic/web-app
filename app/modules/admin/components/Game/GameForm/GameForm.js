import { Form, Input, Button } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { isRequired } from '@/modules/shared/helpers/errors/formValidations';
import withEnhancedForm from '@/modules/shared/helpers/hocs/withEnhancedForm';

class GameForm extends React.PureComponent {
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
        {this.props.resource.id && (
          <Form.Item label={<FormattedMessage id="app.generic.id" />}>
            <span className="ant-form-text">{this.props.resource.id}</span>
          </Form.Item>
        )}

        <Form.Item label={<FormattedMessage id="app.admin.gameForm.name" />}>
          {getFieldDecorator('name', {
            initialValue: this.props.resource.name,
            rules: [isRequired('name')],
          })(<Input />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {this.props.resource.id ? (
            <div>
              <Button
                type="primary"
                htmlType="submit"
                loading={this.props.isSubmitting}
              >
                <FormattedMessage id="app.generic.save" />
              </Button>
              <Button
                type="danger"
                htmlType="submit"
                style={{ marginLeft: '10px' }}
              >
                <FormattedMessage id="app.generic.delete" />
              </Button>
            </div>
          ) : (
            <div>
              <Button
                type="primary"
                htmlType="submit"
                loading={this.props.isSubmitting}
              >
                <FormattedMessage id="app.generic.create" />
              </Button>
            </div>
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({
  name: 'game_form',
})(withEnhancedForm(GameForm));
