'use client'
import React, { useState, useEffect } from "react";
import SearchBar from "./component/SearchBar";
import ButtonContainer from "./component/button/ButtonContainer";

const Home: React.FC = () => {
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <main className="font-Lato">
      <div className="w-screen h-screen relative overflow-hidden">
        {showImage && (
          <div className="relative w-full h-full z-20">
            <img
              src="assets/Cover.png"
              alt="Cover Image"
              className="w-full h-full object-cover transition-opacity opacity-100 absolute top-0 left-0"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            </div>
          </div>
        )}
        <div className="border-l-2 border-white w-4/5 ml-auto h-full relative z-10">
          <SearchBar />
          {/* button icon section */}
          <ButtonContainer />
          {/* button icon section */}
        </div>
      </div>
    </main>
  );
        }

export default Home;