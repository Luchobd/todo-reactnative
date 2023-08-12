import { TasksInput } from "../interfaces/tasks.interface";

const API = "https://back-todo-with-ts.onrender.com/item";

export const getTasks = async () => {
  const response = await fetch(API);
  const data = await response.json();
  return data;
};

export const getTask = async (id: string) => {
  const response = await fetch(`${API}/${id}`);
  const data = await response.json();
  return data;
};

export const saveTask = async (task: TasksInput) => {
  const response = await fetch(API, {
    method: "POST",
    body: JSON.stringify(task),
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
};

export const updateTask = async (id: string, task: TasksInput) => {
  const response = await fetch(`${API}/${id}`, {
    method: "PUT",
    body: JSON.stringify(task),
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
}

export const deleteTask = async (id: string) => {
  const response = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
}