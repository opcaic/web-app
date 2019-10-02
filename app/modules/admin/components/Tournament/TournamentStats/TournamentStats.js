import React from 'react';
import { Descriptions } from 'antd';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { tournamentStateEnum } from '@/modules/shared/helpers/enumHelpers';

const TournamentStats = props => (
  <Descriptions layout="vertical" bordered column={4} size="small">
    <Descriptions.Item
      span={1}
      label={<FormattedMessage id="app.admin.tournamentStats.playersCount" />}
    >
      {props.resource.playersCount}
    </Descriptions.Item>
    <Descriptions.Item
      span={1}
      label={
        <FormattedMessage id="app.admin.tournamentStats.submissionsCount" />
      }
    >
      {props.resource.submissionsCount}
    </Descriptions.Item>
    <Descriptions.Item
      label={
        <FormattedMessage id="app.admin.tournamentStats.activeSubmissionsCount" />
      }
    >
      {props.resource.activeSubmissionsCount}
    </Descriptions.Item>
    <Descriptions.Item
      label={<FormattedMessage id="app.admin.tournamentStats.state" />}
    >
      {tournamentStateEnum.helpers.idToText(props.resource.state)}
    </Descriptions.Item>
  </Descriptions>
);

TournamentStats.propTypes = {
  resource: PropTypes.object,
};

export default TournamentStats;
