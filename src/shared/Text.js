import styled from 'styled-components';

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ size }) => size || 24}px;
  font-family: 'Roboto', sans-serif;
  color: ${({ color }) => color || 'black'};
`;

export default Text;
