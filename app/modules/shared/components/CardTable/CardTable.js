import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTable = styled.div`
  & .ant-table-small {
    border-width: 0px;
    border-bottom: 1px solid #e8e8e8;
    border-radius: 0px;
    font-size: 13px;
  }
`;

const CardTable = ({ children, ...rest }) => (
  <StyledTable {...rest}>{children}</StyledTable>
);

CardTable.propTypes = {
  children: PropTypes.node,
};

export default CardTable;
