import React from 'react';
import PropTypes from 'prop-types';
import { matchPropType } from '@/modules/public/utils/propTypes';
import {
  actions as submissionActions,
  selectors as submissionSelectors,
} from '@/modules/public/ducks/submissions';
import { prepareFilterParams } from '@/modules/shared/helpers/table';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Card } from 'antd';
import { currentUserSelector } from '@/modules/shared/selectors/auth';
import SubmissionList from '@/modules/shared/components/Tournament/SubmissionList';
import CardTable from '@/modules/shared/components/CardTable';
import { FormattedMessage } from 'react-intl';

/* eslint-disable react/prefer-stateless-function */
export class DashboardSubmissions extends React.PureComponent {
  render() {
    return (
      <Card
        title={<FormattedMessage id="app.public.dashboardSubmissions.title" />}
        bodyStyle={{ padding: 0 }}
      >
        <CardTable>
          <SubmissionList
            dataSource={this.props.isFetching ? null : this.props.items}
            loading={this.props.isFetching}
            fetch={this.props.fetchItems(this.props.currentUser.id)}
            isAdmin={false}
            size="small"
            view="dashboard"
            totalItems={Math.min(this.props.totalItems, 5 * 5)}
            pageSize={5}
          />
        </CardTable>
      </Card>
    );
  }
}

DashboardSubmissions.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(matchPropType)),
  isFetching: PropTypes.bool.isRequired,
  fetchItems: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: authorId => params =>
      dispatch(
        submissionActions.fetchMany(
          prepareFilterParams(params, 'created', false, {
            authorId,
          }),
        ),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  items: submissionSelectors.getItems,
  isFetching: submissionSelectors.isFetching,
  totalItems: submissionSelectors.getTotalItems,
  currentUser: currentUserSelector,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(DashboardSubmissions);
