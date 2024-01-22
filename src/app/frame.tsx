import { appWindow } from "@tauri-apps/api/window";

import { HiMinus, HiX } from "react-icons/hi";
import "src/styles/frame.css";

type FrameProps = {
  children: React.ReactNode;
};

const TauriFrame = (props: FrameProps) => {
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
