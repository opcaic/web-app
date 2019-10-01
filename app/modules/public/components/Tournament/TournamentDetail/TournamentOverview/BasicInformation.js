import { Descriptions, Tooltip, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import {
  formatTooltipIntlMessages,
  scopeTextIntlMessages,
  scopeTooltipIntlMessages,
} from '@/modules/public/components/Tournament/TournamentDetail/TournamentOverview/localization';
import { tournamentFormatEnum } from '@/modules/shared/helpers/enumHelpers';
import ReactMarkdown from 'react-markdown';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { tournamentPropType } from '@/modules/public/utils/propTypes';
import CodeBlock from '@/modules/shared/components/CodeBlock';

const WithTooltip = styled.span`
  border-bottom: 1px dotted black;
`;

const StyledDescriptions = styled(Descriptions)`
  & .ant-descriptions-row > th,
  & .ant-descriptions-row > td {
    padding-bottom: 8px;
  }
`;

const BasicInformation = props => (
  <div>
    <StyledDescriptions column={1} size="small">
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
          title={intlGlobal.formatMessage(
            scopeTooltipIntlMessages[props.tournament.scope],
          )}
        >
          <WithTooltip>
            {intlGlobal.formatMessage(
              scopeTextIntlMessages[props.tournament.scope],
              {
                deadline: intlGlobal.formatDate(
                  new Date(props.tournament.deadline),
                ),
              },
            )}
          </WithTooltip>
        </Tooltip>
      </Descriptions.Item>
      <Descriptions.Item
        label={<FormattedMessage id="app.public.tournamentOverview.format" />}
      >
        <Tooltip
          placement="right"
          title={intlGlobal.formatMessage(
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
    </StyledDescriptions>

    {props.tournament.description && (
      <div style={{ marginTop: 15 }}>
        <Typography.Title level={4}>
          <FormattedMessage id="app.public.tournamentOverview.description" />
        </Typography.Title>
        <div>
          <ReactMarkdown
            source={props.tournament.description}
            renderers={{
              code: CodeBlock,
            }}
          />
        </div>
      </div>
    )}
  </div>
);

BasicInformation.propTypes = {
  tournament: PropTypes.shape(tournamentPropType).isRequired,
};

export default BasicInformation;
