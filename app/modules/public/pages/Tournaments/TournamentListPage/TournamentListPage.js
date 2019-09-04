import React from 'react';
import PageLayout from '@/modules/public/components/layout/PageLayout';
import TournamentList from '@/modules/public/components/Tournament/TournamentList';
import PropTypes from 'prop-types';
import {
  actions as tournamentActions,
  selectors as tournamentSelectors,
} from '@/modules/public/ducks/tournaments';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { tournamentListItemPropType } from '@/modules/public/propTypes';
import { prepareFilterParams } from '@/modules/shared/helpers/table';
import { getTournamentsListItems } from '@/modules/public/selectors/tournaments';

/* eslint-disable react/prefer-stateless-function */
export class TournamentListPage extends React.PureComponent {
  componentWillMount() {
    this.props.fetchItems();
  }

  render() {
    return (
      <PageLayout>
        <div className="container" style={{ marginTop: 30 }}>
          <TournamentList
            dataSource={this.props.items}
            loading={this.props.isFetching}
            fetch={this.props.fetchItems}
            totalItems={this.props.totalItems}
          />
        </div>
      </PageLayout>
    );
  }
}

TournamentListPage.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(tournamentListItemPropType)),
  isFetching: PropTypes.bool.isRequired,
  fetchItems: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: () =>
      dispatch(
        tournamentActions.fetchMany(
          // TODO: how to sort this?
          prepareFilterParams({ count: 100 }, 'name', true),
        ),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  items: getTournamentsListItems,
  isFetching: tournamentSelectors.isFetching,
  totalItems: tournamentSelectors.getTotalItems,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TournamentListPage);
