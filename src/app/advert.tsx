import { useGlobal } from "src/state/persist";
import { useShallow } from "zustand/react/shallow";

import { HiX } from "react-icons/hi";
import "src/styles/banner.css";
import { useSocket } from "src/state/socket";

const Advert = () => {
  const [visible, setVisible] = useGlobal(
    useShallow((state) => [state.advert, state.closeAdvert])
  );

  const sockets = useSocket((state) => state.sockets);

  return (
    <>
      {visible && (
        <div className="banner">
          <p>
            <b>Note!</b> You can download the publicly available version{" "}
            <code>7.40-CL-5046157</code>
          </p>
          <s></s>
          <button className="close" onClick={() => setVisible(false)}>
            <HiX />
          </button>
        </div>
      )}
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

export default Advert;
