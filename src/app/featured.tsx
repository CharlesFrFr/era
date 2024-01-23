import { FaClock } from "react-icons/fa6";
import "src/styles/featured.css";

const FeaturedNews = () => {
  return (
    <section className="featured">
      <FeaturedEvent />
      <FeaturedShop />
    </section>
  );
};

const FeaturedEvent = () => {
  return (
    <div className="featured-event left blue-theme">
      <div className="information">
        <span className="header">Practise Event - Daily Trials</span>
        <h2 className="title">PRACTICE TOURNAMENT SOLO</h2>
        <p className="description">
          Queue up in a tournament to test your skill! Score at least 20 points
          in a session to earn 3000 V-Bucks!
        </p>
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
