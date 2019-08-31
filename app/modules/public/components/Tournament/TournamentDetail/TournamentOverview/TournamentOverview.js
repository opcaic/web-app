import React from 'react';
import { Descriptions, Tooltip, Typography } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { tournamentFormatEnum } from '@/modules/shared/helpers/enumHelpers';
import { tournamentPropType } from '@/modules/public/propTypes';
import PageContent from '@/modules/public/components/Tournament/PageContent';
import { intl } from '@/modules/shared/helpers/IntlGlobalProvider';
import {
  formatTooltipIntlMessages,
  scopeTextIntlMessages,
  scopeTooltipIntlMessages,
} from '@/modules/public/components/Tournament/TournamentDetail/TournamentOverview/localization';

const WithTooltip = styled.span`
  border-bottom: 1px dotted black;
`;

/* eslint-disable react/prefer-stateless-function */
const TournamentOverview = props => (
  <PageContent title="Overview">
    <Descriptions
      title={<Typography.Title level={2}>Basic information</Typography.Title>}
      column={1}
      size="small"
    >
      <Descriptions.Item
        label={<FormattedMessage id="app.public.tournamentOverview.name" />}
      >
        {props.tournament.name}
      </Descriptions.Item>
      <Descriptions.Item
        label={<FormattedMessage id="app.public.tournamentOverview.game" />}
      >
        <Link to={`/games/${props.tournament.game.id}`}>
          {props.tournament.game.name}
        </Link>
      </Descriptions.Item>
      <Descriptions.Item
        label={<FormattedMessage id="app.public.tournamentOverview.scope" />}
      >
        <Tooltip
          placement="right"
          title={intl.formatMessage(
            scopeTooltipIntlMessages[props.tournament.scope],
          )}
        >
          <WithTooltip>
            {intl.formatMessage(scopeTextIntlMessages[props.tournament.scope], {
              deadline: intl.formatDate(new Date(props.tournament.deadline)),
            })}
          </WithTooltip>
        </Tooltip>
      </Descriptions.Item>
      <Descriptions.Item
        label={<FormattedMessage id="app.public.tournamentOverview.format" />}
      >
        <Tooltip
          placement="right"
          title={intl.formatMessage(
            formatTooltipIntlMessages[props.tournament.format],
          )}
        >
          <WithTooltip>
            {tournamentFormatEnum.idToText(props.tournament.format)}
          </WithTooltip>
        </Tooltip>
      </Descriptions.Item>
      <Descriptions.Item
        label={<FormattedMessage id="app.public.tournamentOverview.players" />}
      >
        {props.tournament.playersCount}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <FormattedMessage id="app.public.tournamentOverview.submissions" />
        }
      >
        {props.tournament.submissionsCount}
      </Descriptions.Item>
    </Descriptions>

    {props.tournament.description && [
      <Typography.Title level={2}>Description</Typography.Title>,

      <div>{props.tournament.description}</div>,
    ]}
  </PageContent>
);

TournamentOverview.propTypes = {
  tournament: PropTypes.shape(tournamentPropType).isRequired,
};

export default TournamentOverview;
