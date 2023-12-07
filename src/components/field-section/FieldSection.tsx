import React from "react";

export interface IFieldSection {
  title: string;
  component: React.ReactNode;
}

const FieldSection: React.FC<IFieldSection> = ({ title, component }) => {
  return (
    <div>
      <p>{title}</p>
      {component}
    </div>
  );
};

FieldSection.propTypes = {};

export default FieldSection;
