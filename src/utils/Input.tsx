import React from 'react';
import styled from 'styled-components';

const MenuInput = styled.input`
  width: 180px;
  height: 20px;
  padding: 5px;
  margin: 10px;
`;

const Input: React.FC<any> = (props) => {
  return (
    <MenuInput
      onChange={(event) => props.setValue(event.target.value)}
      value={props.value}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
};

export default Input;
