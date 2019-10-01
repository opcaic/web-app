import React from 'react';
import { List } from 'antd';
import TournamentCard from '@/modules/public/components/Tournament/TournamentCard';

const TournamentCardList = props => (
  <List
    grid={{
      gutter: 16,
      xs: 4,
    }}
    renderItem={item => (
      <List.Item>
        <TournamentCard tournament={item} />
      </List.Item>
    )}
    {...props}
  />
);

export default TournamentCardList;
