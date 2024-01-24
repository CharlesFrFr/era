import { useState } from "react";
import { useFrontend } from "src/state/frontend";

import { FaClock } from "react-icons/fa6";
import "src/styles/featured.css";

import { AnimatePresence, motion } from "framer-motion";
import FeaturedBanner from "./banner";

const FeaturedNews = () => {
  return (
    <section className="featured">
      <EventWrapper />
      <FeaturedShop />
    </section>
  );
};

const EventWrapper = () => {
  const [selected, setSelected] = useState(1);
  const banners = useFrontend((state) => state.banners);

  return (
    <div className="featured-event-wrapper left">
      <AnimatePresence>
        {banners.length > 0 && banners[selected] !== null && (
          <motion.div
            initial={{
              x: 150,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: -150,
              opacity: 0,
            }}
            className="animate-event left"
            key={banners[selected].banner.meta.blurhash}
          >
            <FeaturedBanner banner={banners[selected]} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="selector">
        {banners.map((_, index) => (
          <button
            className={`selector-item ${index === selected ? "active" : ""}`}
            onClick={() => setSelected(index)}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

const FeaturedShop = () => {
  return (
    <div className="featured-shop right legendary">
      <div className="typeAndTime">
        <label className="itemType">LEGENDARY OUTFIT</label>
        <label className="itemTime">
          <FaClock />
          23:59:59
        </label>
      </div>

      <div className="cosmetic">
        <h2 className="name">Omen</h2>
        <small className="description">Your victory has been foretold.</small>
        <img
          src="https://fortnite-api.com/images/cosmetics/br/cid_141_athena_commando_m_darkeagle/featured.png"
          alt="Omen"
          className="image"
        />
      </div>
    </div>
  );
};

export default FeaturedNews;
