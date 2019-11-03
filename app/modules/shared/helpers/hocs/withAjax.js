import React from 'react';

function withAjax(WrappedComponent, withSorting = true, withPaging = true) {
  return class extends React.Component {
    static defaultProps = {
      pageSize: 10,
    };

    constructor(props) {
      super(props);

      this.state = {
        pagination: { pageSize: props.pageSize },
        delayedLoading: true,
      };

      // On first load, show the loading indicator for at least 200 ms so that
      // the old api resource content does not flash before the loader shows
      setTimeout(() => {
        this.setState({ delayedLoading: false });
      }, 200);
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

      const pagingParams = {
        count: pagination.pageSize,
        offset: (pagination.current - 1) * pagination.pageSize,
      };

      const requestParams = withPaging
        ? Object.assign(newFilters, pagingParams)
        : newFilters;

      if (withSorting) {
        if (sorter.field) {
          requestParams.sortBy = sorter.field;
        }

        if (sorter.order) {
          requestParams.asc = sorter.order === 'ascend';
        }
      }

      this.props.fetch(requestParams);
    };

    componentDidMount() {
      this.props.fetch({ count: this.state.pagination.pageSize });
    }

    render() {
      const pagination = Object.assign({}, this.state.pagination);
      const { loading, dataSource, ...rest } = this.props;

      if (this.props.totalItems) {
        pagination.total = this.props.totalItems;
      } else {
        pagination.total = 0;
      }

      return (
        <WrappedComponent
          pagination={pagination}
          onChange={this.handleTableChange}
          loading={this.state.delayedLoading || loading}
          dataSource={this.state.delayedLoading ? [] : dataSource}
          {...rest}
        />
      );
    }
  };
}

export default withAjax;
