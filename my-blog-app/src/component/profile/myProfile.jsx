import React from "react";
import MyBlogSection from "./elements/myBlogSection";
import UserProfileSection from "./elements/userProfileSection";

const MyProfile = () => {

  return (
    <div className="w-11/12 mx-auto mt-10 flex flex-col flex-grow sm:flex-wrap justify-between items-start gap-4 md:flex-nowrap md:flex md:flex-row-reverse ">
	  <UserProfileSection />
      <MyBlogSection />
    </div>
  );
};

export { MyProfile };
