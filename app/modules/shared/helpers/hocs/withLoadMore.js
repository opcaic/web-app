import React from 'react';

const defaultOptions = {};

function withLoadMore(hocOptions = {}) {
  return WrappedComponent =>
    class extends React.Component {
      options = Object.assign({}, defaultOptions, hocOptions);

      state = {
        dataSource: [],
        total: 0,
        loading: false,
        initialLoad: true,
      };

      componentDidMount() {
        this.fetchData();
      }

      fetchData = () => {
        this.setState({ loading: true });
        this.props.fetchData(
          {
            count: this.props.pageSize,
            offset: this.state.dataSource.length,
          },
          this.onDataFetched,
        );
      };

      onDataFetched = data => {
        this.setState(state => ({
          dataSource: [...state.dataSource].concat(data.list),
          total: data.total,
          loading: false,
          initialLoad: false,
        }));
      };

      render() {
        const { pageSize, fetchData, ...rest } = this.props;

        return (
          <WrappedComponent
            initialLoad={this.state.initialLoad}
            loading={this.state.loading}
            dataSource={this.state.dataSource}
            hasMoreItems={this.state.dataSource.length !== this.state.total}
            fetchData={this.fetchData}
            {...rest}
          />
        );
      }
    };
}

export default withLoadMore;
