/* eslint-disable no-param-reassign,no-return-assign */
import React, { Component } from 'react';
import EditableTable from '@/modules/admin/components/EditableTable';
import { Button, Form, Icon, Input, Popconfirm, Select } from 'antd';
import { menuItemTypeEnum } from '@/modules/shared/helpers/enumHelpers';
import { FormattedMessage } from 'react-intl';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { intlMessages } from '@/modules/admin/components/Tournament/TournamentMenuEditor/localization';
import PropTypes from 'prop-types';
import { isRequired } from '@/modules/shared/helpers/errors/formValidations';

class TournamentMenuEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: props.dataSource,
      count: props.dataSource.length,
    };
  }

  handleDelete = key => {
    this.setState(
      prevState => ({
        dataSource: prevState.dataSource.filter(item => item.key !== key),
      }),
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state.dataSource);
        }
      },
    );
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      type: menuItemTypeEnum.EXTERNAL,
      text: intlGlobal.formatMessage(intlMessages.textPlaceholder),
      externalLink: intlGlobal.formatMessage(intlMessages.linkPlaceholder),
    };
    this.setState(
      {
        dataSource: [...dataSource, newData],
        count: count + 1,
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state.dataSource);
        }
      },
    );
  };

  handleSave = dataSource => {
    this.setState({ dataSource }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.dataSource);
      }
    });
  };

  renderEditTypeCell = (cell, form, dataIndex, record, title) => (
    <Form.Item style={{ margin: 0 }}>
      {form.getFieldDecorator(dataIndex, {
        rules: [isRequired(title)],
        initialValue: record[dataIndex],
      })(
        <Select
          placeholder={intlGlobal.formatMessage(intlMessages.typePlaceholder)}
          ref={node => (cell.input = node)}
          onPressEnter={cell.save}
          onBlur={cell.save}
        >
          {menuItemTypeEnum.helpers.getValues().map(x => (
            <Select.Option value={x.id} key={x.id}>
              {x.text}
            </Select.Option>
          ))}
        </Select>,
      )}
    </Form.Item>
  );

  renderEditDocumentCell = (cell, form, dataIndex, record, title) => (
    <Form.Item style={{ margin: 0 }}>
      {form.getFieldDecorator('documentId', {
        rules: [isRequired(title)],
        initialValue: record.documentId,
      })(
        <Select
          placeholder={intlGlobal.formatMessage(
            intlMessages.documentPlaceholder,
          )}
          ref={node => (cell.input = node)}
          onPressEnter={cell.save}
          onBlur={cell.save}
        >
          {this.props.documents.map(x => (
            <Select.Option value={x.id} key={x.id}>
              {x.name}
            </Select.Option>
          ))}
        </Select>,
      )}
    </Form.Item>
  );

  renderEditExternalLinkCell = (cell, form, dataIndex, record, title) => (
    <Form.Item style={{ margin: 0 }}>
      {form.getFieldDecorator('externalLink', {
        rules: [isRequired(title)],
        initialValue: record.externalLink,
      })(
        <Input
          ref={node => (cell.input = node)}
          onPressEnter={cell.save}
          onBlur={cell.save}
        />,
      )}
    </Form.Item>
  );

  renderEditAdditionalDataCell = (cell, form, dataIndex, record, title) =>
    record.type === menuItemTypeEnum.DOCUMENT
      ? this.renderEditDocumentCell(cell, form, dataIndex, record, title)
      : this.renderEditExternalLinkCell(cell, form, dataIndex, record, title);

  render() {
    return (
      <div>
        <EditableTable
          columns={[
            {
              title: intlGlobal.formatMessage(intlMessages.type),
              dataIndex: 'type',
              editable: () => true,
              render: (text, record) =>
                menuItemTypeEnum.helpers.idToText(record.type),
              renderEditCell: this.renderEditTypeCell,
            },
            {
              title: intlGlobal.formatMessage(intlMessages.text),
              dataIndex: 'text',
              editable: record => record.type === menuItemTypeEnum.EXTERNAL,
              render: (text, record) => {
                if (record.type === menuItemTypeEnum.DOCUMENT) {
                  const document = this.props.documents.find(
                    x => x.id === record.documentId,
                  );

                  return document
                    ? document.name
                    : intlGlobal.formatMessage(intlMessages.documentNotFound);
                }

                return record.text;
              },
            },
            {
              title: intlGlobal.formatMessage(intlMessages.additionalData),
              dataIndex: 'additionalData',
              editable: () => true,
              render: (text, record) => {
                if (record.type === menuItemTypeEnum.DOCUMENT) {
                  const document = this.props.documents.find(
                    x => x.id === record.documentId,
                  );

                  return document
                    ? document.name
                    : intlGlobal.formatMessage(intlMessages.documentNotFound);
                }

                return record.externalLink;
              },
              renderEditCell: this.renderEditAdditionalDataCell,
            },
            {
              title: '',
              dataIndex: 'operation',
              width: 50,
              align: 'center',
              render: (text, record) => (
                <Popconfirm
                  title={intlGlobal.formatMessage(intlMessages.confirmDelete)}
                  onConfirm={() => this.handleDelete(record.key)}
                >
                  <Icon type="delete" style={{ color: '#ff4d4f' }} />
                </Popconfirm>
              ),
            },
          ]}
          dataSource={this.state.dataSource}
          pagination={false}
          handleSave={this.handleSave}
        />

        <Button
          onClick={this.handleAdd}
          type="default"
          style={{ marginTop: 15 }}
        >
          <FormattedMessage id="app.admin.tournamentMenuEditor.add" />
        </Button>
      </div>
    );
  }
}

TournamentMenuEditor.propTypes = {
  dataSource: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  documents: PropTypes.array.isRequired,
};

export default TournamentMenuEditor;
