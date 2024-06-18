import React from "react";

type Event = {
  params: {
    event: string;
  };
};

export default function Page({ params }: Event) {
  return (
    <div className="min-h-screen">
      <h1>Event: {params.event}</h1>
    </div>
  );
}
