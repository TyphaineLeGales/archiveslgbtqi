import * as React from "react";

interface CustomEmailProps {
  firstName: string;
}

export default function CustomEmail(props: CustomEmailProps) {
  return (
    <div>
      <h1>Welcome, {props.firstName}!</h1>
    </div>
  );
}
