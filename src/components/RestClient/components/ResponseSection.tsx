import React from "react";

interface ResponseSectionProps {
  statusCode: number;
  responseBody: string;
}

const ResponseSection: React.FC<ResponseSectionProps> = ({
  statusCode,
  responseBody,
}) => (
  <div>
    <div>Status: {statusCode}</div>
    <pre>{responseBody}</pre>
  </div>
);

export default ResponseSection;
