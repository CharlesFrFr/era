import { FaClock } from "react-icons/fa6";
import "src/styles/featured.css";

const FeaturedNews = () => {
  return (
    <section className="featured">
      <div className="left">hello</div>
      <FeaturedShop />
    </section>
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
