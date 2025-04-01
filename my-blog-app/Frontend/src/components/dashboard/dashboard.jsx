import React  from "react";
import { MostPopularBlog } from "./elements/mostPopularBlog";
// import RecentBlogs from "./elements/recentBlogs";

const Dashboard = () => {

  return(
    <>
      <MostPopularBlog />
	  <hr />
	  {/* <RecentBlogs /> */}
    </>
  );
};

export { Dashboard };
