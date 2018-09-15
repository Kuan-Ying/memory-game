import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Modal from '../shared/Modal';
import Button, { ButtonGroup } from '../shared/Button';
import Text from '../shared/Text';

const getTimeDisplay = secs => moment.utc(secs * 1000).format('mm:ss');

export default class extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
    scores: PropTypes.array.isRequired,
    winner: PropTypes.number.isRequired,
    onReset: PropTypes.func.isRequired,
    gameTime: PropTypes.number.isRequired,
  }

  static defaultProps = {
    active: false,
  }

  renderScores = () => {
    const { scores } = this.props;
    return scores.map((score, index) => {
      const key = `${score}_${index}`;
      return (
        <Text key={key}>
          {`Player ${index + 1}: ${score}`}
        </Text>
      );
    });
  }

  render() {
    const {
      active,
      winner,
      onReset,
      gameTime,
    } = this.props;

    return (
      <Modal active={active}>
        <Text>{`Finish Time: ${getTimeDisplay(gameTime)}`}</Text>
        <Text>{`Winner: Player ${winner}`}</Text>
        {this.renderScores()}
        <ButtonGroup direction="column">
          <Button onClick={onReset}>Start A New Game</Button>
        </ButtonGroup>
      </Modal>
    );
  }
}
