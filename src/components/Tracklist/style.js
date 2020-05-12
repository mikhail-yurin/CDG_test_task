import styled from 'styled-components';

export const List = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: 2fr 3fr 1fr;
  color:  ${({ active }) => (active ? 'rgb(223, 95, 95)' : 'unset')};
`;

export const GridItem = styled.div`
  :last-child {
    text-align: end;
  }
`;

export const Head = styled.div`
  font-weight: bold;
  margin-bottom: 2px;
`;

export const Alert = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 16px;
`;
