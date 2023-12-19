"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import TaskContainer from "./TaskContainer";
import LoadingIndicator from "../Loader";
import axios from 'axios';

export interface TasksData {
  id: number;
  attributes: {
    title: string;
    description: string;
    taskCreated: string;
  };
}


const TodoPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("My Task");
  const [showNewTaskModal, setShowNewTaskModal] =
    useState<boolean>(false);
 const [tasks, setTasks] = useState<TasksData[]>([]);
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

  const handleAddTask = async (
    title: string,
    description: string,
    taskCreated: string,
  ) => {
    try {
      // Make a POST request to create a new task
      const response = await fetch('http://localhost:1337/api/task-lists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include any additional headers as needed
        },
        body: JSON.stringify({
          data: {
            title,
            description,
            taskCreated,
          },
        }),
      });
  
      if (!response.ok) {
        // Handle error scenarios, e.g., display an error message
        console.error('Failed to add task:', response.statusText);
        return;
      }
  
      const responseData = await response.json();
  
      // Assuming your Strapi response includes the created task data
      const newTask = responseData.data;
  
      // Update state tasks by adding the new task
      setTasks((prevTasks) => [
        ...prevTasks,
        newTask,
      ]);
  
      // Close the modal after adding the task
      setShowNewTaskModal(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleTaskDelete = async (taskId: number) => {
    try {
      // Make a DELETE request to delete the task by ID
      const response = await axios.delete(`http://localhost:1337/api/task-lists/${taskId}`);
  
      if (!response.data) {
        // Handle error scenarios, e.g., display an error message
        console.error('Failed to delete task:', response.statusText);
        return;
      }
  
      // Update state tasks by removing the deleted task
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  
      // Optional: Display a success message or perform any other actions after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get('http://localhost:1337/api/task-lists');

        if (!response.data) {
          throw new Error(`Failed to fetch tasks. Status: ${response.status}`);
        }

        const fetchedTasks: TasksData[] = response.data.data;

        console.log('Fetched Tasks:', fetchedTasks);

        // Check if fetchedTasks is an array before updating state
        if (Array.isArray(fetchedTasks)) {
          setTasks(fetchedTasks);
        } else {
          console.error('Fetched tasks is not an array:', fetchedTasks);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setIsLoading(false);
        // Handle the error (e.g., display an error message or retry)
      }
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
    tasks.map((task, index) => (
      <div key={index}>
        <TaskContainer
          title={task.attributes.title}
          description={task.attributes.description}
          taskCreated={task.attributes.taskCreated}
          onDelete={() => handleTaskDelete(task.id)}
          setTasks={setTasks}
          taskId={task.id} isComplete={false}       />
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
    // Retrieve values from input elements
    const titleInput = document.getElementById(
      'newTaskTitle'
    ) as HTMLInputElement;
    const dateInput = document.getElementById(
      'newTaskDate'
    ) as HTMLInputElement;
    const descriptionInput = document.getElementById(
      'newTaskDescription'
    ) as HTMLInputElement;

    // Extract values
    const title = titleInput.value;
    const taskDate = dateInput.value;
    const description = descriptionInput.value;

    // Validate that all input fields are filled before adding a new task
    if (title && taskDate && description) {
      // Call the handleAddTask function with the extracted values
      handleAddTask(title, description, taskDate);
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
