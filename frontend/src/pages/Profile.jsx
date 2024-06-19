import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ProfilePosts from "../components/ProfilePosts";

function Profile() {
  return (
    <div>
      <NavBar />
      <div className="min-h-[80vh] px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
        <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
          <ProfilePosts />
        </div>
        <div div className=" flex flex-col space-y-4 items-start"></div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
