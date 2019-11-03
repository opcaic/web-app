import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import ItemList from '@/modules/admin/components/System/ItemList';
import {
  actions as gameActions,
  selectors as gameSelectors,
} from '@/modules/admin/ducks/games';
import {
  actions as itemsActions,
  selectors as itemsSelectors,
  prioritizeSystemItem,
  cancelSystemItem,
} from '@/modules/admin/ducks/systemItems';
import { prepareFilterParams } from '@/modules/shared/helpers/table';
import { FormattedMessage, defineMessages } from 'react-intl';
import { DatePicker, Typography } from 'antd';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';

const intlMessages = defineMessages({
  sinceTime: { id: 'app.admin.systemItems.since' },
  untilTime: { id: 'app.admin.systemItems.until' },
});

/* eslint-disable react/prefer-stateless-function */
class SystemItems extends React.PureComponent {
  state = {
    params: {},
    startValue: undefined,
    endValue: undefined,
  };

  componentDidMount() {
    this.props.fetchGames();
  }

  onStartChange = value => {
    this.setState({ startValue: value });
  };

  onEndChange = value => {
    this.setState({ endValue: value });
  };

  handleFetch = params => {
    const fullParams = Object.assign(
      {
        since: this.state.startValue && this.state.startValue.toISOString(),
        until: this.state.endValue && this.state.endValue.toISOString(),
      },
      params || this.state.params,
    );
    this.props.fetchItems(fullParams);
  };

  fetchItems = params => {
    this.setState({ params });
    this.handleFetch(params);
  };

  render() {
    return (
      <div>
        <Typography.Title level={2}>
          <FormattedMessage id="app.admin.systemItems.title" />
        </Typography.Title>

        <div style={{ marginBottom: 15 }}>
          <DatePicker
            disabledDate={this.disabledStartDate}
            showTime
            value={this.state.startValue}
            placeholder={intlGlobal.formatMessage(intlMessages.sinceTime)}
            onChange={this.onStartChange}
            onOpenChange={opened => opened || this.handleFetch()}
          />
          <DatePicker
            disabledDate={this.disabledEndDate}
            showTime
            value={this.state.endValue}
            placeholder={intlGlobal.formatMessage(intlMessages.untilTime)}
            onChange={this.onEndChange}
            onOpenChange={opened => opened || this.handleFetch()}
            style={{ marginLeft: 10 }}
          />
        </div>

        <ItemList
          dataSource={this.props.items}
          loading={this.props.isFetching}
          fetch={this.fetchItems}
          totalItems={this.props.totalItems}
          prioritizeItem={this.props.prioritizeItem}
          cancelItem={this.props.cancelItem}
          games={this.props.games}
        />
      </div>
    );
  }
}

SystemItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool.isRequired,
  fetchItems: PropTypes.func.isRequired,
  prioritizeItem: PropTypes.func.isRequired,
  cancelItem: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
  fetchGames: PropTypes.func.isRequired,
  games: PropTypes.array,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: params =>
      dispatch(itemsActions.fetchMany(prepareFilterParams(params))),
    prioritizeItem: (id, successCallback, failureCallback) =>
      dispatch(prioritizeSystemItem(id, successCallback, failureCallback)),
    cancelItem: (id, successCallback, failureCallback) =>
      dispatch(cancelSystemItem(id, successCallback, failureCallback)),
    fetchGames: () =>
      dispatch(
        gameActions.fetchMany({
          count: 100,
          sortBy: 'name',
          asc: true,
        }),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  items: itemsSelectors.getItems,
  isFetching: itemsSelectors.isFetching,
  totalItems: itemsSelectors.getTotalItems,
  games: gameSelectors.getItems,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SystemItems);
