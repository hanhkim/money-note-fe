import React from 'react';
import Title from '../typography/Title';

export interface IFieldSection {
  title: string;
  component: React.ReactNode;
}

const FieldSection: React.FC<IFieldSection> = ({ title, component }) => {
  return (
    <div>
      <Title>{title}</Title>
      {component}
    </div>
  );
};

FieldSection.propTypes = {};

export default FieldSection;
