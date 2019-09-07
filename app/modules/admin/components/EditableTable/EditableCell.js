/* eslint-disable no-return-assign */
import React from 'react';
import { Form, Input } from 'antd';
import { isRequired } from '@/modules/shared/helpers/errors/formValidations';

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    this.setState(
      ({ editing }) => ({ editing: !editing }),
      () => {
        if (this.state.editing) {
          this.input.focus();
        }
      },
    );
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = renderEditCell => form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      renderEditCell(this, form, dataIndex, record, title)
    ) : (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24, height: 20 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  renderEditCell = (cell, form, dataIndex, record, title) => (
    <Form.Item style={{ margin: 0 }}>
      {form.getFieldDecorator(dataIndex, {
        rules: [isRequired(title)],
        initialValue: record[dataIndex],
      })(
        <Input
          ref={node => (this.input = node)}
          onPressEnter={this.save}
          onBlur={this.save}
        />,
      )}
    </Form.Item>
  );

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      editableContext,
      renderEditCell,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <editableContext.Consumer>
            {this.renderCell(renderEditCell || this.renderEditCell)}
          </editableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

export default EditableCell;
