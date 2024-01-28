import { Suspense } from "react";
import UserStats from "src/app/stats";
import FeaturedNews from "src/app/featured";
import Blogs from "src/app/blogs";

const Home = () => {
  return (
    <>
      <Suspense fallback={null}>
        <UserStats />
        <FeaturedNews />
        <Blogs />
      </Suspense>
    </>
  );
};

export default Home;
