// app/error.tsx
'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Error caught in error.tsx:', error);
  }, [error]);

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-4">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="mb-4">{error.message}</p>
      <button
        onClick={reset}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Try again
      </button>
    </div>
  );
}
