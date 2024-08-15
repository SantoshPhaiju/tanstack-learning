import { useQueries, useQuery } from "@tanstack/react-query";
import { getTodoById, getTodosIds } from "./api";

export function useTodoIds() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodosIds,
  });
}

export function useTodos(ids: (number[] | undefined) | undefined) {
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ["todo", id],
        queryFn: () => getTodoById(id),
      };
    }),
  });
}
