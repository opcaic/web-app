import React from 'react';
import { Select, Form, Button, notification } from 'antd';
import withEnhancedForm from '@/modules/shared/helpers/hocs/withEnhancedForm';
import { FormattedMessage } from 'react-intl';
import EmailValidator from 'email-validator';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { intlMessages } from './localization';

class ParticipantForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { values: [] };
  }

  addNewValue = value => {
    if (EmailValidator.validate(value)) {
      this.setState(state => {
        const newValues = state.values.slice();
        newValues.push(value);

        return { values: newValues };
      });
    } else {
      notification.error({
        description: intlGlobal.formatMessage(intlMessages.invalidEmail),
      });
    }
  };

  removeValue = value => {
    this.setState(state => {
      const newValues = state.values.filter(item => item !== value);

      return {
        values: newValues,
      };
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll(err => {
      if (!err) {
        this.props.onSubmit({ emails: this.state.values });
      }
    });
  };

  render() {
    const formItemLayout = {
      wrapperCol: { span: 24 },
    };
    const tailFormItemLayout = {
      wrapperCol: { span: 24 },
    };

    return (
      <Form onSubmit={this.handleSubmit} {...formItemLayout} layout="vertical">
        <Form.Item
          label={
            <FormattedMessage id="app.admin.tournamentParticipantForm.emails" />
          }
          layout="vertical"
        >
          <Select
            mode="tags"
            style={{ width: '100%' }}
            tokenSeparators={[',', ';', ' ']}
            onSelect={this.addNewValue}
            onDeselect={this.removeValue}
            value={this.state.values}
          />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <div>
            <Button
              type="primary"
              htmlType="submit"
              loading={this.props.isSubmitting}
              disabled={this.state.values.length === 0}
            >
              <FormattedMessage id="app.admin.tournamentParticipantForm.add" />
            </Button>
          </div>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({
  name: 'participant_form',
})(withEnhancedForm(ParticipantForm));
