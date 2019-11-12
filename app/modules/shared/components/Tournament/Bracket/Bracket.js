import React, { Component } from 'react';
import jQuery from 'jquery';
import * as PropTypes from 'prop-types';
import {
  getDoubleEliminationBracket,
  getSingleEliminationBracket,
} from '@/modules/shared/components/Tournament/Bracket/logic';
import { tournamentRankingStrategyEnum } from '@/modules/shared/helpers/enumHelpers';
window.jQuery = jQuery;
require('jquery-bracket/dist/jquery.bracket.min');
require('jquery-bracket/dist/jquery.bracket.min.css');

const bracketType = {
  SINGLE_ELIMINATION: 'single-elimination',
  DOUBLE_ELIMINATION: 'double-elimination',
};

class Bracket extends Component {
  state = {
    loaded: false,
  };

  componentDidMount() {
    if (!this.state.loaded) {
      const { leaderboard, type } = this.props;
      const data =
        type === bracketType.DOUBLE_ELIMINATION
          ? getDoubleEliminationBracket(leaderboard)
          : getSingleEliminationBracket(leaderboard);

      // Delay execution because there were problems with generating the bracket if the container is not yet visible
      setTimeout(() => {
        jQuery('#bracket')
          .empty()
          .bracket({
            teamWidth: 110,
            init: data,
          });

        // Fix scores if they were previously multiplied by -1
        if (
          leaderboard.rankingStrategy === tournamentRankingStrategyEnum.MINIMUM
        ) {
          jQuery('#bracket .match .score').each((index, el) => {
            const element = jQuery(el);
            const score = element.text().replace(',', '.');

            if (score !== '--') {
              element.text(parseFloat(score) * -1);
            }
          });
        }
      }, 100);
    }

    this.setState({
      loaded: true,
    });
  }

  render() {
    return <div id="bracket" />;
  }
}

Bracket.propTypes = {
  leaderboard: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['single-elimination', 'double-elimination'])
    .isRequired,
};

export default Bracket;
