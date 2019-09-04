import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import TournamentCard from '@/modules/public/components/Tournament/TournamentCard';
import { tournamentListItemPropType } from '@/modules/public/propTypes';

const TournamentList = props => (
  <List
    dataSource={props.dataSource}
    grid={{
      gutter: 16,
      xs: 4,
    }}
    renderItem={item => (
      <List.Item>
        <TournamentCard tournament={item} />
      </List.Item>
    )}
  />
);

TournamentList.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.shape(tournamentListItemPropType)),
};

export default TournamentList;
