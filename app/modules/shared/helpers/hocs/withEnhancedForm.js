import React from 'react';

const defaultOptions = {
  handleErrors: true,
};

function withEnhancedForm(WrappedComponent, hocOptions) {
  return class extends React.Component {
    state = {
      isSubmitting: false,
      errors: [],
    };

    options = Object.assign({}, defaultOptions, hocOptions);

    onSubmit = originalOnSubmit => (...args) => {
      this.setState({ isSubmitting: true });

      const modifiedArgs = [].slice.call(args);

      modifiedArgs[1] = this.successCallback(modifiedArgs[1]);
      modifiedArgs[2] = this.failureCallback(modifiedArgs[2]);

      originalOnSubmit(...modifiedArgs);
    };

    successCallback = originalCallback => (...args) => {
      this.setState({ isSubmitting: false });

      if (typeof originalCallback === 'function') {
        originalCallback(...args);
      }
    };

    failureCallback = originalCallback => (...args) => {
      this.setState({ isSubmitting: false });

      if (typeof originalCallback === 'function') {
        originalCallback(...args);
      }

      if (this.options.handleErrors === true) {
        this.handleErrors(args[0]);
      }
    };

    handleErrors = errors => {
      const values = this.props.form.getFieldsValue();
      const fieldsData = {};

      Object.entries(errors.withField).forEach(element => {
        const key = element[0];
        const fieldErrors = element[1];

        fieldsData[key] = {
          value: values[key],
          errors: fieldErrors.map(error => new Error(error)),
        };
      });

      this.setState({ errors: errors.withoutField });
      this.props.form.setFields(fieldsData);
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          isSubmitting={this.state.isSubmitting}
          onSubmit={this.onSubmit(this.props.onSubmit)}
          errors={this.state.errors}
        />
      );
    }
  };
}

export default withEnhancedForm;
