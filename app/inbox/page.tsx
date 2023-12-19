'use client'
import React from "react";
import { useRouter } from "next/navigation";
import styles from "../../public/styles/ButtonInbox.module.css";
import InboxView from "../component/inbox/InboxView";
import SearchBar from "../component/SearchBar";

const ButtonInbox: React.FC = () => {
  const router = useRouter();

  const handleTaskClick = () => {
    // Navigate to the ButtonInbox component
    router.push("/task");
  };
  return (
    <main>
      <div className='border-l-2 border-white w-4/5 ml-auto h-screen'>
        <SearchBar />
    <InboxView/>
    <div className='fixed flex flex-row-reverse gap-5 bottom-4 right-4 z-10'>
      <div className='relative'>
        <div
          className={`inbox-shadow ${styles["inbox-shadow"]}`}
        ></div>
        <img
          src='/assets/buttonIcon/inboxactive-icon.png'
          alt='inbox button'
          className='h-[68px] w-[68px] object-cover transition-opacity opacity-100 cursor-pointer relative z-20'
        />
      </div>
      <img
        src='/assets/buttonIcon/taskinactive-icon.png'
        alt='task button'
        className='h-[68px] w-[68px] transition-opacity opacity-100 object-cover cursor-pointer relative z-10'
        onClick={handleTaskClick}
      />
    </div>
      </div>
    </main>
  );
};

export default ButtonInbox;
