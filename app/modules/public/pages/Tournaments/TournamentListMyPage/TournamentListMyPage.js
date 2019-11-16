import React from 'react';
import PropTypes from 'prop-types';
import {
  actions as tournamentActions,
  selectors as tournamentSelectors,
} from '@/modules/public/ducks/tournaments';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { tournamentListItemPropType } from '@/modules/public/utils/propTypes';
import { prepareFilterParams } from '@/modules/shared/helpers/table';
import TournamentList from '@/modules/shared/components/Tournament/TournamentList';
import { currentUserSelector } from '@/modules/shared/selectors/auth';
import { tournamentStateEnum } from '@/modules/shared/helpers/enumHelpers';
import PageLayout from '@/modules/public/components/layout/PageLayout';
import PageTitle from '@/modules/shared/components/PageTitle';
import Container from '@/modules/public/components/layout/Container';
import PageContent from '@/modules/public/components/layout/PageContent';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { pageTitles } from '@/modules/shared/utils/pageTitles';

/* eslint-disable react/prefer-stateless-function */
export class TournamentListMyPage extends React.PureComponent {
  render() {
    return (
      <PageLayout>
        <PageTitle
          title={intlGlobal.formatMessage(pageTitles.tournamentListMyPage)}
        />

        <Container>
          <PageContent
            title={intlGlobal.formatMessage(pageTitles.tournamentListMyPage)}
            withPadding={false}
          >
            <TournamentList
              dataSource={this.props.items}
              loading={this.props.isFetching}
              fetch={this.props.fetchItems(this.props.currentUser.id)}
              isAdmin={false}
              view="my-tournaments"
              totalItems={this.props.totalItems}
              pageSize={10}
            />
          </PageContent>
        </Container>
      </PageLayout>
    );
  }
}

TournamentListMyPage.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(tournamentListItemPropType)),
  isFetching: PropTypes.bool.isRequired,
  fetchItems: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: userId => params =>
      dispatch(
        tournamentActions.fetchMany(
          prepareFilterParams(params, 'deadline', false, {
            userId,
            state: tournamentStateEnum.helpers
              .getValues()
              .map(x => x.id)
              .filter(x => x !== tournamentStateEnum.CREATED),
          }),
        ),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  items: tournamentSelectors.getItems,
  isFetching: tournamentSelectors.isFetching,
  totalItems: tournamentSelectors.getTotalItems,
  currentUser: currentUserSelector,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TournamentListMyPage);
