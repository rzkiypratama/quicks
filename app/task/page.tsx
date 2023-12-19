"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "../../public/styles/ButtonInbox.module.css";
import TaskView from "../component/task/TaskView";
import SearchBar from "../component/SearchBar";

const ButtonTask: React.FC = () => {
  const router = useRouter();

  const handleInboxClick = () => {
    // Navigate to the ButtonInbox component
    router.push("/inbox");
  };

  return (
    <main>
      <div className='border-l-2 border-white w-4/5 ml-auto h-screen'>
        <SearchBar />
        <TaskView />
        <div className='fixed flex flex-row-reverse gap-5 bottom-4 right-4 z-10'>
          <div className='relative'>
            <div
              className={`inbox-shadow ${styles["inbox-shadow"]}`}
            ></div>
            <img
              src='/assets/buttonIcon/taskactive-icon.png'
              alt='inbox button'
              className='h-[68px] w-[68px] object-cover transition-opacity opacity-100 cursor-pointer relative z-20'
            />
          </div>
          <img
            src='/assets/buttonIcon/inboxinactive-icon.png'
            alt='inbox button'
            className='h-[68px] w-[68px] object-cover transition-opacity opacity-100 cursor-pointer relative z-20'
            onClick={handleInboxClick}
          />
        </div>
      </div>
    </main>
  );
};

export default ButtonTask;
