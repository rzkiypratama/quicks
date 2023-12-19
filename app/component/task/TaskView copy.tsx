"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import TaskContainer from "./TaskContainer";
import { TasksData } from "../../api/taskData";
import LoadingIndicator from "../Loader";

const initialTasks: TasksData[] =
  typeof window !== "undefined"
    ? JSON.parse(
        localStorage.getItem("tasks") || "[]",
      ) || []
    : [];

const TodoPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("My Task");
  const [showNewTaskModal, setShowNewTaskModal] =
    useState<boolean>(false);
  const [tasks, setTasks] =
    useState<TasksData[]>(initialTasks);
    const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedCategory(event.target.value);
  };

  const handleNewTaskClick = () => {
    setShowNewTaskModal(true);
  };

  const handleModalClose = () => {
    setShowNewTaskModal(false);
  };

  const handleAddTask = (
    title: string,
    description: string,
    taskCreated: string,
  ) => {
    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      taskCreated,
    };

    // Update state tasks dengan menambahkan tugas baru
    setTasks((prevTasks) => [
      ...prevTasks,
      newTask,
    ]);

    // Simpan ke localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "tasks",
        JSON.stringify([...tasks, newTask]),
      );
    }

    // Tutup modal setelah menambahkan tugas baru
    setShowNewTaskModal(false);
  };

  const handleTaskDelete = (taskId: number) => {
    // Implementasikan logika penghapusan data di sini
    // Anda dapat menggunakan filter atau metode lainnya
    const updatedTasks = tasks.filter(
      (task) => task.id !== taskId,
    );

    // Update state atau lakukan tindakan lainnya yang diperlukan
    setTasks(updatedTasks);

    // Simpan ke localStorage jika diperlukan
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "tasks",
        JSON.stringify(updatedTasks),
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // Simulasi pengambilan data dari server
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Lakukan pengambilan data atau operasi lainnya di sini

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className='h-[80vh] w-2/3 lg:w-[734px] bg-white fixed bottom-24 right-4  shadow-md tracking-wide overflow-y-auto'>
      <Head>
        <title>Todo List</title>
      </Head>
      <div className='sticky top-0 bg-white w-full px-[34px] pt-5'>
        <div className='flex justify-between mb-4'>
          <div>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className='p-2 border border-gray-300 rounded'
            >
              <option value='My Task'>
                My Task
              </option>
              <option value='Personal Errands'>
                Personal Errands
              </option>
              <option value='Urgent To-Do'>
                Urgent To-Do
              </option>
            </select>
          </div>
          <div>
            <button
              className='bg-blue-500 text-white p-2 rounded'
              onClick={handleNewTaskClick}
            >
              New Task
            </button>
          </div>
        </div>
      </div>

      <div className='h-[70vh] px-[34px] pt-5'>
      {isLoading ? (
        <LoadingIndicator loadingText='Loading Task List' />
      ) : tasks.length === 0 ? (
        <div className='text-center text-gray-500 pt-56'>
          <p>Currently No Task Available</p>
          <p className="cursor-pointer mt-3 text-main" onClick={handleNewTaskClick}>
            Click here to create task
          </p>
        </div>
      ) : (
        tasks.map((task) => (
          <div key={task.id}>
            <TaskContainer
              title={task.title}
              description={task.description}
              taskCreated={task.taskCreated}
              onDelete={() => handleTaskDelete(task.id)}
            />
            <hr className='border-1 my-4' />
          </div>
        ))
      )}
    </div>

      {/* Modal untuk menambahkan tugas baru guys */}
      {showNewTaskModal && (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center'>
          <div className='bg-white w-2/4 p-6 rounded-md'>
            <h2 className='text-2xl font-semibold mb-4'>
              New Task
            </h2>
            {/* Form untuk menambahkan tugas baru */}
            <div className='mb-4'>
              <label
                htmlFor='newTaskTitle'
                className='block text-sm font-medium text-gray-700'
              >
                Title
              </label>
              <input
                type='text'
                id='newTaskTitle'
                name='newTaskTitle'
                className='mt-1 p-2 border border-gray-300 rounded w-full'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='newTaskDate'
                className='block text-sm font-medium text-gray-700'
              >
                Task Date
              </label>
              <input
                type='date'
                id='newTaskDate'
                name='newTaskDate'
                className='mt-1 p-2 border border-gray-300 rounded w-full'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='newTaskDescription'
                className='block text-sm font-medium text-gray-700'
              >
                Description
              </label>
              <textarea
                id='newTaskDescription'
                name='newTaskDescription'
                rows={3}
                className='mt-1 p-2 border border-gray-300 rounded w-full'
              ></textarea>
            </div>
            <div className='flex justify-end'>
              <button
                className='mr-2 bg-blue-500 text-white px-4 py-2 rounded-md'
                onClick={() => {
                  // Ambil nilai dari input
                  const title = (
                    document.getElementById(
                      "newTaskTitle",
                    ) as HTMLInputElement
                  ).value;
                  const taskDate = (
                    document.getElementById(
                      "newTaskDate",
                    ) as HTMLInputElement
                  ).value;
                  const description = (
                    document.getElementById(
                      "newTaskDescription",
                    ) as HTMLInputElement
                  ).value;

                  // Validasi bahwa semua input terisi sebelum menambahkan tugas baru
                  if (
                    title &&
                    taskDate &&
                    description
                  ) {
                    handleAddTask(
                      title,
                      description,
                      taskDate,
                    );
                  }
                }}
              >
                Add Task
              </button>
              <button
                className='bg-gray-500 text-white px-4 py-2 rounded-md'
                onClick={handleModalClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoPage;
