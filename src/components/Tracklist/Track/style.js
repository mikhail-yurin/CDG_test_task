import styled from 'styled-components';

export default styled.div`
  cursor: pointer;
  width: 100%;
  padding-top: 4px;
  padding-bottom: 4px;

  --bg-color: rgb(240, 240, 240);

  @keyframes bgchange {
    from {background-color: white;}
    to {background-color: var(--bg-color);}
  }
  :hover {
    animation-name: bgchange;
    animation-duration: 0.3s;
    background-color: var(--bg-color);
  }
`;
