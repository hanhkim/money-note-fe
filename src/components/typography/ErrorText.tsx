import React from "react";

const ErrorText = ({ message }: { message: string | undefined }) => {
  if (!message) return null;
  return <p className="text-xs text-red-500">{message || "Error msg"} </p>;
};

export default ErrorText;
