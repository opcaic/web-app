import React from 'react';
import { List } from 'antd';
import GameCard from '@/modules/public/components/Game/GameCard';
import EmptyTablePlaceholder from '@/modules/shared/components/EmptyTablePlaceholder';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

const GameList = props => (
  <List
    dataSource={props.dataSource}
    loading={props.loading}
    grid={{
      gutter: 16,
      xs: 1,
      sm: 2,
      md: 3,
      xl: 4,
    }}
    renderItem={item => (
      <List.Item>
        <GameCard game={item} />
      </List.Item>
    )}
    locale={{
      emptyText: (
        <EmptyTablePlaceholder
          text={
            props.emptyText ? (
              props.emptyText
            ) : (
              <FormattedMessage id="app.public.gameList.noGames" />
            )
          }
        />
      ),
    }}
  />
);

GameList.propTypes = {
  emptyText: PropTypes.object,
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
};

export default GameList;
