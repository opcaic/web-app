import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Button, Modal, Upload, Icon } from 'antd';
import FormErrors from '@/modules/shared/components/FormErrors';

class SubmissionUpload extends Component {
  state = {
    fileList: [],
    uploading: false,
    errors: [],
  };

  handleUpload = () => {
    const { fileList } = this.state;
    this.setState({ errors: [], uploading: true });
    this.props.onUpload(
      fileList,
      this.props.tournament.id,
      this.successCallback,
      this.failureCallback,
    );
  };

  successCallback = () => {
    this.setState({ errors: [], uploading: false, fileList: [] });
  };

  failureCallback = errors => {
    this.setState({ errors: errors.withoutField, uploading: false });
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
        title={<FormattedMessage id="app.shared.submissionUpload.title" />}
        onCancel={this.props.hideModal}
        footer={[
          <Button key="close" onClick={this.props.hideModal}>
            <FormattedMessage id="app.shared.submissionUpload.close" />
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={uploading}
            onClick={this.handleUpload}
          >
            <FormattedMessage id="app.shared.submissionUpload.submit" />
          </Button>,
        ]}
      >
        <FormErrors errors={this.state.errors} />
        <Upload.Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">
            <FormattedMessage id="app.shared.submissionUpload.uploadTitle" />
          </p>
          <p className="ant-upload-hint">
            <FormattedMessage id="app.shared.submissionUpload.uploadHint" />
          </p>
        </Upload.Dragger>
      </Modal>
    );
  }
}

SubmissionUpload.propTypes = {
  tournament: PropTypes.object,
  onUpload: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
};

export default SubmissionUpload;
