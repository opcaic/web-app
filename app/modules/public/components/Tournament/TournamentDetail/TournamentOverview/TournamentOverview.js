import React, { Component } from 'react';
import { Icon, Tabs, Typography } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ReactMarkdown from 'react-markdown';
import { tournamentPropType } from '@/modules/public/utils/propTypes';
import PageContent from '@/modules/public/components/layout/PageContent';
import BasicInformation from '@/modules/public/components/Tournament/TournamentDetail/TournamentOverview/BasicInformation';
import { menuItemTypeEnum } from '@/modules/shared/helpers/enumHelpers';
import CodeBlock from '@/modules/shared/components/CodeBlock';
import styled from 'styled-components';
import { lighten } from 'polished';

const StyledTabs = styled(Tabs)`
  & .ant-tabs-left-bar .ant-tabs-tab {
    margin-bottom: 5px !important;
  }

  & .ant-tabs-tab-active {
    color: ${props => props.themeColor} !important;
  }

  & .ant-tabs-ink-bar {
    background-color: ${props => props.themeColor} !important;
  }

  & .ant-tabs-tab:hover:not(.ant-tabs-tab-active) {
    color: ${props => lighten(0.2, props.themeColor)} !important;
  }

  & a {
    color: inherit;
  }
`;

function getTabs(tournament, documents) {
  const tabs = [];

  tabs.push({
    key: 'basic_information',
    title: (
      <FormattedMessage id="app.public.tournamentOverview.basicInformation" />
    ),
    content: <BasicInformation tournament={tournament} />,
  });

  const menuData = tournament.menuItems || [];

  menuData.forEach((x, index) => {
    if (x.type === menuItemTypeEnum.DOCUMENT) {
      const document = documents.find(y => y.id === x.documentId);

      if (document) {
        tabs.push({
          key: `document_${document.id}`,
          title: document.name,
          type: x.type,
          content: (
            <ReactMarkdown
              source={document.content}
              renderers={{
                code: CodeBlock,
              }}
            />
          ),
        });
      }
    } else if (x.text && x.externalLink) {
      tabs.push({
        key: `externalLink_${index}`,
        title: x.text,
        type: x.type,
        link: x.externalLink,
      });
    }
  });

  return tabs;
}

class TournamentOverview extends Component {
  state = {
    activeKey: 'basic_information',
  };

  onTabClick = key => {
    if (!key.startsWith('externalLink_')) {
      this.setState({ activeKey: key });
    }
  };

  render() {
    const tabs = getTabs(this.props.tournament, this.props.documents);

    return (
      <PageContent
        title={<FormattedMessage id="app.public.tournamentOverview.title" />}
      >
        {tabs.length === 1 ? (
          <div>
            <Typography.Title level={3}>{tabs[0].title}</Typography.Title>
            {tabs[0].content}
          </div>
        ) : (
          <StyledTabs
            activeKey={this.state.activeKey}
            tabPosition="left"
            onTabClick={this.onTabClick}
            themeColor={this.props.tournament.themeColor}
          >
            {tabs.map(
              x =>
                x.type === menuItemTypeEnum.EXTERNAL ? (
                  <Tabs.TabPane
                    tab={
                      <a href={x.link} target="_blank">
                        {x.title}{' '}
                        <Icon
                          type="link"
                          style={{
                            marginRight: 0,
                            marginLeft: 5,
                            fontSize: 12,
                          }}
                        />
                      </a>
                    }
                    key={x.key}
                  />
                ) : (
                  <Tabs.TabPane tab={x.title} key={x.key}>
                    <Typography.Title level={3}>{x.title}</Typography.Title>
                    {x.content}
                  </Tabs.TabPane>
                ),
            )}
          </StyledTabs>
        )}
      </PageContent>
    );
  }
}

TournamentOverview.propTypes = {
  tournament: PropTypes.shape(tournamentPropType).isRequired,
  documents: PropTypes.object.isRequired,
};

export default TournamentOverview;
