import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ onClick, children, shouldShow }) => (
  shouldShow && (
    <button className={styles.Button} type="button" onClick={onClick}>
      {children}
    </button>
  )
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  shouldShow: PropTypes.bool.isRequired,
};

export default Button;
