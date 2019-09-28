import React from 'react';
import PageLayout from '@/modules/public/components/layout/PageLayout';
import PageTitle from '@/modules/shared/components/PageTitle';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { pageTitles } from '@/modules/public/utils/pageTitles';
import { Button, Result } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <PageLayout>
      <PageTitle title={intlGlobal.formatMessage(pageTitles.notFoundPage)} />

      <Result
        status="404"
        title={<FormattedMessage id="app.public.notFoundPage.title" />}
        subTitle={<FormattedMessage id="app.public.notFoundPage.subtitle" />}
        extra={
          <Button type="primary">
            <Link to="/">
              <FormattedMessage id="app.public.notFoundPage.backToHomepage" />
            </Link>
          </Button>
        }
      />
    </PageLayout>
  );
}

export default NotFoundPage;
