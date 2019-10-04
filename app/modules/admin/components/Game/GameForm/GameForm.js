import { Form, Input, Button, Divider, Select, InputNumber } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  isRequired,
  isMaxLength,
  normalizeEmptyString,
} from '@/modules/shared/helpers/errors/formValidations';
import withEnhancedForm from '@/modules/shared/helpers/hocs/withEnhancedForm';
import { ChromePicker } from 'react-color';
import { gameTypeEnum } from '@/modules/shared/helpers/enumHelpers';
import { compose } from 'redux';

const MB_IN_BYTES = 1024 * 1024;

class GameForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hexColor: props.resource.id
        ? props.resource.defaultTournamentThemeColor
        : '#323232',
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const typeFromDefault = gameTypeEnum.helpers
          .getValues()
          .filter(item => item.text === values.type)[0];

        const sanitatedValues = Object.assign({}, values, {
          defaultTournamentThemeColor: this.state.hexColor,
          type: typeFromDefault ? typeFromDefault.id : values.type,
          maxAdditionalFilesSize: values.maxAdditionalFilesSize * MB_IN_BYTES,
        });

        this.props.onSubmit(sanitatedValues);
      }
    });
  };

  updateColor = color => {
    this.setState({ hexColor: color.hex });
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

    const colorPickerInitialValue = {
      hex: this.props.resource.defaultTournamentThemeColor,
    };

    return (
      <Form onSubmit={this.handleSubmit} {...formItemLayout}>
        <Form.Item label={<FormattedMessage id="app.admin.gameForm.name" />}>
          {getFieldDecorator('name', {
            initialValue: this.props.resource.name,
            rules: [isRequired('name'), isMaxLength(30, 'name')],
          })(<Input />)}
        </Form.Item>

        <Form.Item label={<FormattedMessage id="app.admin.gameForm.key" />}>
          {getFieldDecorator('key', {
            initialValue: this.props.resource.key,
            rules: [isRequired('key'), isMaxLength(30, 'key')],
          })(<Input />)}
        </Form.Item>

        <Form.Item label={<FormattedMessage id="app.admin.gameForm.type" />}>
          {getFieldDecorator('type', {
            initialValue: this.props.resource.type
              ? gameTypeEnum.helpers.idToText(this.props.resource.type)
              : '',
            rules: [isRequired('type')],
          })(
            <Select>
              {gameTypeEnum.helpers.getValues().map(item => (
                <Select.Option key={item.id}>{item.text}</Select.Option>
              ))}
            </Select>,
          )}
        </Form.Item>
        <Divider />

        <Form.Item
          label={<FormattedMessage id="app.admin.gameForm.imageUrl" />}
        >
          {getFieldDecorator('imageUrl', {
            initialValue: this.props.resource.imageUrl,
            rules: [isMaxLength(2000, 'imageUrl')],
            normalize: normalizeEmptyString,
          })(<Input />)}{' '}
        </Form.Item>

        <Form.Item
          label={
            <FormattedMessage id="app.admin.gameForm.defaultTournamentImageUrl" />
          }
        >
          {getFieldDecorator('defaultTournamentImageUrl', {
            initialValue: this.props.resource.defaultTournamentImageUrl,
            rules: [isMaxLength(2000, 'defaultTournamentImageUrl')],
            normalize: normalizeEmptyString,
          })(<Input />)}{' '}
        </Form.Item>

        <Form.Item label={<FormattedMessage id="app.admin.gameForm.color" />}>
          {getFieldDecorator('defaultTournamentThemeColor', {
            initialValue: colorPickerInitialValue,
            rules: [isRequired('defaultTournamentThemeColor')],
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
            <FormattedMessage id="app.admin.gameForm.defaultTournamentImageOverlay" />
          }
        >
          {getFieldDecorator('defaultTournamentImageOverlay', {
            initialValue: this.props.resource.defaultTournamentImageOverlay
              ? this.props.resource.defaultTournamentImageOverlay
              : 1.0,
          })(<InputNumber step={0.1} precision={2} min={0} max={1} />)}
        </Form.Item>

        <Divider />

        <Form.Item
          label={
            <FormattedMessage id="app.admin.gameForm.maxAdditionalFilesSize" />
          }
        >
          {getFieldDecorator('maxAdditionalFilesSize', {
            initialValue: this.props.resource.maxAdditionalFilesSize
              ? this.props.resource.maxAdditionalFilesSize / MB_IN_BYTES
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

        <Form.Item
          label={<FormattedMessage id="app.admin.gameForm.description" />}
        >
          {getFieldDecorator('description', {
            initialValue: this.props.resource.description,
            rules: [isMaxLength(2000, 'description')],
            normalize: normalizeEmptyString,
          })(<Input.TextArea rows={6} />)}
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

export default compose(
  Form.create({
    name: 'game_form',
  }),
  withEnhancedForm(),
)(GameForm);
