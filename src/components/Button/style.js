import styled from 'styled-components';

export default styled.div`
  cursor: pointer;
  padding: 6px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  --bg-color: rgba(240, 240, 240);

  @keyframes bgcchange {
    from {background-color: white;}
    to {background-color: var(--bg-color);}
  }
  :hover {
    animation-name: bgcchange;
    animation-duration: 0.3s;
    background-color: var(--bg-color);
  }
`;
