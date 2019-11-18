import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Col, Collapse, Row, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import {
  actions as matchesActions,
  selectors as matchesSelectors,
  createMatchExecution,
} from '@/modules/admin/ducks/matches';
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Spin from '@/modules/shared/components/Spin';
import MatchExecution from '@/modules/shared/components/Tournament/MatchExecution';
import {
  entryPointResultEnum,
  matchStateEnum,
} from '@/modules/shared/helpers/enumHelpers';
import { downloadFiles } from '@/modules/shared/ducks/matches';
import { pageTitles } from '@/modules/shared/utils/pageTitles';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import TournamentPageTitle from '@/modules/shared/components/Tournament/TournamentPageTitle';

/* eslint-disable react/prefer-stateless-function */
class TournamentMatchDetail extends React.PureComponent {
  componentDidMount() {
    this.props.fetchResource(this.props.match.params.matchId);
  }

  handleSuccess = () => {
    this.props.fetchResource(this.props.resource.id);
  };

  handleMatchReexecution = () => {
    this.props.createMatchExecution(this.props.resource.id, this.handleSuccess);
  };

  render() {
    const match = this.props.resource;

    return (
      <div>
        <TournamentPageTitle
          tournament={this.props.tournament}
          title={intlGlobal.formatMessage(pageTitles.tournamentDetailMatchPage)}
        />
        <Spin spinning={this.props.isFetching || this.props.resource === null}>
          <Row>
            <Col span={24}>
              <Button type="default" style={{ marginBottom: 20 }}>
                <Link
                  to={`/admin/tournaments/${this.props.tournament.id}/matches/`}
                >
                  <FormattedMessage id="app.admin.tournamentMatchDetail.backToList" />
                </Link>
              </Button>
              <Popconfirm
                title={
                  <FormattedMessage id="app.admin.confirms.executeMatch" />
                }
                onConfirm={this.handleMatchReexecution}
              >
                <Button
                  disabled={!match || match.state !== matchStateEnum.FAILED}
                >
                  <FormattedMessage id="app.admin.matchList.rematch" />
                </Button>
              </Popconfirm>

              <Collapse defaultActiveKey={[0]} accordion>
                {match &&
                  match.executions.reverse().map((x, index) => (
                    <Collapse.Panel
                      header={
                        <FormattedMessage
                          id="app.admin.tournamentMatchDetail.collapseHeader"
                          values={{
                            state: entryPointResultEnum.helpers.idToText(
                              x.executorResult,
                            ),
                            index:
                              this.props.resource.executions.length - index,
                          }}
                        />
                      }
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                    >
                      <MatchExecution
                        matchExecution={x}
                        match={match}
                        tournament={this.props.tournament}
                        isAdmin
                        downloadFiles={() => this.props.downloadFiles(x.id)}
                      />
                    </Collapse.Panel>
                  ))}
              </Collapse>
            </Col>
          </Row>
        </Spin>
      </div>
    );
  }
}

TournamentMatchDetail.propTypes = {
  fetchResource: PropTypes.func.isRequired,
  downloadFiles: PropTypes.func.isRequired,
  createMatchExecution: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  resource: PropTypes.object,
  match: PropTypes.object.isRequired,
  tournament: PropTypes.object.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchResource: id =>
      dispatch(
        matchesActions.fetchResource(id, {
          request: {
            endpoint: `api/matches/${id}/admin`,
            params: { anonymize: false },
          },
        }),
      ),
    downloadFiles: id => dispatch(downloadFiles(id)),
    createMatchExecution: (matchId, successCallback, failureCallback) =>
      dispatch(createMatchExecution(matchId, successCallback, failureCallback)),
  };
}

const mapStateToProps = createStructuredSelector({
  isFetching: matchesSelectors.isFetchingItem,
  resource: matchesSelectors.getItem,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(TournamentMatchDetail);
