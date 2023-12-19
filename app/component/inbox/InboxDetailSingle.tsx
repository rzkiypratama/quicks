"use client";
import React, {
  useEffect,
  useState,
  useRef,
} from "react";
import chatData, {
  ChatData,
} from "../../api/chatDataSingle";
import NewMessageLine from "../NewMessageLine";
import InboxView from "./InboxView";

export default function Component() {
  const [chatDataSingleState, setChatDataSingle] =
    useState<ChatData[]>(chatData);
  const [newMessage, setNewMessage] =
    useState("");
  const [showInboxDetail, setShowInboxDetail] =
    useState(false);
  const [
    selectedChatIndex,
    setSelectedChatIndex,
  ] = useState<number | null>(null);
  const [
    showNewMessageBadge,
    setShowNewMessageBadge,
  ] = useState(true);
  const [isReplying, setIsReplying] =
    useState(false);
  const [replyMessage, setReplyMessage] =
    useState<string | null>(null);
  const [replyDraft, setReplyDraft] =
    useState<string>("");
  const [replyMessages, setReplyMessages] =
    useState<{ [key: number]: string }>({});

  const handleOptionClick = (index: number) => {
    setSelectedChatIndex((prevIndex) =>
      prevIndex === index ? null : index,
    );
  };

  const handleEditClick = () => {
    // Logika untuk menangani klik edit
    setSelectedChatIndex(null);
    console.log("Edit clicked");
  };

  const chatContainerRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (chatContainerRef.current) {
        const {
          scrollTop,
          scrollHeight,
          clientHeight,
        } = chatContainerRef.current;

        // Tampilkan badge jika user scroll ke atas dan belum mencapai bagian bawah
        setShowNewMessageBadge(
          scrollTop > 0 &&
            scrollTop + clientHeight <
              scrollHeight,
        );
      }
    };

    if (chatContainerRef.current) {
      chatContainerRef.current.addEventListener(
        "scroll",
        handleScroll,
      );
    }

    return () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.removeEventListener(
          "scroll",
          handleScroll,
        );
      }
    };
  }, []);

  const handleBadgeClick = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current
          .scrollHeight,
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
    const updatedChatData = [
      ...chatDataSingleState,
    ];

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
    setReplyMessage(
      chatDataSingleState[index].message,
    );
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

    const currentTime =
      new Date().toLocaleTimeString();
    const newChat = {
      id: chatDataSingleState.length + 1,
      sender: "You",
      message: newMessage,
      time: currentTime,
    };

    // Update state untuk menyimpan perubahan
    setChatDataSingle([
      ...chatDataSingleState,
      newChat,
    ]);

    // Update localStorage untuk menyimpan perubahan
    localStorage.setItem(
      "chatDataSingleState",
      JSON.stringify([
        ...chatDataSingleState,
        newChat,
      ]),
    );

    // Clear the input
    setNewMessage("");
  };

  useEffect(() => {
    // Load reply messages from local storage
    const storedReplyMessages = JSON.parse(
      localStorage.getItem("replyMessages") ||
        "{}",
    );
    setReplyMessages(storedReplyMessages);
  }, []);

  const sendReply = () => {
    if (
      !replyDraft.trim() ||
      selectedChatIndex === null
    ) {
      console.log(
        "Reply not sent: Empty or invalid data",
      );
      return; // Tidak mengirim reply kosong
    }

    const currentTime =
      new Date().toLocaleTimeString();

    // Create a new chat object for your reply
    const newReplyChat = {
      id: chatDataSingleState.length + 2,
      sender: "You",
      message: replyDraft,
      time: currentTime,
    };

    // Create a new chat object for the replied message
    const repliedMessage =
      chatDataSingleState[selectedChatIndex]
        ?.message;

    // Update state untuk menyimpan perubahan
    setChatDataSingle([
      ...chatDataSingleState,
      newReplyChat,
    ]);

    // Update localStorage untuk menyimpan perubahan
    localStorage.setItem(
      "chatDataSingleState",
      JSON.stringify([
        ...chatDataSingleState,
        newReplyChat,
      ]),
    );

    // Update replyMessages in localStorage
    const updatedReplyMessages = {
      ...replyMessages,
      [newReplyChat.id]: repliedMessage,
    };
    setReplyMessages(updatedReplyMessages);
    localStorage.setItem(
      "replyMessages",
      JSON.stringify(updatedReplyMessages),
    );

    // Reset reply state
    setReplyDraft("");
    setIsReplying(false);

    console.log("Reply sent successfully");
  };

  useEffect(() => {
    // Ambil data dari LocalStorage saat komponen dipasang
    const storedChatData = localStorage.getItem(
      "chatDataSingleState",
    );
    if (storedChatData) {
      setChatDataSingle(
        JSON.parse(storedChatData),
      );
    } else {
      // Jika tidak ada data di LocalStorage, gunakan data default dari chatData
      setChatDataSingle(chatData);
    }

    // Retrieve reply messages from localStorage
    const storedReplyMessages =
      localStorage.getItem("replyMessages");
    if (storedReplyMessages) {
      setReplyMessages(
        JSON.parse(storedReplyMessages),
      );
    }
  }, []);

  return (
    <main className='h-[80vh] w-[734px] bg-white fixed bottom-24 right-4 shadow-md tracking-wide rounded-md z-40'>
      <div className='flex flex-col h-[80vh]'>
        {showInboxDetail ? (
          <InboxView />
        ) : (
          <div className='flex items-center justify-between p-4 bg-white border-b'>
            <div
              className='flex gap-3 items-center'
              onClick={() =>
                setShowInboxDetail(true)
              }
            >
              <ArrowLeftIcon className='text-black cursor-pointer' />
              <div>
                <h1 className='font-semibold text-main'>
                  FastVisa Support
                </h1>
              </div>
            </div>
            <PanelTopCloseIcon className='text-black' />
          </div>
        )}

        {/* chat container */}
        <div
          ref={chatContainerRef}
          className='flex-1 overflow-y-auto p-5 space-y-4'
        >
          {chatDataSingleState.map(
            (chat, index) => (
              <div key={index}>
                {chat.isNew && (
                  <NewMessageLine
                    isNewMessage={isNewMessage}
                  />
                )}
                <div
                  className={
                    chat.sender === "You"
                      ? "text-right font-semibold items-end"
                      : "text-left font-semibold items-end"
                  }
                >
                  <p className='text-gray-600'>
                    {chat.sender}
                  </p>
                </div>

                {/* replied chat bubble without sender */}

                {/* Bubble for the replied message */}
                <div className="flex justify-end">
                {chat.sender === "You" &&
                  replyMessages[chat.id] && (
                    <div className='bg-[#e0e0e0] p-4 rounded-lg mb-2'>
                      <p>
                        {replyMessages[chat.id]}
                      </p>
                    </div>
                  )}
                </div>

                {/* chat bubble dan chat option */}
                <div
                  className={
                    chat.sender === "You"
                      ? "flex gap-3 justify-end"
                      : "flex flex-row-reverse mr-20 gap-3 justify-end"
                  }
                >
                  {chat.sender === "You" ? (
                    <div>
                      {/* container untuk chat option, edit, dan delete */}
                      <div className='relative'>
                        {/* chat option */}
                        <div
                          className='cursor-pointer flex flex-col items-end'
                          onClick={() =>
                            handleOptionClick(
                              index,
                            )
                          }
                          style={{
                            userSelect: "none",
                          }}
                        >
                          ...
                        </div>

                        {/* container untuk edit dan delete */}
                        {selectedChatIndex ===
                          index && (
                          <div className='absolute flex flex-col items-start border border-[#bdbdbd] rounded-md p-4 pr-10 bg-white'>
                            <p
                              className='text-main'
                              onClick={
                                handleEditClick
                              }
                            >
                              Edit
                            </p>
                            <div className='border-t border-gray-700 mt-2'></div>
                            <p
                              className='text-red-500 mt-2 cursor-pointer'
                              onClick={(event) =>
                                handleDeleteClick(
                                  index,
                                  event,
                                )
                              }
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
                      <div className='relative'>
                        {/* chat option */}
                        <div
                          className='cursor-pointer flex flex-col items-end'
                          onClick={() =>
                            handleOptionClick(
                              index,
                            )
                          }
                          style={{
                            userSelect: "none",
                          }}
                        >
                          ...
                        </div>

                        {/* container untuk edit dan delete */}
                        {selectedChatIndex ===
                          index && (
                          <div className='absolute flex flex-col items-start border border-[#bdbdbd] rounded-md p-4 pr-10 bg-white'>
                            <p
                              className='text-main'
                              onClick={
                                handleEditClick
                              }
                            >
                              Share
                            </p>
                            <div className='border-t border-gray-700 mt-2'></div>
                            <p
                              className='mt-2 cursor-pointer'
                              onClick={(event) =>
                                handleReplyClick(
                                  index,
                                  event,
                                )
                              }
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
                        ? "bg-purple-200 p-4 rounded-lg"
                        : "bg-[#b2b1b1] p-4 rounded-lg"
                    }
                  >
                    <p>{chat.message}</p>

                    {/* time inside chat bubble */}
                    <p className='text-xs text-gray-600 mt-2'>
                      {chat.time}
                    </p>
                  </div>
                </div>
              </div>
            ),
          )}
          {/* new message badge */}
          {showNewMessageBadge && (
            <div
              className='fixed m-auto text-center w-36 bg-[#E9F3FF] z-50 rounded-md cursor-pointer mx-72'
              style={{
                top: "79%",
                transform: "translateY(-50%)",
              }}
              onClick={handleBadgeClick}
            >
              <h1 className='text-main select-none p-2'>
                New Message
              </h1>
            </div>
          )}
        </div>

        {isReplying && (
          <div className='bg-gray-100 p-2 mb-2 flex  flex-col'>
            <div className='flex p-2 justify-between'>
              <span className='text-gray-500 font-semibold mr-2'>
                Replying to FastVisa Support
              </span>
              <button
                className='text-red-500'
                onClick={cancelReply}
              >
                X
              </button>
            </div>
            <div className='p-2 rounded-md flex items-center'>
              <span className='mr-2'>
                {replyMessage}
              </span>
            </div>
          </div>
        )}
        {/* chat container over */}

        <div className='flex h-auto items-center p-4 bg-white'>
          <input
            className='flex-1 p-2 mr-4 border border-gray-300 rounded-lg'
            placeholder={
              isReplying
                ? "Type your reply"
                : "Type a new message"
            }
            type='text'
            value={
              isReplying ? replyDraft : newMessage
            }
            onChange={(e) =>
              isReplying
                ? setReplyDraft(e.target.value)
                : setNewMessage(e.target.value)
            }
          />
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded-md'
            onClick={
              isReplying ? sendReply : sendMessage
            }
          >
            {isReplying ? "Send Reply" : "Send"}
          </button>
        </div>
      </div>
    </main>
  );
}

function ArrowLeftIcon(
  props: React.JSX.IntrinsicAttributes &
    React.SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='m12 19-7-7 7-7' />
      <path d='M19 12H5' />
    </svg>
  );
}

function PanelTopCloseIcon(
  props: React.JSX.IntrinsicAttributes &
    React.SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <rect
        width='18'
        height='18'
        x='3'
        y='3'
        rx='2'
        ry='2'
      />
      <line x1='3' x2='21' y1='9' y2='9' />
      <path d='m9 16 3-3 3 3' />
    </svg>
  );
}
