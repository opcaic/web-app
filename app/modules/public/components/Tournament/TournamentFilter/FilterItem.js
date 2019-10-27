import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Select } from 'antd';

const StyledFilterItem = styled.div`
  display: inline-block;
  margin-right: 15px;
`;

const Label = styled.div`
  height: 20px;
  display: block;
  font-weight: 500;
  margin-bottom: 3px;
  font-size: 12px;
`;

const FilterItem = props => (
  <StyledFilterItem style={props.style}>
    <Label>{props.label}</Label>
    <div>
      <Select
        style={{ width: props.width || 160, fontSize: 13 }}
        onChange={props.handleChange(props.field)}
        value={props.selectedValues[props.field]}
        placeholder={props.placeholder}
        dropdownMatchSelectWidth={false}
        allowClear
        {...props.selectProps || {}}
      >
        {props.options.map(x => (
          <Select.Option key={x.value} value={x.value}>
            {x.text}
          </Select.Option>
        ))}
      </Select>
    </div>
  </StyledFilterItem>
);

FilterItem.propTypes = {
  label: PropTypes.node.isRequired,
  placeholder: PropTypes.node,
  options: PropTypes.array,
  field: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  selectedValues: PropTypes.object,
  selectProps: PropTypes.object,
  style: PropTypes.object,
  width: PropTypes.number,
};

export default FilterItem;
