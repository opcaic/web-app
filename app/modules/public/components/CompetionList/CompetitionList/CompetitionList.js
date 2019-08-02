import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import CompetitionCard from '@/modules/public/components/CompetionList/CompetitionCard';

const CompetitionList = props => (
  <List
    grid={{
      gutter: 16,
      xs: 3,
    }}
    dataSource={props.competitions}
    renderItem={item => (
      <List.Item>
        <CompetitionCard {...item} />
      </List.Item>
    )}
  />
);

CompetitionList.propTypes = {
  competitions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
    }),
  ),
};

export default CompetitionList;
