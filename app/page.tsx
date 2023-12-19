import React from "react";
import SearchBar from "./component/SearchBar";
import ButtonContainer from "./component/button/ButtonContainer";

const Home: React.FC = () => {
  return (
    <main className="font-Lato">
      <div className='border-l-2 border-white w-4/5 ml-auto h-screen'>
        <SearchBar />
        {/* button icon section */}
        <ButtonContainer />
        {/* button icon section */}
      </div>
    </main>
  );
}

export default Home;