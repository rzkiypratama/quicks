"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface ButtonMainProps {
  onInboxClick: () => void;
  onTaskClick: () => void;
}

const ButtonUnclicked: React.FC<ButtonMainProps> = ({
  onInboxClick,
  onTaskClick,
}) => {
  const [isTaskVisible, setTaskVisible] = useState(false);

  const router = useRouter();

  const handleInboxClick = () => {
    // Navigate to the ButtonInbox component
    router.push("/inbox");
  };

  const handleTaskClick = () => {
    // Navigate to the ButtonInbox component
    router.push("/task");
  };

  const handleMainButtonClick = () => {
    setTaskVisible(!isTaskVisible);
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-10 flex flex-row-reverse items-center justify-center gap-5`}
    >
      <img
        src="/assets/buttonIcon/main-button.png"
        alt="main button"
        className={`h-[68px] w-[68px] transform cursor-pointer transition-transform ${
          isTaskVisible ? "rotate-45" : ""
        }`}
        onClick={handleMainButtonClick}
      />
      {isTaskVisible && (
        <>
          <img
            src="/assets/buttonIcon/inboxinactive-icon.png"
            alt="inbox button"
            className="h-[68px] w-[68px] cursor-pointer opacity-100 transition-opacity delay-200"
            onClick={handleInboxClick}
          />
          <img
            src="/assets/buttonIcon/taskinactive-icon.png"
            alt="task button"
            className="h-[68px] w-[68px] cursor-pointer opacity-100 transition-opacity delay-400"
            onClick={handleTaskClick}
          />
        </>
      )}
    </div>
  );
};

export default ButtonUnclicked;
