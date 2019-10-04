import Form from 'react-jsonschema-form';
import React from 'react';
import { Checkbox, InputNumber, Form as AntForm } from 'antd';
import PropTypes from 'prop-types';
import { TextItem } from './TextItem';
import { CustomFieldTemplate } from './CustomFieldTemplate';

const widgets = {
  CheckBoxWidget: Checkbox,
  TextWidget: TextItem,
  UpDownWidget: InputNumber,
};

const DynamicForm = props => (
  <AntForm layout="vertical">
    <Form
      schema={props.formSchema}
      widgets={widgets}
      FieldTemplate={CustomFieldTemplate}
    />
  </AntForm>
);

DynamicForm.propTypes = {
  formSchema: PropTypes.object,
};

export default DynamicForm;
