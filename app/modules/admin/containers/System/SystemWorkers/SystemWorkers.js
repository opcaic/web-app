import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import WorkerList from '@/modules/admin/components/System/WorkerList';
import {
  actions as workerActions,
  selectors as workerSelectors,
} from '@/modules/admin/ducks/workers';
import { prepareFilterParams } from '@/modules/shared/helpers/table';
import { FormattedMessage } from 'react-intl';
import { Typography } from 'antd';

/* eslint-disable react/prefer-stateless-function */
class SystemWorkers extends React.PureComponent {
  render() {
    return (
      <div>
        <Typography.Title level={2}>
          <FormattedMessage id="app.admin.systemWorkers.title" />
        </Typography.Title>
        <WorkerList
          dataSource={this.props.items}
          loading={this.props.isFetching}
          fetch={this.props.fetchWorkers}
          totalItems={this.props.totalItems}
        />
      </div>
    );
  }
}

SystemWorkers.propTypes = {
  fetchWorkers: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool.isRequired,
  totalItems: PropTypes.number.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchWorkers: params =>
      dispatch(workerActions.fetchMany(prepareFilterParams(params))),
  };
}

const mapStateToProps = createStructuredSelector({
  items: workerSelectors.getItems,
  isFetchingItems: workerSelectors.isFetching,
  totalItems: workerSelectors.getTotalItems,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SystemWorkers);
