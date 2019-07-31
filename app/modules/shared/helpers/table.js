import React from 'react';
import { Button, Icon, Input } from 'antd';

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
