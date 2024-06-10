import React from "react";
import HomePost from "../components/HomePost";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <NavBar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        <HomePost />
        <HomePost />
        <HomePost />
        <HomePost />
        <HomePost />
        <HomePost />
        <HomePost />
      </div>

      <Footer />
    </>
  );
}

export default Home;
