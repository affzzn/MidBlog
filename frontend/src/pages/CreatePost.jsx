import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { MdDelete } from "react-icons/md";

function CreatePost() {
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState(["Tech", "AI", "ML", "DL", "Web Dev"]);

  const addCategory = () => {};
  const removeCategory = () => {};

  return (
    <div>
      <div>
        <NavBar />
        <div className="px-6 md:px-[200px] mt-8">
          <h1 className="font-bold md:text-2xl text-xl ">Create a post</h1>
          <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
            <input
              type="text"
              placeholder="Enter post title"
              className="px-4 py-2 outline-none"
            />
            <input type="file" className="px-4" />
            <div className="flex flex-col">
              <div className="flex items-center space-x-4 md:space-x-8">
                <input
                  className="px-4 py-2 outline-none"
                  placeholder="Enter post category"
                  type="text"
                />
                <div
                  //   onClick={addCategory}
                  className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
                >
                  Add
                </div>
              </div>

              {/* categories */}
              <div className="flex px-4 mt-3">
                {/* cats */}
                <div>
                  <p>Tech</p>
                  <p
                    // onClick={removeCategory}
                    className="bg-red-500 text-white px-2 py-1 rounded-full font-semibold cursor-pointer"
                  >
                    X
                  </p>
                </div>
                <div>
                  <p>Tech</p>
                  <p
                    // onClick={removeCategory}
                    className="bg-red-500 text-white px-2 py-1 rounded-full font-semibold cursor-pointer"
                  >
                    X
                  </p>
                </div>
              </div>
            </div>
            <textarea
              rows={15}
              cols={30}
              className="px-4 py-2 outline-none"
              placeholder="Enter post description"
            />
            <button className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg">
              Create
            </button>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default CreatePost;
