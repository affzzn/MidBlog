import React, { useContext } from "react";
import HomePost from "../components/HomePost";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios";
import { URL } from "../url";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Home() {
  const [posts, setPosts] = useState([]);

  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(URL + "/api/posts/");
      console.log(response.data);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <NavBar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {posts.map((p) => (
          <Link to={user ? `posts/post/${p._id}` : "/"}>
            <HomePost key={p._id} post={p} />
          </Link>
        ))}
      </div>

      <Footer />
    </>
  );
}

export default Home;
