'use client'
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

      // Simulasi pengambilan data dari server
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Lakukan pengambilan data atau operasi lainnya di sini

      setIsLoading(false);
    };

    fetchData();
  }, []);
  return (
    <div className='h-[80vh] w-[734px] bg-white fixed bottom-24 right-4 px-[34px] pt-5 shadow-md tracking-wide z-[60]'>
      {/* search bar */}
      <div
        className={`${styles.searchBar} px-10`}
      >
        <img
          src='assets/search.png'
          alt='Search'
          className={styles.searchIcon}
        />
        <input
          type='text'
          placeholder='Search'
          className={styles.searchInput}
        />
      </div>

      {/* message area */}
      <div className='message-container'>
        {isLoading ? (
          <LoadingIndicator loadingText={"Loading Chats"} />
        ) : (
          <>
          {/* inbox detail */}
          <div className='my-6 flex cursor-pointer' onClick={handleInboxDetailClick}>
            {/* avatar icon */}
            <div className='w-auto mr-8'>
              <img
                src='/assets/default-avatar.png'
                alt='default avatar background'
                className='absolute ml-4 h-9 w-9 z-10'
              />
              <img
                src='/assets/default-avatar-bg.png'
                alt='default avatar'
                className='h-9 w-9'
              />
            </div>
  
            {/* message header */}
            <div className='flex gap-4'>
              <div className='text-secondary'>
                {/* group name */}
                <p className='font-bold text-[16px] text-main'>
                  109220-Naturalization
                </p>
                {/* sender info */}
                <p className='font-bold text-[14px]'>
                  Cameron Phillips :
                </p>
                <p className='text-[14px]'>
                  Please check this out!
                </p>
              </div>
  
              <div className='flex gap-3 text-[14px]'>
                {/* date */}
                <p>January 1, 2021</p>
                {/* time */}
                <p>19:10</p>
              </div>
            </div>
          </div>
          {showInboxDetail && <InboxDetailGroup />}
  
  
          <hr />
  
          <div className='my-6 grid grid-cols-[auto,1fr]'>
            {/* avatar icon */}
            <div className='w-auto mr-8'>
              <img
                src='/assets/default-avatar.png'
                alt='default avatar background'
                className='absolute ml-4 h-9 w-9 z-10'
              />
              <img
                src='/assets/default-avatar-bg.png'
                alt='default avatar'
                className='h-9 w-9'
              />
            </div>
  
            {/* message header */}
            <div className='flex'>
              <div className='flex-grow w-9 text-secondary'>
                {/* group name */}
                <p className='font-bold text-[16px] text-main'>
                  Jeannette Moraima Guaasdasdman
                  Chamba (Hutto I-589) [ Hutto
                  Follow Up - Brief Service ]
                </p>
                {/* sender info */}
                <p className='font-bold text-[14px]'>
                  Ellen :
                </p>
                {/* message */}
                <p className='text-[14px]'>
                  Hey please read!
                </p>
              </div>
  
              <div className='flex gap-3 text-[14px]'>
                {/* date */}
                <p>02/06/2021</p>
                {/* time */}
                <p>19:10</p>
              </div>
            </div>
          </div>
  
          <hr />
  
          <div className='my-6 grid grid-cols-[auto,1fr]'>
            {/* avatar icon */}
            <div className='w-auto mr-8'>
              <img
                src='/assets/default-avatar.png'
                alt='default avatar background'
                className='absolute ml-4 h-9 w-9 z-10'
              />
              <img
                src='/assets/default-avatar-bg.png'
                alt='default avatar'
                className='h-9 w-9'
              />
            </div>
  
            {/* message header */}
            <div className='flex'>
              <div className='flex-grow w-9 text-secondary'>
                {/* mail header */}
                <p className='font-bold text-[16px] text-main'>
                  8405-Diana SALAZAR MUNGUIA
                </p>
                {/* sender */}
                <p className='font-bold text-[14px]'>
                  Cameron Phillips :
                </p>
                {/* message */}
                <p className='text-[14px]'>
                  I understand your initial concerns
                  and thats very valid, Elizabeth.
                  But you ...
                  {/* add limitation for message later, that '...' is a max length bro */}
                </p>
              </div>
  
              <div className='flex gap-3 text-[14px]'>
                {/* date */}
                <p>02/06/2021</p>
                {/* time */}
                <p>19:10</p>
              </div>
            </div>
          </div>
  
          <hr />
  
          <div className='my-6 grid grid-cols-[auto,1fr] cursor-pointer' onClick={handleInboxSingleClick}>
            {/* avatar icon */}
            <div className='w-auto mr-16 relative'>
              <div className='absolute h-9 w-9 bg-main rounded-full flex items-center justify-center'>
                <p className='text-white font-bold'>
                  F
                </p>
              </div>
            </div>
  
            {/* message header */}
            <div className='flex'>
              <div className='flex-grow w-9 text-secondary'>
                {/* sender */}
                <p className='font-bold text-[16px] text-main'>
                  FastVisa Support
                </p>
                {/* message */}
                <p className='text-[14px]'>
                  Hey there! Welcome to your inbox.
                </p>
              </div>
  
              <div className='flex gap-3 text-[14px]'>
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
