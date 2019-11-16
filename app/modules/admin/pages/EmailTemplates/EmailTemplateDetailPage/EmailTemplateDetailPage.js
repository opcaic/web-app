import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import {
  actions as emailTemplatesActions,
  selectors as emailTemplatesSelectors,
} from '@/modules/admin/ducks/emailTemplates';
import PageLayout from '@/modules/admin/components/layout/PageLayout';
import Spin from '@/modules/shared/components/Spin';
import EmailTemplateForm from '@/modules/admin/components/EmailTemplate/EmailTemplateForm/EmailTemplateForm';
import { emailTemplatePropType } from '@/modules/admin/utils/propTypes';
import { pageTitles } from '@/modules/shared/utils/pageTitles';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import PageTitle from '@/modules/shared/components/PageTitle/PageTitle';

class EmailTemplateDetailPage extends React.Component {
  componentDidMount() {
    this.props.fetchResource(
      this.props.match.params.name,
      this.props.match.params.languageCode,
    );
  }

  handleSubmit = (resource, successCallback, failureCallback) => {
    this.props.updateResource(resource, successCallback, failureCallback);
  };

  render() {
    return (
      <PageLayout>
        <PageTitle
          title={intlGlobal.formatMessage(pageTitles.emailTemplateDetailPage)}
        />

        <Spin spinning={this.props.resource === null || this.props.isFetching}>
          <EmailTemplateForm
            resource={this.props.resource}
            onSubmit={this.handleSubmit}
          />
        </Spin>
      </PageLayout>
    );
  }
}

EmailTemplateDetailPage.propTypes = {
  fetchResource: PropTypes.func.isRequired,
  updateResource: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  resource: PropTypes.shape(emailTemplatePropType),
  match: PropTypes.object.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchResource: (name, languageCode) =>
      dispatch(
        emailTemplatesActions.fetchResource(undefined, {
          endpointParams: { name, languageCode },
        }),
      ),
    updateResource: (resource, successCallback, failureCallback) =>
      dispatch(
        emailTemplatesActions.updateResource(undefined, resource, {
          endpointParams: {
            name: resource.name,
            languageCode: resource.languageCode,
          },
          meta: {
            successCallback,
            failureCallback,
          },
        }),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  isFetching: emailTemplatesSelectors.isFetchingItem,
  resource: emailTemplatesSelectors.getItem,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EmailTemplateDetailPage);
