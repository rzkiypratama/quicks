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
import { TaskItemProps } from "@/app/api/Types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const TaskContainer: React.FC<TaskItemProps> = ({
  taskId,
  title,
  description: initialDescription,
  taskCreated: initialTaskCreated,
  isComplete: initialIsComplete,
  onDelete,
  setTasks,
  stickerOptions,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isTaskCompleted, setIsTaskCompleted] = useState<boolean>(() => {
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

  const toggleOptionsMenu = () => {
    setIsOptionsMenuOpen(!isOptionsMenuOpen);
  };

  const handleCheckboxChange = () => {
    setIsTaskCompleted((prevIsComplete) => !prevIsComplete);
  };
  useEffect(() => {
    localStorage.setItem(
      `task_${taskId}_isComplete`,
      JSON.stringify(isTaskCompleted),
    );
  }, [isTaskCompleted, taskId]);

  const handleTaskCreatedChange = (newTaskCreated: string) => {
    setTaskCreated(newTaskCreated);
  };

  const handleDeleteClick = () => {
    onDelete();
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setEditedDescription(initialDescription);
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(
        `${process.env.QUICK_PUBLIC_BACKEND_URL}/task-lists/${taskId}`,
        {
          data: {
            title: editedTitle,
            description: editedDescription,
            taskCreated: editedTaskCreated,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      toast.success("Task Updated");
      if (!response.data) {
        console.error("Failed to update task:", response.statusText);
        return;
      }

      const updatedTask = response.data.data;
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

  useEffect(() => {
    setIsEditing(false);
    setEditedDescription(initialDescription || "No Description");
  }, [initialDescription]);

  useEffect(() => {
    const currentDate = new Date();

    if (taskCreated) {
      // format date 'DD/MM/YYYY'
      const formattedTaskCreated = taskCreated.replace(
        /(\d{2})\/(\d{2})\/(\d{4})/,
        "$3-$2-$1",
      );
      setTaskCreatedDate(formattedTaskCreated);

      // Konversi tanggal taskCreated dari UTC ke zona waktu lokal (GMT+7)
      const timeZone = "Asia/Jakarta";
      const taskCreatedDate = utcToZonedTime(
        new Date(formattedTaskCreated),
        timeZone,
      );
      if (!isNaN(taskCreatedDate.getTime())) {
        const timeDifference =
          taskCreatedDate.getTime() - currentDate.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
        setRemainingDays(daysDifference);
      } else {
        console.error("Invalid taskCreated format:", taskCreated);
      }
    }
  }, [taskCreated]);

  // sticker area
  const [stickerOptionsPosition, setStickerOptionsPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [selectedStickers, setSelectedStickers] = useState<string[]>([]);

  const showStickerOptions = (event: React.MouseEvent<HTMLSpanElement>) => {
    const stickerOptions = document.getElementById(`stickerOptions-${taskId}`);
    if (stickerOptions) {
      const rect = event.currentTarget.getBoundingClientRect();
      setStickerOptionsPosition({ top: rect.bottom, left: rect.left });
      stickerOptions.classList.toggle("hidden");
    }
  };

  const selectSticker = (selectedOption: string) => {
    const updatedStickers = selectedStickers.includes(selectedOption)
      ? selectedStickers.filter((sticker) => sticker !== selectedOption)
      : [...selectedStickers, selectedOption];

    // Update state immediately upon selection
    setSelectedStickers(updatedStickers);
    setTimeout(() => {
      storeStickers(updatedStickers);
    }, 0);

    const stickerOptions = document.getElementById(`stickerOptions-${taskId}`);
    if (stickerOptions) {
      stickerOptions.classList.add("hidden");
    }
  };

  const storeStickers = (stickers: string[]) => {
    try {
      localStorage.setItem(
        `task_${taskId}_selectedSticker`,
        JSON.stringify(stickers),
      );
      console.log(
        `Stored stickers for task_${taskId}:`,
        JSON.stringify(stickers),
      );
    } catch (error) {
      console.error("Error storing stickers in local storage:", error);
    }
  };

  const stickerColors: Record<string, string> = {
    "Important ASAP": "#E9F3FF",
    "Client Related": "#CBF1C2",
    "Self Task": "#CFCEF9",
    "Offline Meeting": "#FDCFA4",
    "Virtual Meeting": "#F9E9C3",
    ASAP: "#AFEBDB",
    Appointments: "#F9E0FD",
    "Court Related": "#9DD0ED",
  };

  useEffect(() => {
    try {
      const storedStickers = localStorage.getItem(
        `task_${taskId}_selectedSticker`,
      );
      if (storedStickers) {
        setSelectedStickers(JSON.parse(storedStickers));
        console.log(
          `Retrieved stickers for task_${taskId}:`,
          JSON.parse(storedStickers),
        );
      }
    } catch (error) {
      console.error("Error retrieving stickers from local storage:", error);
    }
  }, [taskId]);

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1750}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
                min="2021-01-01"
                onChange={(e) => handleTaskCreatedChange(e.target.value)}
              />
            )}
          </div>
          <div></div>
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
                  className="rounded border border-gray-300 p-2"
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
          <div className="mb-4 flex items-center gap-3">
            <div className="mr-2"></div>
            <div className="flex w-full items-center rounded-md bg-[#f9f9f9] px-4 py-4">
              <span
                className="relative cursor-pointer"
                onClick={showStickerOptions}
              >
                {/* sticker badge */}
                {selectedStickers.length > 0 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="20"
                    viewBox="0 0 15 20"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.4032 0.833374H5.52334C4.65742 0.833374 3.95681 1.58337 3.95681 2.50004H11.8288C12.6947 2.50004 13.4032 3.25004 13.4032 4.16671V15L14.9776 15.8334V2.50004C14.9776 1.58337 14.2691 0.833374 13.4032 0.833374ZM10.2545 5.83337V16.6417L6.94038 15.1334L6.31849 14.85L5.69661 15.1334L2.38249 16.6417V5.83337H10.2545ZM2.38245 4.16671H10.2545C11.1204 4.16671 11.8289 4.91671 11.8289 5.83337V19.1667L6.31845 16.6667L0.808044 19.1667V5.83337C0.808044 4.91671 1.51653 4.16671 2.38245 4.16671Z"
                      fill="#2F80ED"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="20"
                    viewBox="0 0 15 20"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.4032 0.833374H5.52334C4.65742 0.833374 3.95681 1.58337 3.95681 2.50004H11.8288C12.6947 2.50004 13.4032 3.25004 13.4032 4.16671V15L14.9776 15.8334V2.50004C14.9776 1.58337 14.2691 0.833374 13.4032 0.833374ZM10.2545 5.83337V16.6417L6.94038 15.1334L6.31849 14.85L5.69661 15.1334L2.38249 16.6417V5.83337H10.2545ZM2.38245 4.16671H10.2545C11.1204 4.16671 11.8289 4.91671 11.8289 5.83337V19.1667L6.31845 16.6667L0.808044 19.1667V5.83337C0.808044 4.91671 1.51653 4.16671 2.38245 4.16671Z"
                      fill="#B0B0B0"
                    />
                  </svg>
                )}

                <div
                  id={`stickerOptions-${taskId}`}
                  className="absolute hidden w-72 rounded-md border bg-white p-2"
                >
                  {stickerOptions.map((option) => (
                    <p
                      key={option}
                      onClick={() => selectSticker(option)}
                      style={{
                        backgroundColor: stickerColors[option],
                        padding: "10px",
                        borderRadius: "3px",
                        margin: "10px",
                        color: "#4f4f4f",
                        fontWeight: "600",
                      }}
                      className={
                        selectedStickers.includes(option) ? "selected" : ""
                      }
                    >
                      {option}
                    </p>
                  ))}
                </div>
              </span>
              <div className="ml-5">
                {selectedStickers.map((sticker, index) => (
                  <span
                    key={index}
                    className="mr-1 text-gray-800"
                    style={{
                      backgroundColor: stickerColors[sticker],
                      padding: "5px",
                      margin: "5px",
                      borderRadius: "3px",
                      color: "#4f4f4f",
                      fontWeight: "600",
                    }}
                  >
                    {sticker}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskContainer;
