import { useEffect, useState } from "react";
import { queryShop, queryUser } from "src/external/wrapper";
import { useSuspenseQuery } from "@tanstack/react-query";
import moment from "moment";

import "src/styles/shop.css";

const Shop = () => {
  const [dateNow, setDateNow] = useState(Date.now());
  const { data: store } = useSuspenseQuery({
    queryKey: ["shop"],
    queryFn: queryShop,
  });

  const { data: me } = useSuspenseQuery({
    queryKey: ["me"],
    queryFn: queryUser,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDateNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const featuredDays = moment(store.featured.expires_at).diff(dateNow, "days");
  const featuredHours = moment(store.featured.expires_at).diff(
    dateNow,
    "hours"
  );
  const featuredMinutes = moment(store.featured.expires_at).diff(
    dateNow,
    "minutes"
  );

  return (
    <div className="store-container">
      <div className="currency">
        <img
          src="https://image.fnbr.co/price/icon_vbucks_50x.png"
          alt="vbuck"
          className="vbuck"
          draggable={false}
        />
        <span className="price">
          {me.currency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </span>
      </div>
      <div className="store-wrapper">
        <div className="store weekly">
          <header>
            <h3>FEATURED</h3>
            <s />
            <time>
              {featuredDays > 0
                ? `${featuredDays} Days`
                : featuredHours > 0
                ? `${featuredHours} Hours`
                : `${featuredMinutes} Minutes`}
            </time>
          </header>
          <div className="items">
            {store.featured.content.map((item) => (
              <WeeklyItem item={item} key={item[0].item.name} />
            ))}
          </div>
        </div>

        <div className="store daily">
          <header>
            <h3>DAILY</h3>
            <s />
            <time>
              {moment(store.featured.expires_at)
                .add(-1 * dateNow)
                .format("hh:mm:ss")}
            </time>
          </header>
          <div className="items">
            {store.daily.content[0].map((item) => (
              <DialyItem item={item} key={item.item.name} />
            ))}
          </div>
        </div>
      </div>
      <div className="notice">
        <strong>NOTE:</strong>
        <p>These items are cosmetic only and grant no competitive advantage.</p>
      </div>
      <p>{store.unique}</p>
    </div>
  );
};

type WeeklyItemProps = {
  item: ShopEntry;
};

const WeeklyItem = (props: WeeklyItemProps) => {
  const [idx, _] = useState(0);
  const selected = props.item[idx];

  return (
    <section className="item">
      <div className="image">
        <img
          src={selected.item.featured_image}
          alt={selected.item.name}
          draggable={false}
        />
      </div>
      <div className="describe">
        <h2>{selected.item.name}</h2>
        <div className="prices">
          <img
            src="https://image.fnbr.co/price/icon_vbucks_50x.png"
            alt="vbuck"
            className="vbuck"
            draggable={false}
          />
          <span className="price">
            {selected.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
        </div>
      </div>
    </section>
  );
};

type DailyItemProps = {
  item: ShopEntry[0];
};

const DialyItem = (props: DailyItemProps) => {
  return (
    <section className="item">
      <div className="image">
        <img
          src={props.item.item.image}
          alt={props.item.item.name}
          draggable={false}
        />
      </div>
      <div className="describe">
        <h2>{props.item.item.name}</h2>
        <div className="prices">
          <img
            src="https://image.fnbr.co/price/icon_vbucks_50x.png"
            alt="vbuck"
            className="vbuck"
            draggable={false}
          />
          <span className="price">
            {props.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Shop;
