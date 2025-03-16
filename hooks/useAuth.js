import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/auth";
import { useRouter } from "next/router";
import { toast } from "react-toastify"; // Assuming you're using react-toastify

export const useAuth = () => {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      toast.success("Login successful!");
      router.push("/chat");
    },
    onError: (error) => {
      toast.error(error.message || "Login failed");
    },
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isLoading,
    isError: loginMutation.isError,
    error: loginMutation.error,
  };
};
