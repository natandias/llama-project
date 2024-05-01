"use client"; // Error components must be Client Components

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    if (error?.message?.includes("refresh token")) {
      redirect("/api/auth/logout");
    } else console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col m-auto">
      <h2>Algo deu errado!</h2>
      <button
        className="text-red-500"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Recarregue a página
      </button>
    </div>
  );
}
