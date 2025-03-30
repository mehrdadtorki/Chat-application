import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useFetch(key, url, options = {}) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const { data } = await axios.get(url, {
        headers: options?.headers,
        params: options?.params,
      });
      return data;
    },
    ...options,
  });
}
