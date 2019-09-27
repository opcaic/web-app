import React from 'react';

function withAjax(WrappedComponent) {
  return class extends React.Component {
    static defaultProps = {
      pageSize: 10,
    };

    constructor(props) {
      super(props);

      this.state = {
        pagination: { pageSize: props.pageSize },
      };
    }

    static getDerivedStateFromProps(props, state) {
      return {
        pagination: Object.assign({}, state.pagination, {
          pageSize: props.pageSize,
        }),
      };
    }

    handleTableChange = (pagination, filters, sorter) => {
      const pager = { ...this.state.pagination };
      pager.current = pagination.current;
      this.setState(prevState => ({
        pagination: Object.assign(
          { ...prevState.pagination },
          { current: pagination.current },
        ),
      }));

      const newFilters = {};
      Object.keys(filters).forEach(key => {
        const filter = filters[key];

        if (Array.isArray(filter)) {
          // eslint-disable-next-line prefer-destructuring
          newFilters[key] = filter[0];
        } else {
          newFilters[key] = filter;
        }
      });

      const requestParams = {
        count: pagination.pageSize,
        offset: (pagination.current - 1) * pagination.pageSize,
        ...newFilters,
      };

      if (sorter.field) {
        requestParams.sortBy = sorter.field;
      }

      if (sorter.order) {
        requestParams.asc = sorter.order === 'ascend';
      }

      this.props.fetch(requestParams);
    };

    componentDidMount() {
      this.props.fetch({ count: this.state.pagination.pageSize });
    }

    render() {
      const pagination = Object.assign({}, this.state.pagination);

      if (this.props.totalItems) {
        pagination.total = this.props.totalItems;
      } else {
        pagination.total = 0;
      }

      return (
        <WrappedComponent
          pagination={pagination}
          onChange={this.handleTableChange}
          {...this.props}
        />
      );
    }
  };
}

export default withAjax;
