import { useGlobal } from "src/state/persist";
import { useShallow } from "zustand/react/shallow";

import { HiX } from "react-icons/hi";
import "src/styles/banner.css";

const Advert = () => {
  const [visible, setVisible] = useGlobal(
    useShallow((state) => [state.advert, state.closeAdvert])
  );
  if (!visible) return null;

  return (
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
  );
};

export default Advert;
