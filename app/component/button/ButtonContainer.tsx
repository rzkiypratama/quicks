'use client'
import React, { useState } from "react";
import ButtonMain from "./ButtonMain";

const ButtonContainer: React.FC = () => {
  const [isInboxVisible, setInboxVisible] = useState(false);
  const [isTaskVisible, setTaskVisible] = useState(false);

  const handleInboxClick = () => {
    setInboxVisible(true);
    setTaskVisible(false);
  };

  const handleTaskClick = () => {
    setInboxVisible(false);
    setTaskVisible(true);
  };

  return (
    <div>
        <ButtonMain onInboxClick={handleInboxClick} onTaskClick={handleTaskClick} />
    </div>
  );
};

export default ButtonContainer;