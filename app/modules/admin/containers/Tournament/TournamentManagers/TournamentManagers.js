import React from 'react';
import ManagersList from '@/modules/admin/components/Tournament/ManagersList';
import {
  actions as managersActions,
  selectors as managersSelectors,
} from '@/modules/admin/ducks/tournamentManagers';
import {
  actions as usersActions,
  selectors as usersSelectors,
} from '@/modules/admin/ducks/users';
import { userRoleEnum } from '@/modules/shared/helpers/enumHelpers';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import ManagersCreator from '@/modules/admin/components/Tournament/ManagersCreator/ManagersCreator';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { pageTitles } from '@/modules/shared/utils/pageTitles';
import TournamentPageTitle from '@/modules/shared/components/Tournament/TournamentPageTitle';
import { currentUserSelector } from '@/modules/shared/selectors/auth';

class TournamentManagers extends React.Component {
  componentDidMount() {
    this.props.fetchOrganizers();
  }

  withoutCurrentManagers = (allOrganizers, currentManagers) =>
    allOrganizers.filter(u => !currentManagers.includes(u.email));

  withoutOwner = (allOrganizers, ownerId) =>
    allOrganizers.filter(u => u.id !== ownerId);

  handleSuccess = () => {
    this.props.fetchItems(this.props.tournament.id)();
  };

  render() {
    const canManage =
      this.props.currentUser.role === userRoleEnum.ADMIN ||
      this.props.currentUser.id === this.props.tournament.ownerId;

    return (
      <div>
        <TournamentPageTitle
          title={intlGlobal.formatMessage(
            pageTitles.tournamentDetailManagersPage,
          )}
          tournament={this.props.tournament}
        />
        {canManage && (
          <div style={{ marginBottom: 15 }}>
            <ManagersCreator
              createManager={this.props.createItem(
                this.props.tournament.id,
                this.handleSuccess,
              )}
              organizerUsers={this.withoutOwner(
                this.withoutCurrentManagers(
                  this.props.organizerUsers,
                  this.props.items,
                ),
                this.props.tournament.ownerId,
              )}
              isCreating={this.props.isCreating}
            />
          </div>
        )}

        <ManagersList
          fetch={this.props.fetchItems(this.props.tournament.id)}
          deleteItem={this.props.deleteItem(
            this.props.tournament.id,
            this.handleSuccess,
          )}
          isDeleting={this.props.isDeleting}
          dataSource={this.props.items}
          loading={this.props.isLoading}
          totalItems={this.props.totalItems}
          canDelete={canManage}
        />
      </div>
    );
  }
}

TournamentManagers.propTypes = {
  fetchItems: PropTypes.func.isRequired,
  createItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  items: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  isCreating: PropTypes.bool.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  totalItems: PropTypes.number.isRequired,
  tournament: PropTypes.object.isRequired,
  fetchOrganizers: PropTypes.func.isRequired,
  organizerUsers: PropTypes.array,
  currentUser: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: tournamentId => () =>
      dispatch(
        managersActions.fetchMany(null, {
          endpointParams: { tournamentId },
        }),
      ),
    createItem: (tournamentId, successCallback, failureCallback) => email =>
      dispatch(
        managersActions.createResource(
          {},
          {
            endpointParams: { tournamentId },
            meta: { successCallback, failureCallback },
          },
          email,
        ),
      ),
    deleteItem: (tournamentId, successCallback, failureCallback) => email =>
      dispatch(
        managersActions.deleteResource(email, {
          endpointParams: { tournamentId },
          meta: { successCallback, failureCallback },
        }),
      ),
    fetchOrganizers: () =>
      dispatch(
        usersActions.fetchMany({
          offset: 0,
          count: 100,
          userRole: [userRoleEnum.ADMIN, userRoleEnum.ORGANIZER],
        }),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  items: managersSelectors.getItems,
  isFetching: managersSelectors.isFetching,
  isCreating: managersSelectors.isCreating,
  isDeleting: managersSelectors.isDeleting,
  totalItems: managersSelectors.getTotalItems,
  organizerUsers: usersSelectors.getItems,
  currentUser: currentUserSelector,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TournamentManagers);
