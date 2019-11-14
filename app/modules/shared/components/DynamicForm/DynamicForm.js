import Form from 'react-jsonschema-form';
import React from 'react';
import PropTypes from 'prop-types';
import { TextItem } from './TextItem';
import { CheckBoxItem } from './CheckBoxItem';
import { SelectItem } from './SelectItem';
import { CustomFieldTemplate } from './CustomFieldTemplate';

const createExtraErrors = errors => {
  const errorObject = {};

  errors.forEach(e => {
    errorObject[e.path] = { __errors: [e.message] };
  });
  return errorObject;
};

const uiSchema = formItemLayout => ({
  'ui:options': {
    label: false,
    formItemLayout,
  },
});

const widgets = {
  CheckboxWidget: CheckBoxItem,
  TextWidget: TextItem,
  SelectWidget: SelectItem,
};

const DynamicForm = props => (
  <Form
    schema={props.formSchema}
    uiSchema={uiSchema(props.formItemLayout)}
    widgets={widgets}
    FieldTemplate={CustomFieldTemplate}
    onChange={e => props.onConfigurationChanged(e.formData)}
    formData={props.formData}
    extraErrors={createExtraErrors(props.errors || [])}
    liveValidate
  >
    <button type="submit" hidden />
  </Form>
);

DynamicForm.propTypes = {
  formSchema: PropTypes.object,
  onConfigurationChanged: PropTypes.func,
  formData: PropTypes.object,
  formItemLayout: PropTypes.object,
  errors: PropTypes.array,
};

export default DynamicForm;
