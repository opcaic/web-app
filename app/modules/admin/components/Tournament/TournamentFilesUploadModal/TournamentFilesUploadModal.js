import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Button, Modal, Upload, Icon, Progress } from 'antd';
import FormErrors from '@/modules/shared/components/FormErrors';

class TournamentFilesUploadModal extends Component {
  initialState = {
    fileList: [],
    uploading: false,
    errors: [],
    percentCompleted: 0,
  };

  state = this.initialState;

  handleUpload = () => {
    const { fileList } = this.state;
    this.setState({ errors: [], uploading: true, percentCompleted: 0 });
    this.props.onUpload(
      fileList,
      this.props.tournament.id,
      this.props.maxFilesSize,
      this.successCallback,
      this.failureCallback,
      this.handleProgress,
    );
  };

  handleProgress = percentCompleted => {
    this.setState({ percentCompleted });
  };

  successCallback = () => {
    this.props.additionalSuccessCallback();
    this.setState({ errors: [], uploading: false, fileList: [] });
  };

  failureCallback = errors => {
    this.setState({ errors: errors.withoutField, uploading: false });
  };

  hideModal = () => {
    this.setState(this.initialState);
    this.props.hideModal();
  };

  render() {
    const { uploading, fileList } = this.state;
    const uploadProps = {
      multiple: true,
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <Modal
        visible={this.props.visible}
        title={<FormattedMessage id="app.admin.tournamentFilesUpload.title" />}
        onCancel={this.hideModal}
        footer={[
          <Button key="close" onClick={this.hideModal}>
            <FormattedMessage id="app.admin.tournamentFilesUpload.close" />
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={uploading}
            onClick={this.handleUpload}
            disabled={this.state.fileList.length === 0}
          >
            <FormattedMessage id="app.admin.tournamentFilesUpload.submit" />
          </Button>,
        ]}
      >
        {
          <div>
            {this.state.uploading && (
              <Progress percent={this.state.percentCompleted} status="normal" />
            )}
            <FormErrors errors={this.state.errors} />
            <Upload.Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">
                <FormattedMessage id="app.admin.tournamentFilesUpload.uploadTitle" />
              </p>
              <p className="ant-upload-hint">
                <FormattedMessage id="app.admin.tournamentFilesUpload.uploadHint" />
              </p>
            </Upload.Dragger>
          </div>
        }
      </Modal>
    );
  }
}

TournamentFilesUploadModal.propTypes = {
  tournament: PropTypes.object,
  onUpload: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default TournamentFilesUploadModal;
