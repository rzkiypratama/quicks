"use client";
import React, { useEffect, useState, useRef } from "react";
import chatDataGroup, { ChatData } from "../../api/chatDataGroup";
import NewMessageLine from "../NewMessageLine";
import InboxView from "./InboxView";

export default function Component() {
  const [chatDataGroupState, setChatDataGroup] =
    useState<ChatData[]>(chatDataGroup);
  const [newMessage, setNewMessage] = useState("");
  const [showInboxDetail, setShowInboxDetail] = useState(false);
  const [selectedChatIndex, setSelectedChatIndex] = useState<number | null>(
    null,
  );
  const [showNewMessageBadge, setShowNewMessageBadge] = useState(true);
  const [isContentScrollable, setIsContentScrollable] = useState(false);
  const [isReplyMode, setIsReplyMode] = useState<boolean>(false);
  const [replyMessage, setReplyMessage] = useState<string>("");
  // new message line
  const isNewMessage = true;

  const handleOptionClick = (index: number) => {
    setSelectedChatIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleEditClick = () => {
    setSelectedChatIndex(null);
    console.log("Edit clicked");
  };

  const handleDeleteClick = (
    index: number,
    event: React.MouseEvent<HTMLParagraphElement>,
  ) => {
    event.preventDefault();
    const updatedChatData = [...chatDataGroupState];
    updatedChatData.splice(index, 1);
    setChatDataGroup(updatedChatData);
    localStorage.setItem("chatDataGroupState", JSON.stringify(updatedChatData));
    setSelectedChatIndex(null);
  };

  const handleReplyClick = (index: number) => {
    setIsReplyMode(true);
    setReplyMessage(chatDataGroupState[index].message);
  };

  // rpely nih bos
  const handleSendReply = () => {
    const currentTime = new Date().toLocaleTimeString();
    const newReply = {
      id: chatDataGroupState.length + 1,
      sender: "You",
      message: replyMessage,
      time: currentTime,
    };
    setChatDataGroup([...chatDataGroupState, newReply]);
    localStorage.setItem(
      "chatDataGroupState",
      JSON.stringify([...chatDataGroupState, newReply]),
    );
    setIsReplyMode(false);
    setReplyMessage("");
  };

  // testing to add new chat as sender
  const sendMessage = () => {
    const currentTime = new Date().toLocaleTimeString();
    const newChat = {
      id: chatDataGroupState.length + 1,
      sender: "You",
      message: newMessage,
      time: currentTime,
    };
    setChatDataGroup([...chatDataGroupState, newChat]);
    localStorage.setItem(
      "chatDataGroupState",
      JSON.stringify([...chatDataGroupState, newChat]),
    );
    setNewMessage("");
  };

  const handleBadgeClick = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth", // biar smooth like fresh air
      });
    }
  };

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (chatContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          chatContainerRef.current;

        // Tampilkan badge jika user scroll ke atas dan belum mencapai bagian bawah
        setShowNewMessageBadge(
          scrollTop > 0 && scrollTop + clientHeight < scrollHeight,
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

  useEffect(() => {
    const storedChatData = localStorage.getItem("chatDataGroupState");
    if (storedChatData) {
      setChatDataGroup(JSON.parse(storedChatData));
    } else {
      setChatDataGroup(chatDataGroup);
    }
  }, []);

  useEffect(() => {
    const handleScrollability = () => {
      if (chatContainerRef.current) {
        setIsContentScrollable(
          chatContainerRef.current.scrollHeight >
            chatContainerRef.current.clientHeight,
        );
      }
    };
    handleScrollability();
    if (chatContainerRef.current) {
      chatContainerRef.current.addEventListener("scroll", handleScrollability);
    }

    return () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.removeEventListener(
          "scroll",
          handleScrollability,
        );
      }
    };
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
              <ArrowLeftIcon className="cursor-pointer text-black" />
              <div>
                <h1 className="font-semibold text-main">
                  I-589 - AMARKHIL, Obaidullah [Affirmative Filing with ZHN]
                </h1>
                <p className="text-[12px]">3 Participants</p>
              </div>
            </div>
            <PanelTopCloseIcon className="text-black" />
          </div>
        )}

        {/* chat container */}
        <div
          ref={chatContainerRef}
          className="flex-1 space-y-4 overflow-y-auto p-5"
        >
          {chatDataGroupState.map((chat, index) => (
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

              {/* chat bubble dan chat option */}
              <div
                className={
                  chat.sender === "You"
                    ? "flex justify-end gap-3"
                    : "mr-20 flex flex-row-reverse justify-end gap-3"
                }
              >
                <div>
                  {/* container untuk chat option, edit, dan delete */}
                  {chat.sender === "You" ? (
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
                            className="mt-2 cursor-pointer"
                            onClick={(event) => handleDeleteClick(index, event)}
                          >
                            Delete
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
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

                      {/* container untuk Share dan Reply */}
                      {selectedChatIndex === index && (
                        <div className="absolute flex flex-col items-start rounded-md border border-[#bdbdbd] bg-white p-4 pr-10">
                          <p className="text-main" onClick={handleEditClick}>
                            Edit
                          </p>
                          <div className="mt-2 border-t border-gray-700"></div>
                          {isReplyMode ? (
                            <div className="mt-2 flex">
                              <input
                                type="text"
                                value={replyMessage}
                                onChange={(e) =>
                                  setReplyMessage(e.target.value)
                                }
                                className="flex-grow rounded border border-gray-300 p-2"
                                placeholder="Your reply..."
                              />
                              <button
                                className="ml-2 rounded-md bg-red-500 px-4 py-2 text-white"
                                onClick={handleSendReply}
                              >
                                Send
                              </button>
                            </div>
                          ) : (
                            <p
                              className="mt-2 cursor-pointer"
                              onClick={() => handleReplyClick(index)}
                            >
                              Reply
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* chat bubble */}
                <div
                  className={
                    chat.sender === "You"
                      ? "rounded-lg bg-purple-200 p-4"
                      : chat.sender === "Mary Hilda"
                        ? "rounded-lg bg-[#FCEED3] p-4"
                        : "rounded-lg bg-[#D2F2EA] p-4"
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
          {isContentScrollable && showNewMessageBadge && (
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

        <div className="flex h-auto items-center bg-white p-4">
          <input
            className="mr-4 flex-1 rounded-lg border border-gray-300 p-2"
            placeholder="Type a new message"
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="rounded-md bg-blue-500 px-4 py-2 text-white"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}

function ArrowLeftIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function PanelTopCloseIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <line x1="3" x2="21" y1="9" y2="9" />
      <path d="m9 16 3-3 3 3" />
    </svg>
  );
}
