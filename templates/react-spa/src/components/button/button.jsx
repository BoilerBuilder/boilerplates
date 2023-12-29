import React from 'react';
import PropTypes from 'prop-types';

function ButtonComponent({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}

ButtonComponent.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ButtonComponent;
