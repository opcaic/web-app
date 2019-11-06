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

class TournamentManagers extends React.Component {
  componentDidMount() {
    this.props.fetchOrganizers();
  }

  removeCurrentManagers = (allOrganizers, currentManagers) =>
    allOrganizers.filter(u => !currentManagers.includes(u.email));

  handleSuccess = () => {
    this.props.fetchItems(this.props.tournament.id)();
  };

  render() {
    return (
      <div>
        <div style={{ marginBottom: 15 }}>
          <ManagersCreator
            createManager={this.props.createItem(
              this.props.tournament.id,
              this.handleSuccess,
            )}
            organizerUsers={this.removeCurrentManagers(
              this.props.organizerUsers,
              this.props.items,
            )}
            isCreating={this.props.isCreating}
          />
        </div>

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
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TournamentManagers);
