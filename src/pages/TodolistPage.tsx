import TaskCard from "../components/TaskCard";
import TodoModal from "../components/Modal";
import { type TaskCardProps } from "../libs/Todolist";
import { useEffect, useState } from "react";

const STORAGE_KEY = "Lab13.tasks";

const defaultTasks: TaskCardProps[] = [
  {
    id: "1",
    title: "Read a book",
    description: "Vite + React + TS",
    isDone: false,
  },
  {
    id: "2",
    title: "Write code",
    description: "Finish project",
    isDone: false,
  },
  {
    id: "3",
    title: "Deploy app",
    description: "Push to Vercel",
    isDone: false,
  },
];

function loadTasks(): TaskCardProps[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultTasks;
  } catch {
    return defaultTasks; // เผื่อข้อมูลใน localStorage เสีย
  }
}

function App() {
  // use for load task from default task
  // const [tasks, setTasks] = useState<TaskCardProps[]>(defaultTasks);

  const [tasks, setTasks] = useState<TaskCardProps[]>(loadTasks);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = (newTask: TaskCardProps) => {
    setTasks([...tasks, newTask]);
    console.log("TODO handleAdd", newTask);
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
    console.log("TODO deleteTask", taskId);
  };

  const toggleDoneTask = (taskId: string) => {
    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, isDone: !t.isDone } : t)),
    );
    console.log("TODO toggleDoneTask", taskId);
  };

  return (
    <div className="col-12 m-2 p-0">
      <div className="container text-center">
        <h2>Todo List</h2>

        <div className="d-flex justify-content-center gap-2 my-2">
          <span className="badge bg-secondary-subtle text-secondary fs-6 px-3 py-2 rounded-pill border">
            All: <strong className="text-dark">({tasks.length})</strong>
          </span>
          <span className="badge bg-success-subtle text-success fs-6 px-3 py-2 rounded-pill border">
            Done:{" "}
            <strong className="text-success-emphasis">
              ({tasks.filter((t) => t.isDone).length})
            </strong>
          </span>
        </div>

        <div>
          <button
            type="button"
            className="btn btn-primary my-3"
            data-bs-toggle="modal"
            data-bs-target="#todoModal"
          >
            Add
          </button>
        </div>

        <TodoModal onAdd={handleAdd} />
        <>
          {tasks.map((task) => (
            <TaskCard
              id={task.id}
              title={task.title}
              description={task.description}
              deleteTaskFunc={deleteTask}
              toggleDoneTaskFunc={toggleDoneTask}
              isDone={task.isDone}
              key={task.id}
            />
          ))}
        </>
      </div>
    </div>
  );
}

export default App;
