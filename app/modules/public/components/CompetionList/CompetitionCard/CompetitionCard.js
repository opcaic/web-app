import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'antd';
import { Link } from 'react-router-dom';

const CompetitionCard = props => (
  <Card title={props.name}>
    <div style={{ height: 135 }}>{props.description}</div>
    <div style={{ textAlign: 'center' }}>
      <Button type="primary" size="large">
        <Link to={`/competition/${props.name}`}>Join</Link>
      </Button>
    </div>
  </Card>
);

CompetitionCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default CompetitionCard;
