import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { MdDelete } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../url";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function EditPost() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${URL}/api/posts/${id}`);
      console.log(response.data);
      setTitle(response.data.title);
      setDesc(response.data.desc);
      setFile(response.data.photo);
      setCatArr(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const [cat, setCat] = useState("");
  const [catArr, setCatArr] = useState(["Tech", "AI", "ML", "DL", "Web Dev"]);

  const addCategory = () => {
    setCatArr([...catArr, cat]);
    setCat("");
  };
  const deleteCategory = (i) => {
    let updatedCats = catArr.filter((c, index) => index !== i);
    setCatArr(updatedCats);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: catArr,
    };

    //image upload

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;
      try {
        const imgUpload = await axios.post(`${URL}/api/upload`, data);
        console.log(imgUpload.data);
      } catch (error) {
        console.log(error);
      }
    }

    // post create

    try {
      const response = await axios.put(`${URL}/api/posts/${id}`, post, {
        withCredentials: true,
      });
      console.log(response.data);
      navigate(`/posts/post/${response.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl ">Edit a post</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Enter post title"
            className="px-4 py-2 outline-none"
          />
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            className="px-4"
          />
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="px-4 py-2 outline-none"
                placeholder="Enter post category"
                type="text"
              />
              <div
                onClick={addCategory}
                className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
              >
                Add
              </div>
            </div>

            {/* categories */}
            <div className="flex px-4 mt-3">
              {catArr?.map((c, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
                >
                  <p>{c}</p>
                  <p
                    onClick={() => deleteCategory(i)}
                    className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            rows={15}
            cols={30}
            className="px-4 py-2 outline-none"
            placeholder="Enter post description"
          />
          <button
            onClick={handleUpdate}
            className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
          >
            Update
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default EditPost;
