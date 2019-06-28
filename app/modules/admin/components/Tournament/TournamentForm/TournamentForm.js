import { Form, Input, Button } from 'antd';
import React from 'react';

const { TextArea } = Input;

class TournamentForm extends React.PureComponent {
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
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <Form.Item label="Name" {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Username is required!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Description" {...formItemLayout}>
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'Username is required!' }],
          })(<TextArea rows={4} />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({
  name: 'global_state',
  mapPropsToFields(props) {
    return {
      name: Form.createFormField({
        ...props.name,
      }),
      description: Form.createFormField({
        ...props.description,
      }),
    };
  },
})(TournamentForm);
