import React from 'react';
import PropTypes from 'prop-types';
import { Button, Descriptions, Icon } from 'antd';
import { FormattedMessage } from 'react-intl';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { longDateFormat } from '@/modules/shared/helpers/time';
import { entryPointResultEnum } from '@/modules/shared/helpers/enumHelpers';
import { theme } from '@/modules/shared/helpers/utils';
import styled from 'styled-components';

function getValidationStateIcon(state) {
  let icon = null;

  switch (state) {
    case entryPointResultEnum.NOT_EXECUTED:
      icon = {
        icon: 'question-circle',
        color: theme.DANGER_COLOR,
      };
      break;

    case entryPointResultEnum.SUCCESS:
      icon = {
        icon: 'check-circle',
        color: theme.SUCCESS_COLOR,
      };
      break;

    default:
      icon = {
        icon: 'exclamation-circle',
        color: theme.ERROR_COLOR,
      };
      break;
  }

  return (
    <Icon
      type={icon.icon}
      style={{ color: icon.color, fontSize: 16, marginRight: 5 }}
    />
  );
}

const ShowLogButton = styled(Button)`
  height: 22px;
  float: right;
`;

const Validation = ({ validation, showLog, isAdmin }) => {
  const shouldDisplayException = isAdmin && validation.exception !== null;

  return (
    <div>
      <Descriptions column={1} size="small" bordered style={{ marginTop: 15 }}>
        <Descriptions.Item
          label={<FormattedMessage id="app.shared.submission.validationId" />}
        >
          {validation.id}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <FormattedMessage id="app.shared.submission.validationsDate" />
          }
        >
          {validation.executed ? (
            intlGlobal.formatDate(validation.executed, longDateFormat)
          ) : (
            <FormattedMessage id="app.shared.submission.validationNotExecuted" />
          )}
        </Descriptions.Item>
        <Descriptions.Item
          label={<FormattedMessage id="app.shared.submission.checkerResult" />}
        >
          {getValidationStateIcon(validation.checkerResult)}
          {entryPointResultEnum.helpers.idToText(validation.checkerResult)}
          {validation.checkerResult !== entryPointResultEnum.NOT_EXECUTED && [
            <ShowLogButton
              size="small"
              style={{ marginLeft: 10 }}
              onClick={() =>
                showLog(
                  <FormattedMessage id="app.shared.submission.checkerErrorResultModalTitle" />,
                  validation.checkerErrorLog,
                )
              }
            >
              <FormattedMessage id="app.shared.submission.showErrorLog" />
            </ShowLogButton>,
            <ShowLogButton
              size="small"
              onClick={() =>
                showLog(
                  <FormattedMessage id="app.shared.submission.checkerResultModalTitle" />,
                  validation.checkerLog,
                )
              }
            >
              <FormattedMessage id="app.shared.submission.showLog" />
            </ShowLogButton>,
          ]}
        </Descriptions.Item>
        <Descriptions.Item
          label={<FormattedMessage id="app.shared.submission.compilerResult" />}
        >
          {getValidationStateIcon(validation.compilerResult)}
          {entryPointResultEnum.helpers.idToText(validation.compilerResult)}

          {validation.compilerResult !== entryPointResultEnum.NOT_EXECUTED && [
            <ShowLogButton
              size="small"
              style={{ marginLeft: 10 }}
              onClick={() =>
                showLog(
                  <FormattedMessage id="app.shared.submission.compilerErrorResultModalTitle" />,
                  validation.compilerErrorLog,
                )
              }
            >
              <FormattedMessage id="app.shared.submission.showErrorLog" />
            </ShowLogButton>,
            <ShowLogButton
              size="small"
              onClick={() =>
                showLog(
                  <FormattedMessage id="app.shared.submission.compilerResultModalTitle" />,
                  validation.compilerLog,
                )
              }
            >
              <FormattedMessage id="app.shared.submission.showLog" />
            </ShowLogButton>,
          ]}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <FormattedMessage id="app.shared.submission.validatorResult" />
          }
        >
          {getValidationStateIcon(validation.validatorResult)}
          {entryPointResultEnum.helpers.idToText(validation.validatorResult)}
          {validation.validatorResult !== entryPointResultEnum.NOT_EXECUTED && [
            <ShowLogButton
              size="small"
              style={{ marginLeft: 10 }}
              onClick={() =>
                showLog(
                  <FormattedMessage id="app.shared.submission.validatorErrorResultModalTitle" />,
                  validation.validatorErrorLog,
                )
              }
            >
              <FormattedMessage id="app.shared.submission.showErrorLog" />
            </ShowLogButton>,
            <ShowLogButton
              size="small"
              onClick={() =>
                showLog(
                  <FormattedMessage id="app.shared.submission.validatorResultModalTitle" />,
                  validation.validatorLog,
                )
              }
            >
              <FormattedMessage id="app.shared.submission.showLog" />
            </ShowLogButton>,
          ]}
        </Descriptions.Item>
        {shouldDisplayException && (
          <Descriptions.Item
            label={<FormattedMessage id="app.shared.submission.exception" />}
          >
            {validation.exception}
          </Descriptions.Item>
        )}
      </Descriptions>
    </div>
  );
};

Validation.propTypes = {
  validation: PropTypes.object.isRequired,
  showLog: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
};

export default Validation;
