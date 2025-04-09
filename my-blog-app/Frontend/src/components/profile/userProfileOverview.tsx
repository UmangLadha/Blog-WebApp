import React from "react";
import UserWrittenBlogs from "./elements/UserWrittenBlogs";
import LoggedInUserDetails from "./elements/LoggedInUserDetails";

const UserProfileOverview = () => {
  return (
    <div className="w-[95%] h-full mx-auto py-10 mt-4 flex flex-col sm:flex-wrap justify-between items-start gap-4 md:flex-nowrap md:flex md:flex-row-reverse ">
      <LoggedInUserDetails />
      <UserWrittenBlogs />
    </div>
  );
};

export { UserProfileOverview };
