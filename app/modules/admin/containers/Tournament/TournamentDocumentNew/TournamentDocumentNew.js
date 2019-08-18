import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Col, Row } from 'antd';
import PropTypes from 'prop-types';
import { actions as documentsActions } from '@/modules/admin/ducks/documents';
import DocumentForm from '@/modules/admin/components/Document/DocumentForm';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

/* eslint-disable react/prefer-stateless-function */
class TournamentDocumentNew extends React.PureComponent {
  render() {
    return (
      <Row>
        <Col span={24}>
          <Button type="default" style={{ marginBottom: 20 }}>
            <Link
              to={`/admin/tournaments/${this.props.tournament.id}/documents/`}
            >
              <FormattedMessage id="app.admin.tournamentDocumentNew.backToList" />
            </Link>
          </Button>

          <DocumentForm
            resource={{}}
            onSubmit={(values, successCallback, failureCallback) =>
              this.props.createResource(
                Object.assign({}, values, {
                  tournamentId: this.props.tournament.id,
                }),
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

TournamentDocumentNew.propTypes = {
  createResource: PropTypes.func.isRequired,
  tournament: PropTypes.object.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    createResource: (resource, successCallback, failureCallback) =>
      dispatch(
        documentsActions.createResource(resource, {
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

export default compose(withConnect)(TournamentDocumentNew);
