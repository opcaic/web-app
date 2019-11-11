import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Col, Collapse, Row } from 'antd';
import PropTypes from 'prop-types';
import {
  actions as matchesActions,
  selectors as matchesSelectors,
} from '@/modules/admin/ducks/matches';
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Spin from '@/modules/shared/components/Spin';
import MatchExecution from '@/modules/shared/components/Tournament/MatchExecution';
import { entryPointResultEnum } from '@/modules/shared/helpers/enumHelpers';
import { downloadFiles } from '@/modules/shared/ducks/matches';

/* eslint-disable react/prefer-stateless-function */
class TournamentMatchDetail extends React.PureComponent {
  componentDidMount() {
    this.props.fetchResource(this.props.match.params.matchId);
  }

  render() {
    const match = this.props.resource;

    return (
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
                          index: this.props.resource.executions.length - index,
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
    );
  }
}

TournamentMatchDetail.propTypes = {
  fetchResource: PropTypes.func.isRequired,
  downloadFiles: PropTypes.func.isRequired,
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
