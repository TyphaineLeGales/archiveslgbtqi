import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
}

export default function EmailTemplate(props: EmailTemplateProps) {
  return (
    <div>
      <h1>Welcome, {props.firstName}!</h1>
    </div>
  );
}
