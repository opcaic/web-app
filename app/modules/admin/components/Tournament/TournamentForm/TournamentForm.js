import {
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  DatePicker,
  Radio,
  Divider,
} from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  isRequired,
  isMaxLength,
  normalizeEmptyString,
} from '@/modules/shared/helpers/errors/formValidations';
import {
  tournamentFormatEnum,
  tournamentRankingStrategyEnum,
  tournamentScopeEnum,
  tournamentAvailabilityEnum,
  tournamentStateEnum,
  tournamentMatchLogVisibility,
  isFormatForScope,
} from '@/modules/shared/helpers/enumHelpers';
import withEnhancedForm from '@/modules/shared/helpers/hocs/withEnhancedForm';
import * as Showdown from 'showdown';
import ReactMde from 'react-mde';
import TournamentMenuEditor from '@/modules/admin/components/Tournament/TournamentMenuEditor';
import TournamentGameInfo from '@/modules/admin/containers/Tournament/TournamentGameInfo';
import moment from 'moment';
import { ChromePicker } from 'react-color';
import { compose } from 'redux';
import FormErrors from '@/modules/shared/components/FormErrors';

const { Option } = Select;

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const MB_IN_BYTES = 1024 * 1024;

class TournamentForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      gameId: props.resource.game ? props.resource.game.id : null,
      configuration: props.resource.configuration,
      selectedTab: 'write',
      description: props.resource.description,
      scope: props.resource.scope,
      format: props.resource.format,
      hexColor: props.resource.themeColor,
      useGameDesign: props.resource.id === undefined,
    };

    if (props.resource.id) {
      this.state.menuItems = this.menuItemsPreprocess(
        props.resource.menuItems || [],
      );
    }
  }

  updateColor = color => {
    this.setState({ hexColor: color.hex });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const sanitatedValues = Object.assign({}, values, {
          menuItems: this.menuItemsPostprocess(this.state.menuItems || []),
          format: this.state.format,
          scope: this.state.scope,
          maxSubmissionSize: values.maxSubmissionSize * MB_IN_BYTES,
          themeColor: this.state.hexColor,
          gameId: this.state.gameId,
          configuration: this.state.configuration,
          privateMatchLog:
            values.matchLogVisibility === tournamentMatchLogVisibility.PRIVATE,
          description: this.state.description,
        });

        if (this.state.useGameDesign) {
          sanitatedValues.imageUrl = undefined;
          sanitatedValues.themeColor = undefined;
          sanitatedValues.imageOverlay = undefined;
        }

        this.props.onSubmit(sanitatedValues);
      }
    });
  };

  menuItemsPreprocess = menuItems =>
    menuItems.map((x, index) => Object.assign({}, x, { key: index }));

  menuItemsPostprocess = menuItems => menuItems.map(({ key, ...rest }) => rest);

  setEditorSelectedTab = selectedTab => {
    this.setState({ selectedTab });
  };

  setEditorValue = value => {
    this.setState({ description: value });
  };

  setMenuItemsValue = value => {
    this.setState({ menuItems: value });
  };

  setScopeValue = value => {
    this.setState({ scope: value, format: undefined });
    this.props.form.setFields({ format: { value: undefined } });
  };

  setFormatValue = value => {
    this.setState({ format: value });
  };

  isDisabledByState = state =>
    this.props.resource.state && this.props.resource.state !== state;

  handleGameChange = id => {
    this.setState({ gameId: id, configuration: {} });
  };

  handleConfigurationChanged = configuration => {
    this.setState({ configuration });
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
    const colorPickerInitialValue = {
      hex: this.props.resource.defaultTournamentThemeColor,
    };

    const configurationErrors = this.props.innerErrors.configuration;

    return (
      <Form onSubmit={this.handleSubmit} {...formItemLayout}>
        <FormErrors errors={this.props.errors} />
        <Form.Item
          label={<FormattedMessage id="app.admin.tournamentForm.name" />}
        >
          {getFieldDecorator('name', {
            initialValue: this.props.resource.name,
            rules: [isRequired('name')],
          })(<Input />)}
        </Form.Item>

        <TournamentGameInfo
          onConfigurationChanged={this.handleConfigurationChanged}
          gameId={this.state.gameId}
          onGameChange={this.handleGameChange}
          gameChangeDisabled={this.props.resource.game !== undefined}
          configuration={this.state.configuration}
          configurationErrors={configurationErrors || []}
        />

        {this.props.resource.id && (
          <Form.Item
            label={
              <FormattedMessage id="app.admin.tournamentForm.additionalFiles" />
            }
          >
            {this.props.hasAdditionalFiles ? (
              <Button
                type="primary"
                onClick={() =>
                  this.props.downloadTournamentFiles(this.props.resource.id)
                }
              >
                <FormattedMessage id="app.admin.tournamentForm.downloadFiles" />
              </Button>
            ) : (
              <FormattedMessage id="app.admin.tournamentForm.noFiles" />
            )}
            <Button
              onClick={() =>
                this.props.showTournamentFilesModal(this.props.resource)
              }
              style={{ marginLeft: 5 }}
            >
              <FormattedMessage id="app.admin.tournamentForm.uploadFiles" />
            </Button>
          </Form.Item>
        )}

        <Form.Item
          label={
            <FormattedMessage id="app.admin.tournamentForm.availability" />
          }
        >
          {getFieldDecorator('availability', {
            initialValue: this.props.resource.availability,
            rules: [isRequired('availability')],
          })(
            <Radio.Group buttonStyle="solid">
              {tournamentAvailabilityEnum.helpers.getValues().map(item => (
                <Radio.Button key={item.id} value={item.id}>
                  {item.text}
                </Radio.Button>
              ))}
            </Radio.Group>,
          )}
        </Form.Item>
        <Form.Item
          label={
            <FormattedMessage id="app.admin.tournamentForm.matchLogVisibility" />
          }
        >
          {getFieldDecorator('matchLogVisibility', {
            initialValue: this.props.resource.privateMatchLog
              ? tournamentMatchLogVisibility.PRIVATE
              : tournamentMatchLogVisibility.PUBLIC,
          })(
            <Radio.Group buttonStyle="solid">
              {tournamentMatchLogVisibility.helpers.getValues().map(item => (
                <Radio.Button key={item.id} value={item.id}>
                  {item.text}
                </Radio.Button>
              ))}
            </Radio.Group>,
          )}
        </Form.Item>
        <Divider />

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
              disabled={this.isDisabledByState(tournamentStateEnum.CREATED)}
              onSelect={this.setScopeValue}
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
              disabled={
                this.state.scope === undefined ||
                this.isDisabledByState(tournamentStateEnum.CREATED)
              }
              onSelect={this.setFormatValue}
            >
              {tournamentFormatEnum
                .getValues()
                .filter(format => isFormatForScope(this.state.scope, format.id))
                .map(x => (
                  <Option value={x.id} key={x.id}>
                    {x.text}
                  </Option>
                ))}
            </Select>,
          )}
        </Form.Item>

        {this.state.scope === tournamentScopeEnum.ONGOING && (
          <Form.Item
            label={
              <FormattedMessage id="app.admin.tournamentForm.matchesPerDay" />
            }
          >
            {getFieldDecorator('matchesPerDay', {
              initialValue: this.props.resource.matchesPerDay,
              rules: [isRequired('matchesPerDay')],
            })(<InputNumber />)}
          </Form.Item>
        )}

        {this.state.scope === tournamentScopeEnum.DEADLINE && (
          <Form.Item
            label={<FormattedMessage id="app.admin.tournamentForm.deadline" />}
          >
            {getFieldDecorator('deadline', {
              initialValue:
                this.props.resource.deadline &&
                moment(this.props.resource.deadline),
              rules: [isRequired('deadline')],
            })(
              <DatePicker
                disabledDate={date => date < moment()}
                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
              />,
            )}
          </Form.Item>
        )}

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
              disabled={this.isDisabledByState(tournamentStateEnum.CREATED)}
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
          label={
            <FormattedMessage id="app.admin.tournamentForm.maxSubmissionSize" />
          }
        >
          {getFieldDecorator('maxSubmissionSize', {
            initialValue: this.props.resource.maxSubmissionSize
              ? this.props.resource.maxSubmissionSize / MB_IN_BYTES
              : 1,
          })(
            <InputNumber
              min={1}
              formatter={val => `${val} MB`}
              parser={val => val.replace(/[^0-9]/g, '')}
              precision={0}
            />,
          )}
        </Form.Item>
        <Divider />

        {!this.props.resource.id && (
          <Radio.Group
            onChange={e =>
              this.setState({ useGameDesign: e.target.value === 'game' })
            }
            defaultValue="game"
            buttonStyle="solid"
          >
            <Radio value="game">
              <FormattedMessage id="app.admin.tournamentForm.useGameDesign" />
            </Radio>
            <Radio value="own">
              <FormattedMessage id="app.admin.tournamentForm.useOwnDesign" />
            </Radio>
          </Radio.Group>
        )}

        {!this.state.useGameDesign && (
          <div>
            <Form.Item
              label={
                <FormattedMessage id="app.admin.tournamentForm.imageUrl" />
              }
            >
              {getFieldDecorator('imageUrl', {
                initialValue: this.props.resource.imageUrl,
                rules: [isMaxLength(2000, 'imageUrl')],
                normalize: normalizeEmptyString,
              })(<Input />)}
            </Form.Item>

            <Form.Item
              label={
                <FormattedMessage id="app.admin.tournamentForm.themeColor" />
              }
            >
              {getFieldDecorator('themeColor', {
                initialValue: colorPickerInitialValue,
                rules: [isRequired('themeColor')],
              })(
                <ChromePicker
                  onChange={this.updateColor}
                  color={{ hex: this.state.hexColor }}
                  disableAlpha
                />,
              )}
            </Form.Item>

            <Form.Item
              label={
                <FormattedMessage id="app.admin.tournamentForm.imageOverlay" />
              }
            >
              {getFieldDecorator('imageOverlay', {
                initialValue:
                  this.props.resource.defaultTournamentImageOverlay || 1.0,
              })(<InputNumber step={0.1} precision={2} min={0} max={1} />)}
            </Form.Item>
          </div>
        )}
        <Divider />

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
              onChange={this.setMenuItemsValue}
              dataSource={this.state.menuItems}
              documents={this.props.documents}
            />
          </Form.Item>
        )}

        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            loading={this.props.isSubmitting}
          >
            {this.props.resource.id ? (
              <FormattedMessage id="app.generic.save" />
            ) : (
              <FormattedMessage id="app.generic.create" />
            )}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default compose(
  Form.create({
    name: 'tournament_form',
  }),
  withEnhancedForm(),
)(TournamentForm);
