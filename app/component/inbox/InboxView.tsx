"use client";
import React, { useEffect, useState } from "react";
import styles from "../../../public/styles/SearchBarInbox.module.css";
import InboxDetailGroup from "./InboxDetailGroup";
import InboxDetailSingle from "./InboxDetailSingle";
import LoadingIndicator from "../Loader";

const InboxView: React.FC = () => {
  const [showInboxDetail, setShowInboxDetail] = useState(false);
  const [showInboxSingle, setShowInboxSingle] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInboxDetailClick = () => {
    setShowInboxDetail(!showInboxDetail);
  };
  const handleInboxSingleClick = () => {
    setShowInboxSingle(!showInboxSingle);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    fetchData();
  }, []);
  return (
    <div className="fixed bottom-24 right-4 z-[60] h-[80vh] w-[734px] bg-white px-[34px] pt-5 tracking-wide shadow-md">
      {/* search bar */}
      <div className={`${styles.searchBar} px-10`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="12"
          viewBox="0 0 13 12"
          fill="none"
          className={styles.searchIcon}
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.21143 7.54717H8.75345L12.1771 10.9777L11.1548 12L7.72429 8.57633V8.03431L7.53905 7.8422C6.75688 8.51458 5.74145 8.91938 4.63682 8.91938C2.17369 8.91938 0.177124 6.92281 0.177124 4.45969C0.177124 1.99657 2.17369 0 4.63682 0C7.09994 0 9.09651 1.99657 9.09651 4.45969C9.09651 5.56432 8.6917 6.57976 8.01932 7.36192L8.21143 7.54717ZM1.54933 4.4597C1.54933 6.16811 2.92841 7.54718 4.63681 7.54718C6.34522 7.54718 7.72429 6.16811 7.72429 4.4597C7.72429 2.7513 6.34522 1.37222 4.63681 1.37222C2.92841 1.37222 1.54933 2.7513 1.54933 4.4597Z"
            fill="#333333"
          />
        </svg>
        <input
          type="text"
          placeholder="Search"
          className={`${styles.searchInput} placeholder-gray-800`}
        />
      </div>

      {/* message area */}
      <div className="message-container">
        {isLoading ? (
          <LoadingIndicator loadingText={"Loading Chats"} />
        ) : (
          <>
            {/* inbox detail */}
            <div
              className="my-6 flex cursor-pointer"
              onClick={handleInboxDetailClick}
            >
              {/* avatar icon */}
              <div className="mr-8 w-auto">
                <img
                  src="/assets/default-avatar.png"
                  alt="default avatar background"
                  className="absolute z-10 ml-4 h-9 w-9"
                />
                <img
                  src="/assets/default-avatar-bg.png"
                  alt="default avatar"
                  className="h-9 w-9"
                />
              </div>

              {/* message header */}
              <div className="flex gap-4">
                <div className="text-secondary">
                  {/* group name */}
                  <p className="text-[16px] font-bold text-main">
                    109220-Naturalization
                  </p>
                  {/* sender info */}
                  <p className="text-[14px] font-bold">Cameron Phillips :</p>
                  <p className="text-[14px]">Please check this out!</p>
                </div>

                <div className="flex gap-3 text-[14px]">
                  {/* date */}
                  <p>January 1, 2021</p>
                  {/* time */}
                  <p>19:10</p>
                </div>
              </div>
            </div>
            {showInboxDetail && <InboxDetailGroup />}

            <hr />

            <div className="my-6 grid grid-cols-[auto,1fr]">
              {/* avatar icon */}
              <div className="mr-8 w-auto">
                <img
                  src="/assets/default-avatar.png"
                  alt="default avatar background"
                  className="absolute z-10 ml-4 h-9 w-9"
                />
                <img
                  src="/assets/default-avatar-bg.png"
                  alt="default avatar"
                  className="h-9 w-9"
                />
              </div>

              {/* message header */}
              <div className="flex">
                <div className="w-9 flex-grow text-secondary">
                  {/* group name */}
                  <p className="text-[16px] font-bold text-main">
                    Jeannette Moraima Guaasdasdman Chamba (Hutto I-589) [ Hutto
                    Follow Up - Brief Service ]
                  </p>
                  {/* sender info */}
                  <p className="text-[14px] font-bold">Ellen :</p>
                  {/* message */}
                  <p className="text-[14px]">Hey please read!</p>
                </div>

                <div className="flex gap-3 text-[14px]">
                  {/* date */}
                  <p>02/06/2021</p>
                  {/* time */}
                  <p>19:10</p>
                </div>
              </div>
            </div>

            <hr />

            <div className="my-6 grid grid-cols-[auto,1fr]">
              {/* avatar icon */}
              <div className="mr-8 w-auto">
                <img
                  src="/assets/default-avatar.png"
                  alt="default avatar background"
                  className="absolute z-10 ml-4 h-9 w-9"
                />
                <img
                  src="/assets/default-avatar-bg.png"
                  alt="default avatar"
                  className="h-9 w-9"
                />
              </div>

              {/* message header */}
              <div className="flex">
                <div className="w-9 flex-grow text-secondary">
                  {/* mail header */}
                  <p className="text-[16px] font-bold text-main">
                    8405-Diana SALAZAR MUNGUIA
                  </p>
                  {/* sender */}
                  <p className="text-[14px] font-bold">Cameron Phillips :</p>
                  {/* message */}
                  <p className="text-[14px]">
                    I understand your initial concerns and thats very valid,
                    Elizabeth. But you ...
                    {/* add limitation for message later, that '...' is a max length bro */}
                  </p>
                </div>

                <div className="flex gap-3 text-[14px]">
                  {/* date */}
                  <p>02/06/2021</p>
                  {/* time */}
                  <p>19:10</p>
                </div>
              </div>
            </div>

            <hr />

            <div
              className="my-6 grid cursor-pointer grid-cols-[auto,1fr]"
              onClick={handleInboxSingleClick}
            >
              {/* avatar icon */}
              <div className="relative mr-16 w-auto">
                <div className="absolute flex h-9 w-9 items-center justify-center rounded-full bg-main">
                  <p className="font-bold text-white">F</p>
                </div>
              </div>

              {/* message header */}
              <div className="flex">
                <div className="w-9 flex-grow text-secondary">
                  {/* sender */}
                  <p className="text-[16px] font-bold text-main">
                    FastVisa Support
                  </p>
                  {/* message */}
                  <p className="text-[14px]">
                    Hey there! Welcome to your inbox.
                  </p>
                </div>

                <div className="flex gap-3 text-[14px]">
                  {/* date */}
                  <p>02/06/2021</p>
                  {/* time */}
                  <p>19:10</p>
                </div>
              </div>
            </div>
            {showInboxSingle && <InboxDetailSingle />}
          </>
        )}
      </div>
    </div>
  );
};

export default InboxView;
