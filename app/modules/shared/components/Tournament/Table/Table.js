import React from 'react';
import * as PropTypes from 'prop-types';
import { getTableData } from '@/modules/shared/components/Tournament/Table/logic';
import { Table as AntTable } from 'antd';
import styled from 'styled-components';
import { tournamentPropType } from '@/modules/public/utils/propTypes';

const StyledTable = styled(AntTable)`
  & .ant-table {
    border: 0px !important;
  }

  & .ant-table-small.ant-table-bordered .ant-table-tbody > tr > td:last-child {
    border-right: 1px solid #e8e8e8;
  }

  & .ant-table-small.ant-table-bordered .ant-table-content {
    border-right: 0px !important;
  }

  & tr > th {
    height: 140px;
    white-space: nowrap;
    border-right-color: transparent !important;
    text-align: left !important;
  }

  & tr > th > span {
    transform: translate(25px, 48px) rotate(315deg);
    width: 30px;
  }

  & tr > th > span .ant-table-column-title {
    border-bottom: 1px solid #e8e8e8;
    padding: 5px 10px;
    display: inline-block;
    width: 198px;
    font-weight: bold;
  }

  & tr > th:first-child > span .ant-table-column-title {
    border-bottom: 0px !important;
  }
`;

function Table(props) {
  const data = getTableData(props.leaderboard, props.tournament);
  return (
    <StyledTable
      dataSource={data.rows}
      columns={data.columns}
      rowKey={row => row.participation.author.id}
      pagination={false}
      size="small"
      bordered
    />
  );
}

Table.propTypes = {
  leaderboard: PropTypes.object.isRequired,
  tournament: PropTypes.shape(tournamentPropType).isRequired,
};

export default Table;
