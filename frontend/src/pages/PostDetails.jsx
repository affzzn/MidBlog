import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { IF } from "../url";
import Comment from "../components/Comment";

function PostDetails() {
  const { id } = useParams();
  // console.log("id is: " + postId);
  const [post, setPost] = useState({});

  const { user } = useContext(UserContext);

  const [commentArr, setCommentArr] = useState([]);

  const [comment, setComment] = useState("");

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

  const navigate = useNavigate();

  const handleDeletePost = async () => {
    try {
      await axios.delete(`${URL}/api/posts/${id}`, { withCredentials: true });
      console.log("Post has been deleted");
      navigate("http://localhost:5173/");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPostComments = async () => {
    try {
      const response = await axios.get(`${URL}/api/comments/post/${id}`);
      console.log(response.data);
      setCommentArr(response.data);
    } catch (error) {
      console.log("error is: " + error);
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, []);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${URL}/api/comments/create`,
        {
          comment: comment,
          author: user.username,
          postId: id,
          userId: user._id,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      fetchPostComments();
      setComment("");
    } catch (error) {
      console.log("error is: " + error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="px-8 md:px-[200px] mt-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black">{post?.title}</h1>
          {user?._id === post?.userId && (
            <div className="flex items-center justify-center space-x-2">
              <p
                className="cursor-pointer"
                onClick={() => navigate(`/edit/${id}`)}
              >
                <BiEdit />
              </p>
              <p className="cursor-pointer" onClick={handleDeletePost}>
                <MdDelete />
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mt-2 md:mt-4">
          <p>@{post?.username}</p>
          <div className="flex space-x-2 text-sm">
            <p>{new Date(post?.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post?.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>

        <img src={IF + post?.photo} alt="" className="w-full mx-auto mt-8 " />
        <p className="mx-auto mt-8">{post?.desc}</p>
        <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories:</p>
          <div className="flex justify-center items-center space-x-2">
            {post?.categories?.map((c, i) => {
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

          {commentArr?.map((c, i) => (
            <Comment key={i} c={c} post={post} />
          ))}
        </div>

        {/* write a comment */}
        <div className="w-full flex flex-col mt-4 md:flex-row">
          <input
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Write a comment"
            className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"
          />
          <button
            onClick={postComment}
            className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0"
          >
            Post Comment
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PostDetails;
