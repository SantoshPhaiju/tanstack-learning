import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateTodo } from "../services/mutations";
import { useTodoIds, useTodos } from "../services/queries";
import { ITodo } from "../types/todo";

const Todo = () => {
  const todosIdsQuery = useTodoIds();
  const todosQueries = useTodos(todosIdsQuery?.data ?? []);

  const createTodoMutation = useCreateTodo();

  const handleCreateTodoSubmit: SubmitHandler<ITodo> = async (data) => {
    let newData = { ...data, userId: 1, id: 1 };
    createTodoMutation.mutate(newData);
  };

  const { register, handleSubmit } = useForm<ITodo>();

  return (
    <>
      <form onSubmit={handleSubmit(handleCreateTodoSubmit)} action="">
        <h2>Create Todo</h2>
        <input type="text" placeholder="Enter title" {...register("title")} />
        <br />
        <label htmlFor="">Completed</label>
        <input
          type="checkbox"
          placeholder="completed"
          {...register("completed")}
        />
        <br />
        <br />
        <button type="submit">submit</button>
      </form>

      <ul>
        {todosQueries.map(({ data }, index) => {
          return (
            <li key={index} className="mb-3">
              <div>Id: {data?.id}</div>
              <div>
                <strong>Title:</strong>
                {data?.title}
              </div>
              <div>
                <strong>Completed:</strong>
                {data?.completed ? "Yes" : "No"}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Todo;
