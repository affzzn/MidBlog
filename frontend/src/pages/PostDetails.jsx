import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";

function PostDetails() {
  const { id } = useParams();
  // console.log("id is: " + postId);
  const [post, setPost] = useState({});

  const { user } = useContext(UserContext);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${URL}/api/posts/${id}`);
      console.log(response.data);
      setPost(response.data);
    } catch (error) {
      console.log("error is: " + error);
    }
  };
  useEffect(() => {
    if (id) {
      fetchPost();
    } else {
      console.error("Post ID is undefined");
    }
  }, [id]);

  return (
    <>
      <NavBar />
      <div className="px-8 md:px-[200px] mt-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black">{post.title}</h1>
          {user?._id == post?.userId && (
            <div className="flex items-center justify-center space-x-2">
              <p>
                <BiEdit />
              </p>
              <p>
                <MdDelete />
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mt-2 md:mt-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2 text-sm">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>

        <img src={post.photo} alt="" className="w-full mx-auto mt-8 " />
        <p className="mx-auto mt-8">{post.desc}</p>
        <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories:</p>
          <div className="flex justify-center items-center space-x-2">
            {post.categories?.map((c, i) => {
              return (
                <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">
                  {c}
                </div>
              );
            })}
          </div>
        </div>

        {/* comments */}

        <div>
          <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>

          {/* each comment */}
          <div className="px-2 py-2 bg-gray-200 rounded-lg mt-2 my-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-600">@affzzn</h3>
              <div className="flex justify-center items-center space-x-4">
                <p className="text-gray-500 text-sm">10/05/2024</p>
                <p className="text-gray-500 text-sm">15:44</p>
                <div className="flex items-center justify-center space-x-2">
                  <p>
                    <BiEdit />
                  </p>
                  <p>
                    <MdDelete />
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-2 px-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptates, quod, quae voluptate, quos quas dolores tempora
              voluptatum quia distinctio doloribus.
            </p>
          </div>
          <div className="px-2 py-2 bg-gray-200 rounded-lg mt-2 my-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-600">@affzzn</h3>
              <div className="flex justify-center items-center space-x-4">
                <p className="text-gray-500 text-sm">10/05/2024</p>
                <p className="text-gray-500 text-sm">15:44</p>
                <div className="flex items-center justify-center space-x-2">
                  <p>
                    <BiEdit />
                  </p>
                  <p>
                    <MdDelete />
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-2 px-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptates, quod, quae voluptate, quos quas dolores tempora
              voluptatum quia distinctio doloribus.
            </p>
          </div>
        </div>

        {/* write a comment */}
        <div className="w-full flex flex-col mt-4 md:flex-row">
          <input
            type="text"
            placeholder="Write a comment"
            className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"
          />
          <button className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0">
            Add Comment
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PostDetails;
