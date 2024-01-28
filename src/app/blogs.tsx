import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSuspenseQuery } from "@tanstack/react-query";
import moment from "moment";

import { FaExternalLinkAlt } from "react-icons/fa";
import {
  FaEye,
  FaNewspaper,
  FaFire,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import "src/styles/blogs.css";
import { queryBlogs } from "src/external/wrapper";

enum ScrollPosition {
  Left = "left",
  Centre = "centre",
  Right = "right",
}

const Blogs = () => {
  const container = useRef<HTMLDivElement>(null);
  const [scrollPosition, move] = useState<ScrollPosition>(ScrollPosition.Left);

  const { data: blogs } = useSuspenseQuery({
    queryKey: ["blogs"],
    queryFn: queryBlogs,
  });

  const handleOnScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const target = e.target as HTMLDivElement;
    const { scrollLeft, scrollWidth, clientWidth } = target;

    if (scrollLeft === 0) {
      move(ScrollPosition.Left);
    } else if (scrollLeft + clientWidth === scrollWidth) {
      move(ScrollPosition.Right);
    } else {
      move(ScrollPosition.Centre);
    }
  };

  if (blogs.length < 1 || !blogs) return null;

  return (
    <div className={`blogs-wrapper ${scrollPosition}`}>
      <header>
        <div className="icon">
          <FaNewspaper />
        </div>
        <h2>News and Updates</h2>
      </header>
      <motion.div
        className="blogs-container"
        ref={container}
        onScroll={handleOnScroll}
        animate="visible"
        initial="hidden"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        {blogs.map((blog) => (
          <motion.div
            className="blog"
            key={blog.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="overlay">
              <img src={blog.image} alt="" />
            </div>
            <div className="hover-content">
              <div className="tags">
                {moment(blog.inserted_at)
                  .add(7, "day")
                  .isAfter(moment(new Date())) && (
                  <p className="fire">
                    <FaFire />
                    NEW
                  </p>
                )}
                <p>
                  <FaEye />
                  {blog.views}
                </p>
                {blog.tags.map((tag) => (
                  <p key={tag}>{tag}</p>
                ))}
              </div>
              <h1>{blog.header.toLowerCase()}</h1>
              <span className="small">
                By {blog.author.replace(/\[[^\]]+\]/g, "").trim()}
              </span>
              <div className="external-link">
                <FaExternalLinkAlt />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {scrollPosition !== ScrollPosition.Right && (
        <div
          className="scrollIndicator right"
          onClick={() => (container.current!.scrollLeft += 350)}
        >
          <FaChevronRight />
        </div>
      )}

      {scrollPosition !== ScrollPosition.Left && (
        <div
          className="scrollIndicator left"
          onClick={() => (container.current!.scrollLeft -= 350)}
        >
          <FaChevronLeft />
        </div>
      )}
    </div>
  );
};

export default Blogs;
