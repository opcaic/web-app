import { Form } from 'antd';
import React from 'react';

const EditableRow = ({ form, index, editableContext, ...props }) => (
  <editableContext.Provider value={form}>
    <tr {...props} />
  </editableContext.Provider>
);

export default Form.create()(EditableRow);
