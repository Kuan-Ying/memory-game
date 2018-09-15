import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const cardStatus = {
  HIDDEN: 'HIDDEN',
  ACTIVE: 'ACTIVE',
  MATCHED: 'MATCHED',
};

const Container = styled.div`
  display: flex;
  margin: 20px;
  border-radius: 5px;
  box-shadow: 2px 4px rgba(0, 0, 0, 0.5);
  width: 50px;
  height: 70px;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background-image: linear-gradient(#2e5877, #1d2d4f, #091a3d);

  &:hover {
    border: ${({ type }) => (type === cardStatus.HIDDEN ? '3px solid rgb(255, 79, 79)' : '')};
  }
`;

const Content = styled.div`
  color: #5757AC;
  font-family: 'Roboto', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-image: linear-gradient(#fff4af, white, #F7ECA5);
  border-radius: 5px;
`;

export default class Card extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    content: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    content: '',
    type: cardStatus.HIDDEN,
  }

  render() {
    const {
      id,
      content,
      type,
      onClick,
    } = this.props;
    return (
      <Container type={type} onClick={() => onClick(id)}>
        {
          type === cardStatus.HIDDEN || <Content>{content}</Content>
        }
      </Container>
    );
  }
}
