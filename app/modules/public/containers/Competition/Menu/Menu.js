import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';

const Submenu = styled.div`
  background-color: white;
  color: white;
  border-bottom: 1px solid #e6e6e6;
  padding: 5px 0px;
`;

const SubmenuMenu = styled.ul`
  margin: 0px;
  padding: 0px;
  list-style-type: none;
  font-family: Arial;
`;

const SubmenuItem = styled.li`
  margin-right: 20px;
  line-height: 40px;
  font-size: 16px;
  display: inline;
  cursor: pointer;
  color: #3949ab;

  a {
    color: #3949ab;
  }
`;

/* eslint-disable react/prefer-stateless-function */
export class Menu extends React.PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
  };

  render() {
    console.log(this.props);

    return (
      <Submenu>
        <div className="container">
          <SubmenuMenu>
            <SubmenuItem style={{ fontSize: '22px' }}>
              <Link to={`${this.props.match.url}`}>{this.props.name}</Link>
            </SubmenuItem>
            <SubmenuItem>
              <Link to={`${this.props.match.url}/how-to-play`}>
                How to play
              </Link>
            </SubmenuItem>
            <SubmenuItem>
              <Link to={`${this.props.match.url}/match-log`}>Match log</Link>
            </SubmenuItem>
          </SubmenuMenu>
        </div>
      </Submenu>
    );
  }
}

export default withRouter(Menu);
