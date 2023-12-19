"use client";
import React, { useEffect, useState, useRef } from "react";
import chatData, { ChatData } from "../../api/chatDataSingle";
import NewMessageLine from "../NewMessageLine";
import InboxView from "./InboxView";
import { FaArrowLeft, FaXmark } from "react-icons/fa6";

const InboxViewSingle: React.FC = () => {
  const [chatDataSingleState, setChatDataSingle] =
    useState<ChatData[]>(chatData);
  const [newMessage, setNewMessage] = useState("");
  const [showInboxDetail, setShowInboxDetail] = useState(false);
  const [selectedChatIndex, setSelectedChatIndex] = useState<number | null>(
    null,
  );
  const [showNewMessageBadge, setShowNewMessageBadge] = useState(true);
  const [isReplying, setIsReplying] = useState(false);
  const [replyMessage, setReplyMessage] = useState<string | null>(null);
  const [replyDraft, setReplyDraft] = useState<string>("");
  const [replyMessages, setReplyMessages] = useState<{ [key: number]: string }>(
    {},
  );

  const handleOptionClick = (index: number) => {
    setSelectedChatIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleEditClick = () => {
    // Logika untuk menangani klik edit
    setSelectedChatIndex(null);
    console.log("Edit clicked");
  };

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (chatContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          chatContainerRef.current;

        // Tampilkan badge jika user scroll ke atas dan belum mencapai bagian bawah
        setShowNewMessageBadge(
          scrollTop > 0 && scrollTop + clientHeight >= scrollHeight,
        );
      }
    };

    if (chatContainerRef.current) {
      chatContainerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleBadgeClick = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth", // biar smooth like fresh air
      });
    }
  };

  // new message line
  const isNewMessage = true;

  const handleDeleteClick = (
    index: number,
    event: React.MouseEvent<HTMLParagraphElement>,
  ) => {
    event.preventDefault();
    const updatedChatData = [...chatDataSingleState];

    // Hapus pesan dari array
    updatedChatData.splice(index, 1);

    // Update state untuk menyimpan perubahan
    setChatDataSingle(updatedChatData);

    // Update localStorage untuk menyimpan perubahan
    localStorage.setItem(
      "chatDataSingleState",
      JSON.stringify(updatedChatData),
    );

    setSelectedChatIndex(null); // Menyembunyikan opsi setelah mengklik delete
  };

  const handleReplyClick = (
    index: number,
    event: React.MouseEvent<HTMLParagraphElement>,
  ) => {
    event.preventDefault();
    setReplyMessage(chatDataSingleState[index].message);
    setIsReplying(true);
  };

  const cancelReply = () => {
    setReplyMessage(null);
    setReplyDraft(""); // Clear the reply draft when canceling
    setIsReplying(false);
  };

  // testing to add new chat as sender
  const sendMessage = () => {
    if (!newMessage.trim()) {
      return; // Tidak mengirim pesan kosong
    }

    const currentDatetime = new Date();
    const hours = currentDatetime.getHours();
    const minutes = currentDatetime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    const hours12 = hours % 12 || 12;

    const currentTime = `${hours12}:${minutes} ${ampm}`;

    // Update the sender name to something other than "You" to clearly identify the receiver in the front guys
    const newChat = {
      id: chatDataSingleState.length + 1,
      sender: "You",
      message: newMessage,
      time: currentTime,
    };

    // Update state untuk menyimpan perubahan
    setChatDataSingle([...chatDataSingleState, newChat]);

    // Update localStorage untuk menyimpan perubahan
    localStorage.setItem(
      "chatDataSingleState",
      JSON.stringify([...chatDataSingleState, newChat]),
    );

    // Clear the input
    setNewMessage("");
  };

  useEffect(() => {
    // Load reply messages from local storage
    const storedReplyMessages = JSON.parse(
      localStorage.getItem("replyMessages") || "{}",
    );
    setReplyMessages(storedReplyMessages);
  }, []);

  const sendReply = () => {
    if (!replyDraft.trim() || selectedChatIndex === null) {
      console.log("Reply not sent: Empty or invalid data");
      return; // Tidak mengirim reply kosong
    }

    const currentTime = new Date().toLocaleTimeString();

    // Create a new chat object for your reply
    const newReplyChat = {
      id: chatDataSingleState.length + 2,
      sender: "You",
      message: replyDraft,
      time: currentTime,
    };

    // Create a new chat object for the replied message
    const repliedMessage = chatDataSingleState[selectedChatIndex]?.message;

    // Update state untuk menyimpan perubahan
    setChatDataSingle([...chatDataSingleState, newReplyChat]);

    // Update localStorage untuk menyimpan perubahan
    localStorage.setItem(
      "chatDataSingleState",
      JSON.stringify([...chatDataSingleState, newReplyChat]),
    );

    // Update replyMessages in localStorage
    const updatedReplyMessages = {
      ...replyMessages,
      [newReplyChat.id]: repliedMessage,
    };
    setReplyMessages(updatedReplyMessages);
    localStorage.setItem("replyMessages", JSON.stringify(updatedReplyMessages));

    // Reset reply state
    setReplyDraft("");
    setIsReplying(false);

    console.log("Reply sent successfully");
  };

  useEffect(() => {
    // Ambil data dari LocalStorage saat komponen dipasang
    const storedChatData = localStorage.getItem("chatDataSingleState");
    if (storedChatData) {
      setChatDataSingle(JSON.parse(storedChatData));
    } else {
      // Jika tidak ada data di LocalStorage, gunakan data default dari chatData
      setChatDataSingle(chatData);
    }

    // Retrieve reply messages from localStorage
    const storedReplyMessages = localStorage.getItem("replyMessages");
    if (storedReplyMessages) {
      setReplyMessages(JSON.parse(storedReplyMessages));
    }
  }, []);

  return (
    <main className="fixed bottom-24 right-4 z-40 h-[80vh] w-[734px] rounded-md bg-white tracking-wide shadow-md">
      <div className="flex h-[80vh] flex-col">
        {showInboxDetail ? (
          <InboxView />
        ) : (
          <div className="flex items-center justify-between border-b bg-white p-4">
            <div
              className="flex items-center gap-3"
              onClick={() => setShowInboxDetail(true)}
            >
              <FaArrowLeft className="cursor-pointer text-black" />
              <div>
                <h1 className="font-semibold text-main">FastVisa Support</h1>
              </div>
            </div>
            <FaXmark className="text-black" />
          </div>
        )}

        {/* chat container */}
        <div
          ref={chatContainerRef}
          className="flex-1 space-y-4 overflow-y-auto p-5"
        >
          {chatDataSingleState.map((chat, index) => (
            <div key={index}>
              {chat.isNew && <NewMessageLine isNewMessage={isNewMessage} />}
              <div
                className={
                  chat.sender === "You"
                    ? "items-end text-right font-semibold"
                    : "items-end text-left font-semibold"
                }
              >
                <p className="text-gray-600">{chat.sender}</p>
              </div>

              {/* replied chat bubble without sender */}

              {/* Bubble for the replied message */}
              <div className="flex justify-end">
                {chat.sender === "You" && replyMessages[chat.id] && (
                  <div className="mb-2 rounded-lg bg-[#e0e0e0] p-4">
                    <p>{replyMessages[chat.id]}</p>
                  </div>
                )}
              </div>

              {/* chat bubble dan chat option */}
              <div
                className={
                  chat.sender === "You"
                    ? "flex justify-end gap-3"
                    : "mr-20 flex flex-row-reverse justify-end gap-3"
                }
              >
                {chat.sender === "You" ? (
                  <div>
                    {/* container untuk chat option, edit, dan delete */}
                    <div className="relative">
                      {/* chat option */}
                      <div
                        className="flex cursor-pointer flex-col items-end"
                        onClick={() => handleOptionClick(index)}
                        style={{
                          userSelect: "none",
                        }}
                      >
                        ...
                      </div>

                      {/* container untuk edit dan delete */}
                      {selectedChatIndex === index && (
                        <div className="absolute flex flex-col items-start rounded-md border border-[#bdbdbd] bg-white p-4 pr-10">
                          <p className="text-main" onClick={handleEditClick}>
                            Edit
                          </p>
                          <div className="mt-2 border-t border-gray-700"></div>
                          <p
                            className="mt-2 cursor-pointer text-red-500"
                            onClick={(event) => handleDeleteClick(index, event)}
                          >
                            Delete
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* container untuk chat option, edit, dan delete */}
                    <div className="relative">
                      {/* chat option */}
                      <div
                        className="flex cursor-pointer flex-col items-end"
                        onClick={() => handleOptionClick(index)}
                        style={{
                          userSelect: "none",
                        }}
                      >
                        ...
                      </div>

                      {/* container untuk edit dan delete */}
                      {selectedChatIndex === index && (
                        <div className="absolute flex flex-col items-start rounded-md border border-[#bdbdbd] bg-white p-4 pr-10">
                          <p className="text-main" onClick={handleEditClick}>
                            Share
                          </p>
                          <div className="mt-2 border-t border-gray-700"></div>
                          <p
                            className="mt-2 cursor-pointer"
                            onClick={(event) => handleReplyClick(index, event)}
                          >
                            Reply
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* chat bubble */}
                <div
                  className={
                    chat.sender === "You"
                      ? "rounded-lg bg-purple-200 p-4"
                      : "rounded-lg bg-[#b2b1b1] p-4"
                  }
                >
                  <p>{chat.message}</p>

                  {/* time inside chat bubble */}
                  <p className="mt-2 text-xs text-gray-600">{chat.time}</p>
                </div>
              </div>
            </div>
          ))}
          {/* new message badge */}
          {showNewMessageBadge && (
            <div
              className="fixed z-50 m-auto mx-72 w-36 cursor-pointer rounded-md bg-[#E9F3FF] text-center"
              style={{
                top: "79%",
                transform: "translateY(-50%)",
              }}
              onClick={handleBadgeClick}
            >
              <h1 className="select-none p-2 text-main">New Message</h1>
            </div>
          )}
        </div>
        {/* chat container over */}

        {/* reply chat bubble */}
        <div className="relative top-1 flex justify-around px-4">
          {isReplying && (
            <div className="mr-3 w-full rounded-t-md border border-gray-300 bg-gray-100 p-2">
              <div className="flex justify-between p-2">
                <span className="mr-2 font-semibold text-gray-500">
                  Replying to FastVisa Support
                </span>
                <div
                  className="cursor-pointer text-red-500"
                  onClick={cancelReply}
                >
                  <FaXmark />
                </div>
              </div>
              <div className="flex items-center rounded-md p-2">
                <span className="mr-2">{replyMessage}</span>
              </div>
            </div>
          )}

          <div className="px-10"></div>
        </div>

        <div className="flex justify-around gap-[1.34rem] bg-white px-4 pb-4">
          <input
            className="w-full flex-1 rounded-md border border-gray-300 p-2 focus:outline-none"
            placeholder={isReplying ? "Type your reply" : "Type a new message"}
            type="text"
            value={isReplying ? replyDraft : newMessage}
            onChange={(e) =>
              isReplying
                ? setReplyDraft(e.target.value)
                : setNewMessage(e.target.value)
            }
          />

          <button
            className="rounded-md bg-blue-500 px-4 py-2 text-white"
            onClick={isReplying ? sendReply : sendMessage}
          >
            {isReplying ? "Send" : "Send"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default InboxViewSingle;