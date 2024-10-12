import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

interface ITitleProps {
  className?: string;
  children: React.ReactNode;
}
const Title: React.FC<ITitleProps> = (props) => {
  const { children, className } = props;
  return <p className={classNames({ '': true, className })}>{children}</p>;
};

export default Title;
