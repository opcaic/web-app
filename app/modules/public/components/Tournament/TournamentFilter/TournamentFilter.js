import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import {
  tournamentFormatEnum,
  tournamentScopeEnum,
  tournamentSimplifiedStateEnum,
  tournamentRunningSortEnum,
  tournamentFinishedSortEnum,
} from '@/modules/shared/helpers/enumHelpers';
import FilterItem from '@/modules/public/components/Tournament/TournamentFilter/FilterItem';

const StyledFilter = styled.div`
  margin-bottom: 20px;
  margin-top: -10px;
  background-color: white;
  padding: 15px;
  border: 1px solid #e8e8e8;
`;

class TournamentFilter extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedValues: props.initialValues || {} };
  }

  handleChange = filterName => value => {
    this.setState(
      state => {
        const newState = Object.assign({}, state);
        newState.selectedValues[filterName] = value;

        return newState;
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(Object.assign({}, this.state.selectedValues));
        }
      },
    );
  };

  render() {
    return (
      <StyledFilter>
        <FilterItem
          field="state"
          label={<FormattedMessage id="app.public.tournamentFilter.state" />}
          placeholder={
            <FormattedMessage id="app.public.tournamentFilter.statePlaceholder" />
          }
          handleChange={this.handleChange}
          selectedValues={this.state.selectedValues}
          options={tournamentSimplifiedStateEnum.helpers.getFilterOptions()}
          selectProps={{ allowClear: false }}
        />

        <FilterItem
          field="gameId"
          label={<FormattedMessage id="app.public.tournamentFilter.game" />}
          placeholder={
            <FormattedMessage id="app.public.tournamentFilter.gamePlaceholder" />
          }
          handleChange={this.handleChange}
          selectedValues={this.state.selectedValues}
          options={this.props.games.map(x => ({ value: x.id, text: x.name }))}
          selectProps={{
            optionFilterProp: 'children',
            filterOption: (input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0,
            showSearch: true,
            loading: this.props.isFetchingGames,
          }}
        />

        <FilterItem
          field="format"
          label={<FormattedMessage id="app.public.tournamentFilter.format" />}
          placeholder={
            <FormattedMessage id="app.public.tournamentFilter.formatPlaceholder" />
          }
          handleChange={this.handleChange}
          selectedValues={this.state.selectedValues}
          options={tournamentFormatEnum.helpers.getFilterOptions()}
        />

        <FilterItem
          field="scope"
          label={<FormattedMessage id="app.public.tournamentFilter.scope" />}
          placeholder={
            <FormattedMessage id="app.public.tournamentFilter.scopePlaceholder" />
          }
          handleChange={this.handleChange}
          selectedValues={this.state.selectedValues}
          options={tournamentScopeEnum.helpers.getFilterOptions()}
        />

        <FilterItem
          field="sortByRunning"
          label={<FormattedMessage id="app.public.tournamentFilter.sort" />}
          placeholder={
            <FormattedMessage id="app.public.tournamentFilter.sortPlaceholder" />
          }
          handleChange={this.handleChange}
          selectedValues={this.state.selectedValues}
          options={tournamentRunningSortEnum.helpers.getFilterOptions()}
          style={{
            float: 'right',
            marginRight: 0,
            display:
              this.state.selectedValues.state ===
              tournamentSimplifiedStateEnum.RUNNING
                ? 'block'
                : 'none',
          }}
          width={200}
        />

        <FilterItem
          field="sortByFinished"
          label={<FormattedMessage id="app.public.tournamentFilter.sort" />}
          placeholder={
            <FormattedMessage id="app.public.tournamentFilter.sortPlaceholder" />
          }
          handleChange={this.handleChange}
          selectedValues={this.state.selectedValues}
          options={tournamentFinishedSortEnum.helpers.getFilterOptions()}
          style={{
            float: 'right',
            marginRight: 0,
            display:
              this.state.selectedValues.state ===
              tournamentSimplifiedStateEnum.FINISHED
                ? 'block'
                : 'none',
          }}
          width={200}
        />
      </StyledFilter>
    );
  }
}

TournamentFilter.propTypes = {
  initialValues: PropTypes.object,
  onChange: PropTypes.func,
  games: PropTypes.array,
  isFetchingGames: PropTypes.bool.isRequired,
};

export default TournamentFilter;