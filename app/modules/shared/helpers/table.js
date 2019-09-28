import React from 'react';
import { Button, Icon, Input } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import StyledButton from '@/modules/shared/components/StyledButton';

export function getSearchProps(field) {
  return {
    filterDropdown: ({
      // eslint-disable-next-line react/prop-types
      setSelectedKeys,
      // eslint-disable-next-line react/prop-types
      selectedKeys,
      // eslint-disable-next-line react/prop-types
      confirm,
      // eslint-disable-next-line react/prop-types
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          /* ref={node => {
            this.searchInput = node;
          }} */
          placeholder={`Search ${field}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={
            () => confirm() /* this.handleSearch(selectedKeys, confirm) */
          }
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={
            () => confirm() /* this.handleSearch(selectedKeys, confirm) */
          }
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => clearFilters() /* this.handleReset(clearFilters) */}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
  };
}

function getActionProps(buttonGenerator) {
  return {
    title: <FormattedMessage id="app.generic.action" />,
    key: 'action',
    width: 150,
    align: 'center',
    render: (text, record) => buttonGenerator(text, record),
  };
}

export function getDetailActionProps(linkGenerator) {
  return {
    title: <FormattedMessage id="app.generic.action" />,
    key: 'action',
    width: 150,
    align: 'center',
    render: (text, record) => (
      <Button type="primary">
        <Link to={linkGenerator(record)}>
          <FormattedMessage id="app.generic.detail" />
        </Link>
      </Button>
    ),
  };
}

export function getThemedDetailActionProps(linkGenerator, options = {}) {
  return {
    title: <FormattedMessage id="app.generic.action" />,
    key: 'action',
    width: typeof options.width === 'undefined' ? 150 : options.width,
    align: typeof options.align === 'undefined' ? 'center' : options.align,
    render: (text, record) => (
      <StyledButton color={options.color} type="primary" {...options.props}>
        <Link to={linkGenerator(record)}>
          <FormattedMessage id="app.generic.detail" />
        </Link>
      </StyledButton>
    ),
  };
}

export function getEditResourceButton(linkGenerator) {
  return getActionProps((text, record) => (
    <Button type="primary">
      <Link to={linkGenerator(record)}>
        <FormattedMessage id="app.generic.edit" />
      </Link>
    </Button>
  ));
}

export function getDeleteResourceButton(deleteResourceFnc) {
  return getActionProps((text, record) => (
    <Button type="danger" onClick={() => deleteResourceFnc(record.email)}>
      <FormattedMessage id="app.generic.delete" />
    </Button>
  ));
}

export function getEmptyColumnProps() {
  return {
    key: 'empty',
    render: () => null,
  };
}

export function prepareFilterParams(
  params,
  defaultSortBy = 'id',
  defaultAsc = true,
  additionalParams = {},
) {
  return Object.assign(
    {
      sortBy: defaultSortBy,
      asc: defaultAsc,
    },
    params,
    additionalParams,
  );
}

function isPrimitive(val) {
  if (typeof val === 'object') {
    return val === null;
  }
  return typeof val !== 'function';
}

export function getDynamicTableChildren(key, data, getter, withSort = true) {
  return Object.keys(data).map(x =>
    getDynamicTableColumns(
      x,
      `${key}.${x}`,
      data[x],
      record => getter(record)[x],
      withSort,
    ),
  );
}

export function getDynamicTableColumns(
  title,
  key,
  data,
  getter,
  withSort = true,
) {
  const column = {
    title,
    key,
  };

  if (isPrimitive(data)) {
    column.render = (text, record) => getter(record);

    if (Number(data) === data && withSort) {
      column.sorter = (a, b) => getter(a) - getter(b);
    }
  } else {
    column.children = getDynamicTableChildren(key, data, getter, withSort);
  }

  return column;
}
