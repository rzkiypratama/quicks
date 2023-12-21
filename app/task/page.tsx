"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "../../public/styles/ButtonInbox.module.css";
import TaskView from "../component/task/TaskView";
import SearchBar from "../component/SearchBar";

const ButtonTask: React.FC = () => {
  const router = useRouter();

  const handleInboxClick = () => {
    router.push("/inbox");
  };

  const handleBackClick = () => {
    router.push("/");
  };

  return (
    <main>
      <div className="ml-auto h-screen border-l-2 lg:w-4/5 lg:border-white">
        <SearchBar />
        <TaskView />
        <div className="fixed bottom-4 right-4 z-10 flex flex-row-reverse gap-5">
          <div className="relative">
            <div
              className={`inbox-shadow cursor-pointer ${styles["inbox-shadow"]}`}
              onClick={handleBackClick}
            ></div>
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
