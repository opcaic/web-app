import React from 'react';

function withAjax(WrappedComponent) {
  return class extends React.Component {
    state = {
      pagination: {},
    };

    handleTableChange = (pagination, filters, sorter) => {
      const pager = { ...this.state.pagination };
      pager.current = pagination.current;
      this.setState(prevState => ({
        pagination: Object.assign(
          { ...prevState.pagination },
          { current: pagination.current },
        ),
      }));
      this.props.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    };

    render() {
      return (
        <WrappedComponent
          pagination={this.state.pagination}
          onChange={this.handleTableChange}
          {...this.props}
        />
      );
    }
  };
}

export default withAjax;
