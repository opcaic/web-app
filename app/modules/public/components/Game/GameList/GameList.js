import React from 'react';
import { List } from 'antd';
import GameCard from '@/modules/public/components/Game/GameCard';
import EmptyTablePlaceholder from '@/modules/shared/components/EmptyTablePlaceholder';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

const GameList = props => (
  <List
    {...props}
    grid={{
      gutter: 16,
      xs: 4,
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
  emptyText: PropTypes.string,
};

export default GameList;
