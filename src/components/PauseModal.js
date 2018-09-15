import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../shared/Modal';
import Button, { ButtonGroup } from '../shared/Button';

export default class extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
    onContinue: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
  }

  static defaultProps = {
    active: false,
  }

  render() {
    const {
      active,
      onContinue,
      onReset,
    } = this.props;

    return (
      <Modal active={active}>
        <ButtonGroup direction="column">
          <Button onClick={onContinue}>Continue</Button>
          <Button onClick={onReset}>Reset</Button>
        </ButtonGroup>
      </Modal>
    );
  }
}
