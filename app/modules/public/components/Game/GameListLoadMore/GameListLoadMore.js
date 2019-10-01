import React from 'react';
import { Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import withLoadMore from '@/modules/shared/helpers/hocs/withLoadMore';
import GameList from '@/modules/public/components/Game/GameList';

export class GameListLoadMore extends React.PureComponent {
  render() {
    const loadMoreButton = this.props.hasMoreItems ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
        }}
      >
        <Button onClick={this.props.fetchData} loading={this.props.loading}>
          <FormattedMessage id="app.public.gameListLoadMore.loadMore" />
        </Button>
      </div>
    ) : null;

    return (
      <GameList
        dataSource={this.props.dataSource}
        loadMore={loadMoreButton}
        loading={this.props.initialLoad}
      />
    );
  }
}

GameListLoadMore.propTypes = {
  initialLoad: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  hasMoreItems: PropTypes.bool.isRequired,
  dataSource: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default withLoadMore()(GameListLoadMore);
