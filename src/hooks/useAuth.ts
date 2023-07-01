import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { authStore } from "../pocketbase/auth";

const getCurrentUser = () => {
  const { model, token, isValid } = authStore;
  return { model, token, isValid };
};

const clearUser = () => {
  authStore.clear();
};

const useAuth = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery(["user"], getCurrentUser);

  authStore.onChange(() => {
    queryClient.invalidateQueries(["user"]);
  });

  return { user: data, clearUser };
};

export default useAuth;
