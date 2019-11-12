import React from 'react';
import FailedSubmissionList from '@/modules/admin/components/Dashboard/FailedSubmissionList';
import {
  actions as submissionActions,
  selectors as submissionSelectors,
} from '@/modules/admin/ducks/submissions';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { submissionValidationStateEnum } from '@/modules/shared/helpers/enumHelpers';
import { Card } from 'antd';
import CardTable from '@/modules/shared/components/CardTable';

class FailedSubmissions extends React.Component {
  fetchItems = additionalParams => {
    const params = Object.assign({}, additionalParams, {
      validationState: submissionValidationStateEnum.ERROR,
      managedOnly: true,
    });

    this.props.fetchItems(params);
  };

  render() {
    return (
      <Card
        title={<FormattedMessage id="app.admin.dashboard.failedSubmissions" />}
        bodyStyle={{ padding: 0 }}
      >
        <CardTable>
          <FailedSubmissionList
            fetch={this.fetchItems}
            dataSource={this.props.isFetching ? [] : this.props.items}
            loading={this.props.isFetching}
            pageSize={5}
            totalItems={this.props.totalItems}
            size="small"
          />
        </CardTable>
      </Card>
    );
  }
}

FailedSubmissions.propTypes = {
  fetchItems: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  totalItems: PropTypes.number.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: params =>
      dispatch(submissionActions.fetchMany(params, 'created', false)),
  };
}

const mapStateToProps = createStructuredSelector({
  items: submissionSelectors.getItems,
  isFetching: submissionSelectors.isFetching,
  totalItems: submissionSelectors.getTotalItems,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(FailedSubmissions);
