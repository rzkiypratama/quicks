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
      <div className="ml-auto h-screen w-4/5 border-l-2 border-white">
        <SearchBar />
        <TaskView />
        <div className="fixed bottom-4 right-4 z-10 flex flex-row-reverse gap-5">
          <div className="relative">
            <div className={`inbox-shadow ${styles["inbox-shadow"]}`}></div>
            <img
              src="/assets/buttonIcon/taskactive-icon.png"
              alt="inbox button"
              className="relative z-20 h-[68px] w-[68px] cursor-pointer object-cover opacity-100 transition-opacity"
            />
          </div>
          <img
            src="/assets/buttonIcon/inboxinactive-icon.png"
            alt="inbox button"
            className="relative z-20 h-[68px] w-[68px] cursor-pointer object-cover opacity-100 transition-opacity"
            onClick={handleInboxClick}
          />
        </div>
      </div>
    </main>
  );
};

export default ButtonTask;
