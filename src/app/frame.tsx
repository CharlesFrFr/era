import { appWindow } from "@tauri-apps/api/window";
import { useEffect } from "react";
import { useFrontend } from "src/state/frontend";
import { useMe } from "src/state/me";
import { useSocket } from "src/state/socket";

import { HiMinus, HiX } from "react-icons/hi";
import "src/styles/frame.css";

type FrameProps = {
  children: React.ReactNode;
};

const TauriFrame = (props: FrameProps) => {
  const loadFrontend = useFrontend((state) => state.load);
  const loadUser = useMe((state) => state.load);
  const loadSocket = useSocket((state) => state.connect);
  useEffect(() => {
    loadUser();
    loadFrontend();
    loadSocket();
  }, []);

  return (
    <main className="frame">
      <nav data-tauri-drag-region>
        <span className="title">ERA</span>
        <s />
        <button onClick={() => appWindow.minimize()}>
          <HiMinus />
        </button>
        <button onClick={() => appWindow.close()}>
          <HiX />
        </button>
      </nav>
      <div className="children">{props.children}</div>
    </main>
  );
};

export default TauriFrame;
