import React, {Component} from 'react';
import PropTypes from 'prop-types';
import s from './Alert.module.css';

const Alert = ({ massage }) => { 
    return (
        <p className={s.Alert}>{massage}</p>
   )
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Alert



