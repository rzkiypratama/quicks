"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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
    router.push("/inbox");
  };

  const handleTaskClick = () => {
    router.push("/task");
  };

  const handleMainButtonClick = () => {
    setTaskVisible(!isTaskVisible);
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-10 flex flex-row-reverse items-center justify-center gap-2 tracking-wider`}
    >
      <div className="flex flex-col items-center gap-2">
        <p className="opacity-0">main</p>
        <img
          src="/assets/buttonIcon/main-button.png"
          alt="main button"
          className={`h-[68px] w-[68px] transform cursor-pointer transition-transform ${
            isTaskVisible ? "rotate-45" : ""
          }`}
          onClick={handleMainButtonClick}
        />
      </div>
      {isTaskVisible && (
        <div className="flex items-center gap-2 text-white">
          <div className="flex flex-col items-center gap-2">
            <p>Task</p>
            <motion.img
              initial={{
                x: 10,
                opacity: 0,
                scale: 1,
                rotate: 30,
              }}
              animate={{
                x: 0,
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              transition={{
                duration: 0.2,
              }}
              src="/assets/buttonIcon/taskinactive-icon.png"
              alt="task button"
              className="delay-400 h-[68px] w-[68px] cursor-pointer opacity-100 transition-opacity"
              onClick={handleTaskClick}
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <p>Inbox</p>
            <motion.img
              initial={{
                x: 10,
                opacity: 0,
                scale: 1,
                rotate: 30,
              }}
              animate={{
                x: 0,
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              transition={{
                duration: 0.2,
              }}
              src="/assets/buttonIcon/inboxinactive-icon.png"
              alt="inbox button"
              className="h-[68px] w-[68px] cursor-pointer opacity-100 transition-opacity delay-200"
              onClick={handleInboxClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonUnclicked;
