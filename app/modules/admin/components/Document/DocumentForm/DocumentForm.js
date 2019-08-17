import { Form, Input, Button } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { isRequired } from '@/modules/shared/helpers/errors/formValidations';
import withEnhancedForm from '@/modules/shared/helpers/hocs/withEnhancedForm';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

class DocumentForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { selectedTab: 'write', content: props.resource.content };
  }

  static getDerivedStateFromProps(props) {
    return { content: props.resource.content };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSubmit(
          Object.assign({ content: this.state.content }, values),
        );
      }
    });
  };

  setEditorSelectedTab = selectedTab => {
    this.setState({ selectedTab });
  };

  setEditorValue = value => {
    this.setState({ content: value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      wrapperCol: { span: 24 },
    };
    const tailFormItemLayout = {
      wrapperCol: { span: 24 },
    };

    return (
      <Form onSubmit={this.handleSubmit} {...formItemLayout} layout="vertical">
        <Form.Item
          label={<FormattedMessage id="app.admin.documentForm.name" />}
        >
          {getFieldDecorator('name', {
            initialValue: this.props.resource.name,
            rules: [isRequired('name')],
          })(<Input />)}
        </Form.Item>
        <Form.Item>
          <ReactMde
            value={this.state.content}
            onChange={this.setEditorValue}
            selectedTab={this.state.selectedTab}
            onTabChange={this.setEditorSelectedTab}
            generateMarkdownPreview={markdown =>
              Promise.resolve(converter.makeHtml(markdown))
            }
          />
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
  name: 'user_form',
})(withEnhancedForm(DocumentForm));
