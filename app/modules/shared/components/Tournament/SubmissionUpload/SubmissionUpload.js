import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Button, Modal, Upload, Icon, Progress } from 'antd';
import FormErrors from '@/modules/shared/components/FormErrors';
import { Link } from 'react-router-dom';

class SubmissionUpload extends Component {
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
      this.props.tournament.maxSubmissionSize,
      this.successCallback,
      this.failureCallback,
      this.handleProgress,
    );
  };

  handleProgress = percentCompleted => {
    this.setState({ percentCompleted });
  };

  successCallback = () => {
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
        title={<FormattedMessage id="app.shared.submissionUpload.title" />}
        onCancel={this.hideModal}
        footer={[
          <Button key="close" onClick={this.hideModal}>
            <FormattedMessage id="app.shared.submissionUpload.close" />
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={uploading}
            onClick={this.handleUpload}
            disabled={
              !this.props.isLoggedIn || this.state.fileList.length === 0
            }
          >
            <FormattedMessage id="app.shared.submissionUpload.submit" />
          </Button>,
        ]}
      >
        {this.props.isLoggedIn ? (
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
                <FormattedMessage id="app.shared.submissionUpload.uploadTitle" />
              </p>
              <p className="ant-upload-hint">
                <FormattedMessage id="app.shared.submissionUpload.uploadHint" />
              </p>
            </Upload.Dragger>
          </div>
        ) : (
          <div style={{ textAlign: 'center', fontSize: '16px' }}>
            <FormattedMessage
              id="app.shared.submissionUpload.notLoggedIn"
              values={{
                logIn: (
                  <Link
                    to={{
                      pathname: '/login',
                      state: {
                        from: Object.assign({}, this.props.location, {
                          state: {
                            showSubmissionModal: true,
                          },
                        }),
                      },
                    }}
                    onClick={this.props.hideModal}
                  >
                    <FormattedMessage id="app.shared.submissionUpload.logIn" />
                  </Link>
                ),
              }}
            />
          </div>
        )}
      </Modal>
    );
  }
}

SubmissionUpload.propTypes = {
  tournament: PropTypes.object,
  onUpload: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  location: PropTypes.object,
};

export default SubmissionUpload;
