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
        <img
          src="assets/search.png"
          alt="Search"
          className={styles.searchIcon}
        />
        <input
          type="text"
          placeholder="Search"
          className={styles.searchInput}
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
