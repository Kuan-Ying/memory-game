import styled from 'styled-components';

const Button = styled.button`
  background-image: linear-gradient(#ffef96, #e8d04c, #dbbc13);
  font-family: 'Roboto', sans-serif;
  font-size: ${size => (size === 'big' ? 30 : 24)}px;
  color: #f7f7f7;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  justify-content: center;
  align-items: center;
`;

export default Button;
