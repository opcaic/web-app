import React from 'react';
import TournamentCardList from '@/modules/public/components/Tournament/TournamentCardList';
import { Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import withLoadMore from '@/modules/shared/helpers/hocs/withLoadMore';

export class TournamentCardListLoadMore extends React.PureComponent {
  render() {
    const loadMoreButton = this.props.hasMoreItems ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
        }}
      >
        <Button onClick={this.props.fetchData} loading={this.props.loading}>
          <FormattedMessage id="app.public.tournamentCardListLoadMore.loadMore" />
        </Button>
      </div>
    ) : null;

    return (
      <TournamentCardList
        dataSource={this.props.dataSource}
        loadMore={loadMoreButton}
        loading={this.props.initialLoad}
        emptyText={this.props.emptyText}
        updateFilter={this.props.updateFilter}
      />
    );
  }
}

TournamentCardListLoadMore.propTypes = {
  initialLoad: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  hasMoreItems: PropTypes.bool.isRequired,
  dataSource: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
  emptyText: PropTypes.string,
  updateFilter: PropTypes.func.isRequired,
};

export default withLoadMore()(TournamentCardListLoadMore);
