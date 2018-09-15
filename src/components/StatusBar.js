import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import Button, { ButtonGroup } from '../shared/Button';
import Text from '../shared/Text';

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 0;
  left: 0;
  background-image: linear-gradient(#f2d5df, #ce0a4d);
  width: 160px;
  height: 100%;
  z-index: 1;
`;

const Time = styled(Text).attrs({
  size: 20,
})`
  margin: 50px auto;
`;

const ScoreSection = styled.div`
  width: 90%;
  background: #fffbe8;
  border: 2px solid grey;
  border-radius: 5px;
  margin: 50px auto;
`;

const ScoreContainer = styled.div`
  margin: 20px;
`;

const StyledButtonGroup = styled(ButtonGroup)`
  margin-bottom: 100px;
`;

const getTimeDisplay = secs => moment.utc(secs * 1000).format('mm:ss');

export default class extends React.Component {
  static propTypes = {
    scores: PropTypes.array.isRequired,
    currentPlayer: PropTypes.number.isRequired,
    onPause: PropTypes.func.isRequired,
    gameTime: PropTypes.number.isRequired,
  }

  renderScores = () => {
    const {
      scores,
      currentPlayer,
    } = this.props;

    return scores.map((score, index) => {
      const key = `${score}_${index}`;
      return (
        <ScoreContainer key={key}>
          <Text color={currentPlayer === index ? '#f22929' : '#474747'}>
            {`Player ${index + 1}`}
          </Text>
          <Text
            color={currentPlayer === index ? '#f22929' : '#474747'}
            size={18}
          >
            {`Score: ${score}`}
          </Text>
        </ScoreContainer>
      );
    });
  }

  render() {
    const {
      onPause,
      gameTime,
    } = this.props;
    return (
      <Container>
        <ScoreSection>
          <Time>
            {`Time: ${getTimeDisplay(gameTime)}`}
          </Time>
          {this.renderScores()}
        </ScoreSection>
        <StyledButtonGroup>
          <Button onClick={onPause}>Pause</Button>
        </StyledButtonGroup>
      </Container>
    );
  }
}
