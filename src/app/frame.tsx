import "src/styles/frame.css";

type FrameProps = {
  children: React.ReactNode;
};

const TauriFrame = (props: FrameProps) => {
  return (
    <main className="frame">
      <nav data-tauri-drag-region>
        <span className="title">ERA</span>
      </nav>
      <div className="children">{props.children}</div>
    </main>
  );
};

export default TauriFrame;
