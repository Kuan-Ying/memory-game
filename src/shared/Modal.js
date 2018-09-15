import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Overlay from './Overlay';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 20px;
  border: 3px solid #d8d8d8;
  padding: 50px;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.5);
`;

export default class extends React.Component {
  static propTypes = {
    active: PropTypes.any.isRequired,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  };

  render() {
    const {
      active,
      children,
    } = this.props;

    return (
      <Overlay active={active}>
        <Container>
          {children}
        </Container>
      </Overlay>
    );
  }
}
