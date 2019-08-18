import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import {
  actions as usersActions,
  selectors as userSelectors,
} from '@/modules/admin/ducks/users';
import UserForm from '@/modules/admin/components/User/UserForm';
import PageLayout from '@/modules/admin/components/layout/PageLayout';
import Spin from '@/modules/shared/components/Spin';

/* eslint-disable react/prefer-stateless-function */
class UserDetailPage extends React.PureComponent {
  componentDidMount() {
    this.props.fetchResource(this.props.match.params.id);
  }

  handleSubmit = values => {
    const resource = Object.assign({}, this.props.resource, values);
    this.props.updateResource(resource);
  };

  render() {
    return (
      <PageLayout>
        <Spin spinning={this.props.isFetching || this.props.resource == null}>
          <Row>
            <Col span={12}>
              <UserForm
                user={this.props.resource}
                onSubmit={values => this.handleSubmit(values)}
              />
            </Col>
          </Row>
        </Spin>
      </PageLayout>
    );
  }
}

UserDetailPage.propTypes = {
  fetchResource: PropTypes.func.isRequired,
  updateResource: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  resource: PropTypes.object,
  match: PropTypes.object.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchResource: id => dispatch(usersActions.fetchResource(id)),
    updateResource: resource =>
      dispatch(usersActions.updateResource(resource.id, resource)),
  };
}

const mapStateToProps = createStructuredSelector({
  isFetching: userSelectors.isFetchingItem,
  resource: userSelectors.getItem,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(UserDetailPage);
