import { useEffect, useState } from "react";
import { useFrontend } from "src/state/frontend";

import { AnimatePresence, motion } from "framer-motion";
import { FaClock } from "react-icons/fa6";
import moment from "moment";

const FeaturedShop = () => {
  const [selected, setSelected] = useState(0);
  const featured = useFrontend((state) => state.shop.featured);
  const flat = featured.content.flat();

  useEffect(() => {
    if (flat.length === 0) return;
    const interval = setInterval(() => {
      setSelected((s) => (s + 1) % flat.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [selected, flat]);

  if (flat.length === 0) return null;
  const entry = flat[selected];

  return (
    <div className="featured-shop-wrapper right">
      <div className={`featured-shop ${entry.item.rarity}`}>
        <AnimatePresence>
          {flat.length > 0 && entry !== null && (
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
                x: -250,
                opacity: 0,
              }}
              transition={{
                type: "spring",
                bounce: 0.4,
              }}
              className="shop-animate-event"
              key={entry.item.name}
            >
              <div className="typeAndTime">
                <label className="itemType">
                  {entry.item.rarity.toUpperCase()} OUTFIT
                </label>
                <label className="itemTime">
                  <FaClock />
                  {moment(featured.expires_at).fromNow()}
                </label>
              </div>
              <motion.div
                initial={{
                  x: 150,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.1,
                }}
                className="cosmetic"
              >
                <h2 className="name">{entry.item.name}</h2>
                <small className="description">{entry.item.description}</small>
                <img
                  src={entry.item.featured_image}
                  alt={entry.item.name}
                  className="image"
                  draggable={false}
                />
              </motion.div>
              <motion.div
                initial={{
                  x: 150,
                  scale: 0.95,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.6,
                }}
                className="purchase"
              >
                <img
                  src="https://image.fnbr.co/price/icon_vbucks_50x.png"
                  alt="vbuck"
                  className="vbucker"
                  draggable={false}
                />
                <span>
                  <p>0</p>
                  <p>/</p>
                  <strong>{entry.price}</strong>
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="selector">
        {flat.map((_, index) => (
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

export default FeaturedShop;
