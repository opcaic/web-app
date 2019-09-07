import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Col, Row } from 'antd';
import PropTypes from 'prop-types';
import { actions as participantsActions } from '@/modules/admin/ducks/tournamentParticipants';
import ParticipantsForm from '@/modules/admin/components/Tournament/ParticipantForm';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

/* eslint-disable react/prefer-stateless-function */
class TournamentParticipantNew extends React.PureComponent {
  render() {
    return (
      <Row>
        <Col span={24}>
          <Button type="default" style={{ marginBottom: 20 }}>
            <Link
              to={`/admin/tournaments/${
                this.props.tournament.id
              }/participants/`}
            >
              <FormattedMessage id="app.admin.tournamentDocumentNew.backToList" />
            </Link>
          </Button>

          <ParticipantsForm
            resource={{}}
            onSubmit={(values, successCallback, failureCallback) =>
              this.props.createResource(
                this.props.tournament.id,
                values,
                successCallback,
                failureCallback,
              )
            }
          />
        </Col>
      </Row>
    );
  }
}

TournamentParticipantNew.propTypes = {
  createResource: PropTypes.func.isRequired,
  tournament: PropTypes.object.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    createResource: (
      tournamentId,
      resource,
      successCallback,
      failureCallback,
    ) =>
      dispatch(
        participantsActions.createResource(resource, {
          endpointParams: {
            tournamentId,
          },
          meta: {
            successCallback,
            failureCallback,
          },
        }),
      ),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(TournamentParticipantNew);
