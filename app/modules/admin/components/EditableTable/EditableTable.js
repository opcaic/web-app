import React from 'react';
import { Table } from 'antd';
import EditableFormRow from '@/modules/admin/components/EditableTable/EditableFormRow';
import EditableCell from '@/modules/admin/components/EditableTable/EditableCell';

const EditableContext = React.createContext();

class EditableTable extends React.Component {
  handleSave = row => {
    const newData = [...this.props.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });

    this.props.handleSave(newData);
  };

  render() {
    const { columns, handleSave, ...rest } = this.props;

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const enhancedColumns = columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable(record),
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
          editableContext: EditableContext,
          renderEditCell: col.renderEditCell,
        }),
      };
    });
    return (
      <div>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          columns={enhancedColumns}
          onRow={() => ({
            editableContext: EditableContext,
          })}
          {...rest}
        />
      </div>
    );
  }
}

export default EditableTable;
