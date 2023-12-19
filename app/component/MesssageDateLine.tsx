"use client";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";

export interface MessageDateLineProps {
  timestamp: number; // Assuming timestamp is the timestamp of the message
}

const MessageDateLine: React.FC<MessageDateLineProps> = ({ timestamp }) => {
  const [showDateLine, setShowDateLine] = useState(true);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const currentDate = new Date(timestamp);
    const today = new Date();

    if (
      currentDate.getFullYear() === today.getFullYear() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getDate() === today.getDate()
    ) {
      // Messages from today
      setFormattedDate("Today");
    } else {
      // Messages from a different day
      setFormattedDate(format(currentDate, "MMMM d, yyyy"));
    }
  }, [timestamp]);

  return (
    <div className={`mt-4 text-center ${showDateLine ? "block" : "hidden"}`}>
      <hr className="mx-auto w-full border-t-2 border-gray-300" />
      <span className="relative top-[-12px] bg-white px-2 text-gray-500">
        {formattedDate}
      </span>
    </div>
  );
};

export default MessageDateLine;
