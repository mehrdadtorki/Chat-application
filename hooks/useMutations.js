import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useMutate(url, method = "POST", options = {}) {
  const mutation = useMutation({
    mutationFn: async (body) => {
      const { data } = await axios({
        url,
        method,
        data: body,
        headers: { "Content-Type": "application/json" },
      });
      return data;
    },
    ...options,
  });

  return mutation;
}
