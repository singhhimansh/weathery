import backendInstance from "@/utils/axios";
import { useState, useEffect, useCallback } from "react";

type TQueryParams = { [key: string]: string };

interface TuseFetch {
  url: string;
  enabled?: boolean;
}

// custom hook to make fetch call
const useFetch = <P, T, E>({
  url,
  enabled = true,
}: TuseFetch): {
  data: T | null;
  loading: boolean;
  error: E | null;
  refetch: (value: P) => void;
} => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<E | null>(null);

  const fetchData = useCallback(
    async (value: P) => {
      let params = value;
      if (!url) return;
      setLoading(true);
      setError(null);
      try {
        const response = await backendInstance.get(url, {
          params,
        });
        const result = response.data;
        setData(result);
      } catch (error: any) {
        if (error?.response) {
          setError(error.response?.data);
        } else {
          setError({
            message: error?.message,
            status: "Service Unavailable",
          } as E);
        }
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
