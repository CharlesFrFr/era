import { appWindow } from "@tauri-apps/api/window";
import { useEffect } from "react";

import { HiMinus, HiX } from "react-icons/hi";
import { useFrontend } from "src/state/frontend";
import "src/styles/frame.css";

type FrameProps = {
  children: React.ReactNode;
};

const TauriFrame = (props: FrameProps) => {
  const load = useFrontend((state) => state.load);
  useEffect(() => {
    load();
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
