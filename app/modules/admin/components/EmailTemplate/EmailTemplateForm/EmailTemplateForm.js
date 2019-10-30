import React from 'react';
import { Form, Input, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import ReactHtmlParser from 'react-html-parser';
import withEnhancedForm from '@/modules/shared/helpers/hocs/withEnhancedForm';
import { compose } from 'redux';
import styled from 'styled-components';

const StyledHtmlContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
`;

class EmailTemplateForm extends React.Component {
  state = {
    bodyTemplate: this.props.resource.bodyTemplate,
  };

  handleBodyChange = e => {
    this.setState({ bodyTemplate: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const newValues = Object.assign(values, {
          name: this.props.resource.name,
          languageCode: this.props.resource.languageCode,
          bodyTemplate: this.state.bodyTemplate,
        });

        this.props.onSubmit(newValues);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 9 },
    };
    const tailFormItemLayout = {
      wrapperCol: { span: 14, offset: 3 },
    };

    return (
      <Form onSubmit={this.handleSubmit} {...formItemLayout}>
        <Form.Item
          label={<FormattedMessage id="app.admin.emailTemplate.name" />}
        >
          <span className="ant-form-text">{this.props.resource.name}</span>
        </Form.Item>

        <Form.Item
          label={<FormattedMessage id="app.admin.emailTemplate.languageCode" />}
        >
          <span className="ant-form-text">
            {this.props.resource.languageCode}
          </span>
        </Form.Item>

        <Form.Item
          label={
            <FormattedMessage id="app.admin.emailTemplateForm.subjectTemplate" />
          }
        >
          {getFieldDecorator('subjectTemplate', {
            initialValue: this.props.resource.subjectTemplate,
          })(<Input />)}
        </Form.Item>

        <Form.Item
          label={
            <FormattedMessage id="app.admin.emailTemplateForm.templateVariables" />
          }
        >
          <div>{this.props.resource.templateVariables.join(', ')}</div>
        </Form.Item>

        <Form.Item
          label={
            <FormattedMessage id="app.admin.emailTemplateForm.bodyTemplate" />
          }
          wrapperCol={{ span: 18 }}
        >
          <Input.TextArea
            value={this.state.bodyTemplate}
            onChange={this.handleBodyChange}
          />
        </Form.Item>

        <Form.Item
          label={<FormattedMessage id="app.admin.emailTemplateForm.preview" />}
          wrapperCol={{ span: 18 }}
        >
          <StyledHtmlContainer>
            {ReactHtmlParser(this.state.bodyTemplate)}
          </StyledHtmlContainer>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
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

export default compose(
  Form.create({
    name: 'email_template_form',
  }),
  withEnhancedForm(),
)(EmailTemplateForm);
