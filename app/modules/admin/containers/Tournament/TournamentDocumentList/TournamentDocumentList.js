import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {
  actions as documentActions,
  selectors as documentSelectors,
} from '../../../ducks/documents';
import DocumentList from '@/modules/admin/components/Document/DocumentList';
import { prepareFilterParams } from '@/modules/shared/helpers/table';

/* eslint-disable react/prefer-stateless-function */
class TournamentDocumentList extends React.PureComponent {
  render() {
    return (
      <div>
        <Button type="primary" style={{ marginBottom: 20 }}>
          <Link
            to={`/admin/tournaments/${this.props.tournament.id}/documents/new`}
          >
            <FormattedMessage id="app.admin.tournamentDocumentList.createNew" />
          </Link>
        </Button>

        <DocumentList
          dataSource={this.props.items}
          loading={this.props.isFetching}
          fetch={this.props.fetchItems(this.props.tournament.id)}
          totalItems={this.props.totalItems}
          editLinkGenerator={id =>
            `/admin/tournaments/${this.props.tournament.id}/documents/${id}`
          }
        />
      </div>
    );
  }
}

TournamentDocumentList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool.isRequired,
  fetchItems: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
  tournament: PropTypes.object.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: tournamentId => params =>
      dispatch(
        documentActions.fetchMany(
          prepareFilterParams(params, 'name', true, { tournamentId }),
        ),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  items: documentSelectors.getItems,
  isFetching: documentSelectors.isFetching,
  totalItems: documentSelectors.getTotalItems,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TournamentDocumentList);
