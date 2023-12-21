"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "../../public/styles/ButtonInbox.module.css";
import InboxView from "../component/inbox/InboxView";
import SearchBar from "../component/SearchBar";

const ButtonInbox: React.FC = () => {
  const router = useRouter();

  const handleTaskClick = () => {
    router.push("/task");
  };

  const handleBackClick = () => {
    router.push("/");
  };

  return (
    <main>
      <div className="ml-auto h-screen w-4/5 border-l-2 border-white">
        <SearchBar />
        <InboxView />
        <div className="fixed bottom-4 right-4 z-10 flex flex-row-reverse gap-5">
          <div className="relative">
            <div
              className={`inbox-shadow cursor-pointer ${styles["inbox-shadow"]}`}
              onClick={handleBackClick}
            ></div>
            <img
              src="/assets/buttonIcon/inboxactive-icon.png"
              alt="inbox button"
              className="relative z-20 h-[68px] w-[68px] cursor-pointer object-cover opacity-100 transition-opacity"
            />
          </div>
          <img
            src="/assets/buttonIcon/taskinactive-icon.png"
            alt="task button"
            className="relative z-10 h-[68px] w-[68px] cursor-pointer object-cover opacity-100 transition-opacity"
            onClick={handleTaskClick}
          />
        </div>
      </div>
    </main>
  );
};

export default ButtonInbox;
