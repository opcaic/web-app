import React from 'react';
import LocalizedContent from '@/modules/shared/components/LocalizedContent';
import StaticPage from '@/modules/public/components/layout/StaticPage';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { pageTitles } from '@/modules/shared/utils/pageTitles';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '@/modules/shared/components/CodeBlock';
import { en } from '@/modules/public/pages/AboutPage/localizations/en';
import { cs } from '@/modules/public/pages/AboutPage/localizations/cs';

/* eslint-disable react/prefer-stateless-function */
export class AboutPage extends React.PureComponent {
  render() {
    return (
      <StaticPage title={intlGlobal.formatMessage(pageTitles.aboutPage)}>
        <LocalizedContent
          localizedContent={{
            en,
            cs,
          }}
          render={({ content }) => (
            <ReactMarkdown
              source={content}
              renderers={{
                code: CodeBlock,
              }}
            />
          )}
        />
      </StaticPage>
    );
  }
}

AboutPage.propTypes = {};

export default AboutPage;
