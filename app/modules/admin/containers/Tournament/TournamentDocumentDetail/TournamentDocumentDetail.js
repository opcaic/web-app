import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Col, Row } from 'antd';
import PropTypes from 'prop-types';
import {
  actions as documentsActions,
  selectors as documentsSelectors,
} from '@/modules/admin/ducks/documents';
import DocumentForm from '@/modules/admin/components/Document/DocumentForm';
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Spin from '@/modules/shared/components/Spin';

/* eslint-disable react/prefer-stateless-function */
class TournamentDocumentDetail extends React.PureComponent {
  componentDidMount() {
    this.props.fetchResource(this.props.match.params.documentId);
  }

  render() {
    return (
      <Spin spinning={this.props.isFetching}>
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
              resource={this.props.resource || {}}
              onSubmit={(values, successCallback, failureCallback) =>
                this.props.updateResource(
                  Object.assign(
                    { tournamentId: this.props.tournament.id },
                    this.props.resource,
                    values,
                  ),
                  successCallback,
                  failureCallback,
                )
              }
            />
          </Col>
        </Row>
      </Spin>
    );
  }
}

TournamentDocumentDetail.propTypes = {
  fetchResource: PropTypes.func.isRequired,
  updateResource: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  resource: PropTypes.object,
  match: PropTypes.object.isRequired,
  tournament: PropTypes.object.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchResource: id => dispatch(documentsActions.fetchResource(id)),
    updateResource: (resource, successCallback, failureCallback) =>
      dispatch(
        documentsActions.updateResource(resource.id, resource, null, {
          successCallback,
          failureCallback,
        }),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  isFetching: documentsSelectors.isFetchingItem,
  resource: documentsSelectors.getItem,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(TournamentDocumentDetail);
