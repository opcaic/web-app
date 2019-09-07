import { Form, Input, Button, Select } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { isRequired } from '@/modules/shared/helpers/errors/formValidations';
import {
  tournamentFormatEnum,
  tournamentRankingStrategyEnum,
  tournamentScopeEnum,
} from '@/modules/shared/helpers/enumHelpers';
import withEnhancedForm from '@/modules/shared/helpers/hocs/withEnhancedForm';
import * as Showdown from 'showdown';
import ReactMde from 'react-mde';
import TournamentMenuEditor from '@/modules/admin/components/Tournament/TournamentMenuEditor';
const { Option } = Select;

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

class TournamentForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'write',
      description: props.resource.description || '',
      menuData: this.menuDataPreprocess(
        JSON.parse(props.resource.menuData) || [],
      ),
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSubmit(
          Object.assign(
            {
              description: this.state.description,
              menuData: JSON.stringify(
                this.menuDataPostprocess(this.state.menuData),
              ),
            },
            values,
          ),
        );
      }
    });
  };

  menuDataPreprocess = menuData =>
    menuData.map((x, index) => Object.assign({}, x, { key: index }));

  menuDataPostprocess = menuData => menuData.map(({ key, ...rest }) => rest);

  setEditorSelectedTab = selectedTab => {
    this.setState({ selectedTab });
  };

  setEditorValue = value => {
    this.setState({ description: value });
  };

  setMenuDataValue = value => {
    console.log(value);
    this.setState({ menuData: value });
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
          wrapperCol={{ span: 21 }}
        >
          <div style={{ lineHeight: 'initial' }}>
            <ReactMde
              value={this.state.description}
              onChange={this.setEditorValue}
              selectedTab={this.state.selectedTab}
              onTabChange={this.setEditorSelectedTab}
              generateMarkdownPreview={markdown =>
                Promise.resolve(converter.makeHtml(markdown))
              }
            />
          </div>
        </Form.Item>

        {this.props.resource.id && (
          <Form.Item
            label={<FormattedMessage id="app.admin.tournamentForm.menu" />}
            wrapperCol={{ span: 21 }}
          >
            <TournamentMenuEditor
              onChange={this.setMenuDataValue}
              dataSource={this.state.menuData}
              documents={this.props.documents}
            />
          </Form.Item>
        )}

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
              <Button type="primary" htmlType="submit">
                <FormattedMessage
                  id="app.generic.create"
                  loading={this.props.isSubmitting}
                />
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
})(withEnhancedForm(TournamentForm));
