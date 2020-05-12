import styled from 'styled-components';

export const BarControl = styled.div`
  width: 100%;
  height: 10px;
`;

export const BarActive = styled.div`
  height: 10px;
  background-color: red;
  width: ${({ value }) => (value ? `${(value * 100).toFixed(0)}%` : 0)};
`;

export const BarFull = styled.div`
  cursor: pointer;
  height: 10px;
  width: 100%;
  background-color: lightgrey;
  opacity: 0.5;
  position: relative;
  top: -10px;
`;
