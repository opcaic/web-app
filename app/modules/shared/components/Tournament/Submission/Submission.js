import React, { Component } from 'react';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  Alert,
  Button,
  Col,
  Collapse,
  Descriptions,
  Icon,
  Row,
  Typography,
} from 'antd';
import { submissionValidationStateEnum } from '@/modules/shared/helpers/enumHelpers';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { longDateFormat } from '@/modules/shared/helpers/time';
import { theme } from '@/modules/shared/helpers/utils';
import MatchList from '@/modules/shared/components/Tournament/MatchList';
import LogModal from '@/modules/shared/components/Tournament/LogModal';
import Validation from '@/modules/shared/components/Tournament/Submission/Validation';

function getStateDescription(state) {
  let description = null;

  switch (state) {
    case submissionValidationStateEnum.QUEUED:
      description = {
        icon: 'question-circle',
        color: theme.DANGER_COLOR,
        text: (
          <FormattedMessage id="app.shared.submission.stateNotValidatedTooltip" />
        ),
      };
      break;

    case submissionValidationStateEnum.VALID:
      description = {
        icon: 'check-circle',
        color: theme.SUCCESS_COLOR,
        text: (
          <FormattedMessage id="app.shared.submission.stateSuccessTooltip" />
        ),
      };
      break;

    case submissionValidationStateEnum.INVALID:
      description = {
        icon: 'exclamation-circle',
        color: theme.ERROR_COLOR,
        text: (
          <FormattedMessage id="app.shared.submission.stateInvalidTooltip" />
        ),
      };
      break;

    case submissionValidationStateEnum.ERROR:
      description = {
        icon: 'exclamation-circle',
        color: theme.ERROR_COLOR,
        text: <FormattedMessage id="app.shared.submission.stateErrorTooltip" />,
      };
      break;

    default:
      return null;
  }

  return (
    <div>
      <Icon
        type={description.icon}
        style={{ color: description.color, fontSize: 16, marginRight: 5 }}
      />
      {description.text}
    </div>
  );
}

class Submission extends Component {
  state = {
    logModalVisible: false,
    logModalTitle: null,
    logModalText: null,
  };

  showLog = (title, text) => {
    this.setState({
      logModalVisible: true,
      logModalTitle: title,
      logModalText: text,
    });
  };

  hideLog = () => {
    this.setState({ logModalVisible: false });
  };

  render() {
    return (
      <div>
        <LogModal
          visible={this.state.logModalVisible}
          title={this.state.logModalTitle}
          log={this.state.logModalText}
          onCancel={this.hideLog}
          onOk={this.hideLog}
          footer={
            <Button onClick={this.hideLog}>
              <FormattedMessage id="app.shared.submission.closeLog" />
            </Button>
          }
        />

        <Row>
          <Col xs={24} lg={16}>
            <Typography.Title level={3}>
              <FormattedMessage id="app.shared.submission.basicInformation" />
            </Typography.Title>

            {this.props.submission.validationState ===
              submissionValidationStateEnum.QUEUED && (
              <Alert
                message={
                  <FormattedMessage id="app.shared.submission.refreshPageValidation" />
                }
                type="info"
                showIcon
                style={{ marginBottom: 10 }}
              />
            )}

            <Descriptions column={1} size="small" bordered>
              <Descriptions.Item
                label={<FormattedMessage id="app.shared.submission.date" />}
              >
                {intlGlobal.formatDate(
                  this.props.submission.created,
                  longDateFormat,
                )}
              </Descriptions.Item>

              {this.props.isAdmin && (
                <Descriptions.Item
                  label={<FormattedMessage id="app.shared.submission.user" />}
                >
                  {this.props.submission.author.username}
                </Descriptions.Item>
              )}

              <Descriptions.Item
                label={<FormattedMessage id="app.shared.submission.active" />}
              >
                {this.props.submission.isActive ? (
                  <div>
                    <Icon
                      type="check"
                      style={{
                        color: theme.SUCCESS_COLOR,
                        fontSize: 16,
                        marginRight: 5,
                      }}
                    />
                    <FormattedHTMLMessage id="app.shared.submission.activeDescription" />
                  </div>
                ) : (
                  <div>
                    <Icon
                      type="close"
                      style={{
                        color: theme.ERROR_COLOR,
                        fontSize: 16,
                        marginRight: 5,
                      }}
                    />
                    <FormattedHTMLMessage id="app.shared.submission.notActiveDescription" />
                  </div>
                )}
              </Descriptions.Item>

              <Descriptions.Item
                label={<FormattedMessage id="app.shared.submission.state" />}
              >
                {getStateDescription(this.props.submission.validationState)}
              </Descriptions.Item>
            </Descriptions>

            <div style={{ marginTop: 15 }}>
              <Button
                type="primary"
                icon="download"
                onClick={() =>
                  this.props.downloadSubmission(this.props.submission.id)
                }
              >
                <FormattedMessage id="app.shared.submission.download" />
              </Button>

              {this.props.isAdmin && (
                <Button
                  type="primary"
                  style={{ marginLeft: 10 }}
                  onClick={() =>
                    this.props.runValidation(
                      this.props.submission.id,
                      this.props.tournament.id,
                    )
                  }
                >
                  <FormattedMessage id="app.shared.submission.runValidation" />
                </Button>
              )}
            </div>

            {this.props.validations && (
              <div style={{ marginTop: 15 }}>
                <Typography.Title level={4}>
                  <FormattedMessage id="app.shared.submission.validations" />
                </Typography.Title>

                {this.props.isAdmin && this.props.validations.length > 1 ? (
                  <Collapse defaultActiveKey={[0]} accordion>
                    {this.props.validations &&
                      this.props.validations.reverse().map((x, index) => (
                        <Collapse.Panel
                          header={
                            <FormattedMessage
                              id="app.shared.submission.validationCollapseHeader"
                              values={{
                                index: this.props.validations.length - index,
                              }}
                            />
                          }
                          // eslint-disable-next-line react/no-array-index-key
                          key={index}
                        >
                          <Validation
                            validation={x}
                            showLog={this.showLog}
                            isAdmin={this.props.isAdmin}
                          />
                        </Collapse.Panel>
                      ))}
                  </Collapse>
                ) : (
                  <Validation
                    validation={this.props.validations[0]}
                    showLog={this.showLog}
                  />
                )}
              </div>
            )}
          </Col>
        </Row>

        <div style={{ marginTop: 30 }}>
          <Typography.Title level={3}>
            <FormattedMessage id="app.shared.submission.matches" />
          </Typography.Title>

          <div
            style={{
              margin: this.props.isAdmin ? null : '0px -27px -25px -25px',
            }}
          >
            <MatchList
              dataSource={this.props.matches}
              loading={this.props.isFetchingMatches}
              fetch={this.props.fetchMatches}
              totalItems={this.props.matchesTotalItems}
              tournament={this.props.tournament}
              isAdmin={this.props.isAdmin}
              emptyText={
                <FormattedMessage id="app.shared.submission.noMatches" />
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

Submission.propTypes = {
  tournament: PropTypes.object,
  submission: PropTypes.object,
  isAdmin: PropTypes.bool.isRequired,
  matches: PropTypes.array,
  isFetchingMatches: PropTypes.bool.isRequired,
  fetchMatches: PropTypes.func.isRequired,
  matchesTotalItems: PropTypes.number,
  validations: PropTypes.array,
  downloadSubmission: PropTypes.func.isRequired,
  runValidation: PropTypes.func,
};

export default Submission;
