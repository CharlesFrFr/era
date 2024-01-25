import { useFrontend } from "src/state/frontend";
import { useToken } from "src/state/me";

const Developer = () => {
  const { token, setToken } = useToken();
  const load = useFrontend((state) => state.load);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
        }}
      >
        <label>era auth token</label>
        <input
          type="text"
          value={token}
          onChange={(e) => {
            setToken(e.target.value);
            load();
          }}
        />
      </div>
    </>
  );
};

export default Developer;
