import React from 'react';
import Spin from '@/modules/shared/components/Spin';
import { Row, Col, Button, Typography } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { actions as gameActions } from '@/modules/admin/ducks/games';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import DynamicForm from '@/modules/shared/components/DynamicForm/DynamicForm';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

const defaultSchema = {
  title: 'Form title',
  type: 'object',
  required: ['textField'],
  properties: {
    textField: { type: 'string', title: 'Some text', default: 'Parameter' },
    boolField: { type: 'boolean', title: 'Some bool?', default: false },
  },
};

const style = {
  body: { fontSize: '16pt' },
};

const Title = styled(Typography.Title)`
  font-size: 24px !important;
  display: inline-block;
`;

class GameConfiguration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formSchema: this.getInitialSchema(props),
    };
  }

  getInitialSchema = props =>
    props.resource.configurationSchema
      ? props.resource.configurationSchema
      : defaultSchema;

  updateSchema = e => {
    if (!e.error) {
      this.setState({ formSchema: e.jsObject });
    } else {
      this.setState({ formSchema: {} });
    }
  };

  submit = () => {
    const values = Object.assign({}, this.props.resource, {
      configurationSchema: this.state.formSchema,
    });

    this.props.updateResource(values);
  };

  render() {
    return (
      <Spin spinning={this.props.isFetching || this.props.resource === null}>
        <Row>
          <Col span={15}>
            <Title>
              <FormattedMessage id="app.admin.gameConfiguration.editor" />
            </Title>
            <JSONInput
              locale={locale}
              style={style}
              width="100%"
              placeholder={this.getInitialSchema(this.props)}
              onChange={this.updateSchema}
            />
          </Col>
          <Col offset={1} span={8}>
            <Title>
              <FormattedMessage id="app.admin.gameConfiguration.form" />
            </Title>
            <DynamicForm
              formSchema={this.state.formSchema}
              // just preview, we do not want to do anything on change
              onConfigurationChanged={() => {}}
            />
          </Col>
        </Row>
        <Button onClick={this.submit} type="primary">
          <FormattedMessage id="app.generic.save" />
        </Button>
      </Spin>
    );
  }
}

GameConfiguration.propTypes = {
  updateResource: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  resource: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    updateResource: (resource, successCallback, failureCallback) =>
      dispatch(
        gameActions.updateResource(resource.id, resource, {
          meta: {
            successCallback,
            failureCallback,
          },
        }),
      ),
  };
}

const withConnect = connect(
  undefined,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(GameConfiguration);
