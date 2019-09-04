import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  -webkit-font-feature-settings: 'tnum';
  font-feature-settings: 'tnum';
  position: relative;
  background: #fff;
  border-radius: 2px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
`;

const Header = styled.header`
  height: 200px;
  background-size: cover;
  background-position: center center;
  border-radius: 2px 2px 0 0;
`;

const Content = styled.div`
  padding: 15px;
`;

const Title = styled.div`
  font-size: 18px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 400;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const HeaderTags = styled.div`
  display: inline-block;
  margin: 10px 0 0 10px;
`;

const FooterTags = styled.div`
  margin-top: 10px;
`;

const ListCard = props => (
  <Card style={props.style}>
    <Link to={props.headerUrl}>
      <Header style={{ backgroundImage: `url(${props.imageUrl})` }}>
        {props.headerTags && <HeaderTags>{props.headerTags}</HeaderTags>}
      </Header>
    </Link>
    <Content>
      <Link to={props.titleUrl}>
        <Title title={props.title}>{props.title}</Title>
      </Link>
      <div>{props.children}</div>
      {props.footerTags && <FooterTags>{props.footerTags}</FooterTags>}
    </Content>
  </Card>
);

ListCard.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  style: PropTypes.object,
  headerUrl: PropTypes.string.isRequired,
  headerTags: PropTypes.array,
  titleUrl: PropTypes.string.isRequired,
  children: PropTypes.node,
  footerTags: PropTypes.array,
};

export default ListCard;
