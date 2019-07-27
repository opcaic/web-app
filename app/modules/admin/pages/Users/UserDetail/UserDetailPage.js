import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Col, Row, Spin } from 'antd';
import PropTypes from 'prop-types';
import {
  actions as usersActions,
  selectors as userSelectors,
} from '@/modules/admin/ducks/users';
import UserForm from '@/modules/admin/components/User/UserForm';

/* eslint-disable react/prefer-stateless-function */
class UserDetailPage extends React.PureComponent {
  componentWillMount() {
    this.props.fetchResource(this.props.match.params.id);
  }

  handleSubmit = values => {
    const resource = Object.assign({}, this.props.user, values);
    this.props.updateResource(resource);
  };

  render() {
    return (
      <Spin spinning={this.props.isFetching}>
        <Row>
          <Col span={12}>
            <UserForm
              user={this.props.user || {}}
              onSubmit={values => this.handleSubmit(values)}
              onChange={changedFields => console.log(changedFields)}
            />
          </Col>
        </Row>
      </Spin>
    );
  }
}

UserDetailPage.propTypes = {
  fetchResource: PropTypes.func.isRequired,
  updateResource: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  user: PropTypes.object,
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
  user: userSelectors.getItem,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(UserDetailPage);
