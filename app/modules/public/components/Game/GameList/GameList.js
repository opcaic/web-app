import React from 'react';
import { List } from 'antd';
import GameCard from '@/modules/public/components/Game/GameCard';

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
  />
);

GameList.propTypes = {};

export default GameList;
