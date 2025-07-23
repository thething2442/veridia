import { useState, useCallback } from 'react';
interface UseFetchPostResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  postData: (body: any) => Promise<void>; 
  reset: () => void; 
}

export function useFetchPost<T>(url: string): UseFetchPostResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to reset the state back to its initial values.
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  // The function that performs the POST request.
  const postData = useCallback(async (body: any) => {
    setLoading(true);
    setError(null);
    setData(null); // Clear previous data before a new request.

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  }, [url]); // The hook re-creates `postData` if the URL changes.

  return { error,data,loading,postData, reset };
}