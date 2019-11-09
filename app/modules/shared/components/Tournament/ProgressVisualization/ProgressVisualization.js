import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { tournamentFormatEnum } from '@/modules/shared/helpers/enumHelpers';
import Bracket from '@/modules/shared/components/Tournament/Bracket';
import { Button, Modal } from 'antd';
import { FormattedMessage } from 'react-intl';
import Table from '@/modules/shared/components/Tournament/Table';
import { tournamentPropType } from '@/modules/public/utils/propTypes';

class ProgressVisualization extends Component {
  state = {
    modalVisible: false,
  };

  showModal = () => {
    this.setState({ modalVisible: true });
  };

  hideModal = () => {
    this.setState({ modalVisible: false });
  };

  getModalContent = () => {
    const { leaderboard } = this.props;

    if (leaderboard.format === tournamentFormatEnum.DOUBLE_ELIMINATION) {
      return <Bracket type="double-elimination" leaderboard={leaderboard} />;
    }

    if (leaderboard.format === tournamentFormatEnum.SINGLE_ELIMINATION) {
      return <Bracket type="single-elimination" leaderboard={leaderboard} />;
    }

    if (leaderboard.format === tournamentFormatEnum.TABLE) {
      return (
        <Table leaderboard={leaderboard} tournament={this.props.tournament} />
      );
    }

    return null;
  };

  render() {
    const { leaderboard } = this.props;

    if (leaderboard.finished === false) {
      return null;
    }

    let buttonText = (
      <FormattedMessage id="app.shared.progressVisualization.button" />
    );

    if (leaderboard.format === tournamentFormatEnum.DOUBLE_ELIMINATION) {
      buttonText = (
        <FormattedMessage id="app.shared.progressVisualization.buttonDoubleElimination" />
      );
    } else if (leaderboard.format === tournamentFormatEnum.SINGLE_ELIMINATION) {
      buttonText = (
        <FormattedMessage id="app.shared.progressVisualization.buttonSingleElimination" />
      );
    } else if (leaderboard.format === tournamentFormatEnum.TABLE) {
      buttonText = (
        <FormattedMessage id="app.shared.progressVisualization.buttonTable" />
      );
    } else {
      return null;
    }

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          {buttonText}
        </Button>

        <Modal
          title={
            <FormattedMessage
              id="app.shared.progressVisualization.modalTitle"
              values={{ tournamentName: this.props.tournament.name }}
            />
          }
          visible={this.state.modalVisible}
          footer={null}
          width="calc(100vw - 60px)"
          style={{
            top: '20px',
            paddingBottom: 0,
          }}
          bodyStyle={{
            height: 'calc(100vh - 100px)',
            overflow: 'scroll',
          }}
          onCancel={this.hideModal}
        >
          {this.state.modalVisible && this.getModalContent()}
        </Modal>
      </div>
    );
  }
}

ProgressVisualization.propTypes = {
  tournament: PropTypes.shape(tournamentPropType).isRequired,
  leaderboard: PropTypes.object,
};

export default ProgressVisualization;
