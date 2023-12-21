"use client";
import React, { useState, useEffect } from "react";
import SearchBar from "./component/SearchBar";
import ButtonContainer from "./component/button/ButtonContainer";

const Home: React.FC = () => {
  const [showImage, setShowImage] = useState(true);

   useEffect(() => {
    const isImageShown = localStorage.getItem("showImage");

    if (!isImageShown) {
      setShowImage(true);
      // Set a timeout to hide the image
      const timeoutId = setTimeout(() => {
        setShowImage(false);
        sessionStorage.setItem("showImage", "false");
        localStorage.setItem("showImage", "false");
      }, 1500);
      return () => clearTimeout(timeoutId);
    } else {
      setShowImage(false);
    }
  }, []);

  return (
    <main className="container m-auto font-Lato">
      <div className="relative h-screen w-screen overflow-hidden">
        {showImage && (
          <div className="relative z-20 h-full w-full">
            <img
              src="assets/Cover.png"
              alt="Cover Image"
              className="absolute left-0 top-0 h-full w-full object-cover opacity-100 transition-opacity"
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"></div>
          </div>
        )}
        <div className="relative z-10 ml-auto h-full w-4/5 border-l-2 border-white">
          <SearchBar />
          {/* button icon section */}
          <ButtonContainer />
          {/* button icon section */}
        </div>
      </div>
    </main>
  );
};

export default Home;
