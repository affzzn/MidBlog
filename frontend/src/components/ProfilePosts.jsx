import React from "react";

function ProfilePosts() {
  return (
    <div className="w-full flex mt-8 space-x-4">
      {/* left */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img
          src="https://ioflood.com/blog/wp-content/uploads/2023/10/java_logo_dice_random-300x300.jpg.webp"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* right */}

      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          Java Programming
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@affzzn</p>
          <div className="flex space-x-2 text-sm">
            {/* <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
          <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p> */}
          </div>
        </div>
        <p className="text-sm md:text-lg">
          {/* {post.desc.slice(0, 200) + " ...Read more"} */}
        </p>
      </div>
    </div>
  );
}

export default ProfilePosts;
