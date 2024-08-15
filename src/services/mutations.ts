import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ITodo } from "../types/todo";
import { createTodo } from "./api";

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ITodo) => createTodo(data),
    onMutate: () => {
      console.log("mutate");
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      console.log("success");
    },
    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log("error");
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
      }
    },
  });
}
