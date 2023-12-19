"use client";
import { useEffect, useState } from "react";
import {
  FaAngleUp,
  FaAngleDown,
  FaEllipsisH,
  FaRegClock,
  FaPencilAlt,
} from "react-icons/fa";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import axios, { AxiosResponse } from "axios";

export interface TasksData {
  id: number;
  attributes: {
    title: string;
    description: string;
    taskCreated: string;
  };
}

interface TodoItemProps {
  taskId: number;
  title: string;
  description: string;
  taskCreated: string;
  isComplete: boolean;
  onDelete: () => void;
  setTasks: React.Dispatch<React.SetStateAction<TasksData[]>>;
}

const TaskContainer: React.FC<TodoItemProps> = ({
  taskId,
  title,
  description: initialDescription,
  taskCreated: initialTaskCreated,
  isComplete: initialIsComplete,
  onDelete,
  setTasks,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isTaskCompleted, setIsTaskCompleted] = useState<boolean>(() => {
    // Load the initial state from localStorage or use the provided initialIsComplete
    const storedState = localStorage.getItem(`task_${taskId}_isComplete`);
    return storedState !== null ? JSON.parse(storedState) : initialIsComplete;
  });
  const [remainingDays, setRemainingDays] = useState<number | null>(null);
  const [taskCreatedDate, setTaskCreatedDate] = useState<string | null>(null);
  const [taskCreated, setTaskCreated] = useState<string>(
    initialTaskCreated || "",
  );
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(
    initialDescription || "No Description",
  );
  const [editedTitle, setEditedTitle] = useState<string>(title);
  const [editedTaskCreated, setEditedTaskCreated] =
    useState<string>(initialTaskCreated);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleCheckboxChange = () => {
    // Toggle the local state without making an API call
    setIsTaskCompleted((prevIsComplete) => !prevIsComplete);
  };

  useEffect(() => {
    localStorage.setItem(
      `task_${taskId}_isComplete`,
      JSON.stringify(isTaskCompleted),
    );
  }, [isTaskCompleted, taskId]);

  useEffect(() => {
    const currentDate = new Date();

    if (taskCreated) {
      // Pastikan format tanggal 'DD/MM/YYYY'
      const formattedTaskCreated = taskCreated.replace(
        /(\d{2})\/(\d{2})\/(\d{4})/,
        "$3-$2-$1",
      );

      // Setel taskCreatedDate
      setTaskCreatedDate(formattedTaskCreated);

      // Konversi tanggal taskCreated dari UTC ke zona waktu lokal (GMT+7)
      const timeZone = "Asia/Jakarta";
      const taskCreatedDate = utcToZonedTime(
        new Date(formattedTaskCreated),
        timeZone,
      );

      // Cek apakah tanggal taskCreated valid
      if (!isNaN(taskCreatedDate.getTime())) {
        // Hitung selisih hari dengan membulatkan ke atas
        const timeDifference =
          taskCreatedDate.getTime() - currentDate.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

        // Setel remainingDays sesuai dengan selisih hari
        setRemainingDays(daysDifference);
      } else {
        console.error("Invalid taskCreated format:", taskCreated);
      }
    }
  }, [taskCreated]);

  const handleTaskCreatedChange = (newTaskCreated: string) => {
    // Update state taskCreated
    setTaskCreated(newTaskCreated);
  };

  const toggleOptionsMenu = () => {
    setIsOptionsMenuOpen(!isOptionsMenuOpen);
  };

  const handleDeleteClick = () => {
    onDelete();
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(
        `http://localhost:1337/api/task-lists/${taskId}`,
        {
          data: {
            attributes: {
              title: editedTitle,
              description: editedDescription,
              taskCreated: editedTaskCreated,
              // Add other properties as needed
            },
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.data) {
        console.error("Failed to update task:", response.statusText);
        return;
      }

      const updatedTask = response.data.data;

      // Update state tasks by replacing the old task with the updated task
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task,
        ),
      );

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleCancelClick = () => {
    setEditedDescription(initialDescription);
    setIsEditing(false);
  };

  useEffect(() => {
    setIsEditing(false);
    setEditedDescription(initialDescription || "No Description");
  }, [initialDescription]);

  return (
    <div>
      {/* Task header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-3">
          <input
            type="checkbox"
            className="mr-2"
            checked={isTaskCompleted}
            onChange={handleCheckboxChange}
          />
          <p
            className={`mr-2 ${
              isTaskCompleted ? "text-gray-500 line-through" : ""
            }`}
          >
            {title}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* date remaining */}
          {remainingDays !== null && remainingDays > 0 && (
            <p className={`mr-2 ${remainingDays <= 5 ? "text-red-500" : ""}`}>
              {`${remainingDays} days left`}
            </p>
          )}
          {taskCreated && (
            <p className="mr-2">
              {format(
                utcToZonedTime(
                  new Date(
                    taskCreated.replace(
                      /(\d{2})\/(\d{2})\/(\d{4})/,
                      "$3-$2-$1",
                    ),
                  ),
                  "Asia/Jakarta",
                ),
                "dd/MM/yyyy",
              )}
            </p>
          )}
          <span className="mr-2 cursor-pointer" onClick={handleToggleCollapse}>
            {isCollapsed ? <FaAngleDown /> : <FaAngleUp />}
          </span>

          <span className={`mr-2 cursor-pointer `} onClick={toggleOptionsMenu}>
            <FaEllipsisH />
          </span>
          {isOptionsMenuOpen && (
            <div className="absolute right-0 mr-9 mt-16 flex flex-col items-start rounded-md border border-[#bdbdbd] bg-white p-2 pr-10">
              <p
                className="cursor-pointer text-red-500"
                onClick={handleDeleteClick}
              >
                Delete
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Task item */}
      {!isCollapsed && (
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="mr-6"></div>
            <span>
              <FaRegClock color="#2F80ED" />
            </span>
            {taskCreatedDate && (
              <input
                type="date"
                className="ml-2 rounded border border-gray-300 p-2"
                value={taskCreated.substring(0, 10)}
                onChange={(e) => handleTaskCreatedChange(e.target.value)}
              />
            )}

            <div className="-ml-[10.5rem] select-none bg-white pr-4">
              {taskCreated && (
                <p className="mr-2">
                  {format(
                    utcToZonedTime(
                      new Date(
                        taskCreated.replace(
                          /(\d{2})\/(\d{2})\/(\d{4})/,
                          "$3-$2-$1",
                        ),
                      ),
                      "Asia/Jakarta",
                    ),
                    "dd/MM/yyyy",
                  )}
                </p>
              )}
            </div>
          </div>
          <div className="mb-4 flex items-center gap-3">
            <div className="mr-6"></div>
            <span>
              <FaPencilAlt
                color={editedDescription ? "#2F80ED" : "gray"}
                onClick={handleEditClick}
                style={{ cursor: "pointer" }}
              />
            </span>
            {isEditing ? (
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  className="w- rounded border border-gray-300 p-2"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
                <button
                  className="rounded-md bg-blue-500 px-4 py-2 text-white"
                  onClick={() => handleSaveClick()}
                >
                  Save
                </button>
                <button
                  className="rounded-md bg-gray-500 px-4 py-2 text-white"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <p className="ml-2 mr-[60px]">
                {editedDescription || "No Description"}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskContainer;
