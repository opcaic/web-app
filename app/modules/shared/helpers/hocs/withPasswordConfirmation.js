import React from 'react';
import { defineMessages } from 'react-intl';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';

export const intlMessages = defineMessages({
  passwordsDoNotMatch: {
    id: 'app.shared.withPasswordConfirmation.passwordsDoNotMatch',
  },
});

const defaultOptions = {
  mainPasswordField: 'password',
  confirmPasswordField: 'confirmPassword',
  errorMessage: null,
};

function withPasswordConfirmation(hocOptions = {}) {
  return WrappedComponent =>
    class extends React.Component {
      state = {
        confirmDirty: false,
      };

      options = Object.assign({}, defaultOptions, hocOptions);

      compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (
          value &&
          value !== form.getFieldValue(this.options.mainPasswordField)
        ) {
          callback(
            this.options.errorMessage ||
              intlGlobal.formatMessage(intlMessages.passwordsDoNotMatch),
          );
        } else {
          callback();
        }
      };

      compareToSecondPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields([this.options.confirmPasswordField], {
            force: true,
          });
        }
        callback();
      };

      handleConfirmPasswordBlur = e => {
        const { value } = e.target;
        this.setState(prevState => ({
          confirmDirty: prevState.confirmDirty || !!value,
        }));
      };

      render() {
        return (
          <WrappedComponent
            {...this.props}
            compareToFirstPassword={this.compareToFirstPassword}
            compareToSecondPassword={this.compareToSecondPassword}
            handleConfirmPasswordBlur={this.handleConfirmPasswordBlur}
          />
        );
      }
    };
}

export default withPasswordConfirmation;
