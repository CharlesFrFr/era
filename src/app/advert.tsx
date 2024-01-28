import { useSocket } from "src/state/socket";
import { useAdverts } from "src/state/adverts";

import { HiX } from "react-icons/hi";
import Markdown from "react-markdown";
import "src/styles/advert.css";

const Advert = () => {
  const adverts = useAdverts();
  const sockets = useSocket((state) => state.sockets);

  return (
    <>
      {Object.values(adverts.adverts).map((advert) => (
        <Advertisement advert={advert} key={advert.id} />
      ))}
      {(!sockets.has("main") || sockets.get("main") === null) && (
        <div className="banner socket">
          <p>
            <b>Socket Disconnected!</b> You will not receive any live updates
            until you reconnect.
          </p>
        </div>
      )}
    </>
  );
};

type AdvertisementProps = {
  advert: Advert;
};

const Advertisement = (props: AdvertisementProps) => {
  const close = useAdverts((s) => s.close);

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `radial-gradient(
        circle at 50% -50%,
        ${props.advert.c1} 0%,
        ${props.advert.c2} 100%
      )`,
      }}
    >
      <Markdown>{props.advert.title}</Markdown>
      <s></s>
      {props.advert.closeable && (
        <button className="close" onClick={() => close(props.advert.id)}>
          <HiX />
        </button>
      )}
    </div>
  );
};

export default Advert;
