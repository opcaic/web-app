import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import OverviewContainer from '@/modules/public/containers/Competition/OverviewContainer';
import PageContent from '../../components/Competition/PageContent';
import Menu from '../../containers/Competition/Menu';
import PageLayout from '../../components/layout/PageLayout';
import HowToPlayContainer from '../../containers/Competition/HowToPlayContainer';
import MatchLogContainer from '../../containers/Competition/MatchLogContainer';

export default function Competition(props) {
  return (
    <PageLayout>
      <Menu name={props.match.params.slug} />
      <PageContent>
        <Switch>
          <Route exact path={props.match.path} component={OverviewContainer} />
          <Route
            path={`${props.match.path}/how-to-play`}
            component={HowToPlayContainer}
          />
          <Route
            path={`${props.match.path}/match-log`}
            component={MatchLogContainer}
          />
        </Switch>
      </PageContent>
    </PageLayout>
  );
}

Competition.propTypes = {
  match: PropTypes.object.isRequired,
};
