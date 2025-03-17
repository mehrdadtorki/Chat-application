import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useFetch(key, url, options = {}) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const { data } = await axios.get(url);
      return data;
    },
    ...options,
  });
}
