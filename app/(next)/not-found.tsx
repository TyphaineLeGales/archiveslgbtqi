import Link from "next/link";
import React from "react";

export default async function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center bg-white-primary">
      <Link href="/" className="eventParagraph">
        Retourner à la page d&apos;accueil
      </Link>
    </div>
  );
}
