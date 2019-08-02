import { Form, Input, Button, Select } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { isRequired } from '@/modules/shared/helpers/formValidations';
import {
  tournamentFormatEnum,
  tournamentRankingStrategyEnum,
  tournamentScopeEnum,
} from '@/modules/shared/helpers/enumHelpers';
const { Option } = Select;

class TournamentForm extends React.PureComponent {
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

        <Form.Item
          label={<FormattedMessage id="app.admin.tournamentForm.name" />}
        >
          {getFieldDecorator('name', {
            initialValue: this.props.resource.name,
            rules: [isRequired('name')],
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label={<FormattedMessage id="app.admin.tournamentForm.game" />}
        >
          {getFieldDecorator('gameId', {
            initialValue:
              this.props.resource.game && this.props.resource.game.id,
            rules: [isRequired('game')],
          })(
            <Select
              placeholder={
                <FormattedMessage id="app.admin.tournamentForm.gameSelectPlaceholder" />
              }
            >
              {this.props.games.map(x => (
                <Option value={x.id} key={x.id}>
                  {x.name}
                </Option>
              ))}
            </Select>,
          )}
        </Form.Item>
        <Form.Item
          label={<FormattedMessage id="app.admin.tournamentForm.format" />}
        >
          {getFieldDecorator('format', {
            initialValue: this.props.resource.format,
            rules: [isRequired('format')],
          })(
            <Select
              placeholder={
                <FormattedMessage id="app.admin.tournamentForm.formatSelectPlaceholder" />
              }
            >
              {tournamentFormatEnum.getValues().map(x => (
                <Option value={x.id} key={x.id}>
                  {x.text}
                </Option>
              ))}
            </Select>,
          )}
        </Form.Item>
        <Form.Item
          label={<FormattedMessage id="app.admin.tournamentForm.scope" />}
        >
          {getFieldDecorator('scope', {
            initialValue: this.props.resource.scope,
            rules: [isRequired('scope')],
          })(
            <Select
              placeholder={
                <FormattedMessage id="app.admin.tournamentForm.scopeSelectPlaceholder" />
              }
            >
              {tournamentScopeEnum.getValues().map(x => (
                <Option value={x.id} key={x.id}>
                  {x.text}
                </Option>
              ))}
            </Select>,
          )}
        </Form.Item>
        <Form.Item
          label={
            <FormattedMessage id="app.admin.tournamentForm.rankingStrategy" />
          }
        >
          {getFieldDecorator('rankingStrategy', {
            initialValue: this.props.resource.rankingStrategy,
            rules: [isRequired('rankingStrategy')],
          })(
            <Select
              placeholder={
                <FormattedMessage id="app.admin.tournamentForm.rankingStrategySelectPlaceholder" />
              }
            >
              {tournamentRankingStrategyEnum.getValues().map(x => (
                <Option value={x.id} key={x.id}>
                  {x.text}
                </Option>
              ))}
            </Select>,
          )}
        </Form.Item>
        <Form.Item
          label={<FormattedMessage id="app.admin.tournamentForm.description" />}
        >
          {getFieldDecorator('description', {
            initialValue: this.props.resource.description,
          })(<Input.TextArea rows={8} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {this.props.resource.id ? (
            <div>
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
            </div>
          ) : (
            <div>
              <Button type="primary" htmlType="submit">
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
})(TournamentForm);
