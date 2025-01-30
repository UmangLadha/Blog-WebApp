import React from "react";
import MyBlogSection from "./elements/myBlogSection";
import UserProfileSection from "./elements/userProfileSection";

const MyProfile = () => {

  return (
    <div className="w-[95%] h-full mx-auto py-10 mt-4 flex flex-col sm:flex-wrap justify-between items-start gap-4 md:flex-nowrap md:flex md:flex-row-reverse ">
	  <UserProfileSection />
      <MyBlogSection />
    </div>
  );
};

export { MyProfile };
