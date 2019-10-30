import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import PageLayout from '@/modules/admin/components/layout/PageLayout';
import EmailTemplateList from '@/modules/admin/components/EmailTemplate/EmailTemplateList';
import {
  selectors as emailTemplateSelectors,
  actions as emailTemplateActions,
} from '@/modules/admin/ducks/emailTemplates';
import { prepareFilterParams } from '@/modules/shared/helpers/table';

const EmailTemplateListPage = props => (
  <PageLayout>
    <EmailTemplateList
      dataSource={props.items}
      loading={props.isFetching}
      fetch={props.fetchItems}
      totalItems={props.totalItems}
    />
  </PageLayout>
);

EmailTemplateListPage.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool.isRequired,
  fetchItems: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: params =>
      dispatch(emailTemplateActions.fetchMany(prepareFilterParams(params))),
  };
}

const mapStateToProps = createStructuredSelector({
  items: emailTemplateSelectors.getItems,
  isFetching: emailTemplateSelectors.isFetching,
  totalItems: emailTemplateSelectors.getTotalItems,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EmailTemplateListPage);
