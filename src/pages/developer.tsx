import { useToken } from "src/state/me";

const Developer = () => {
  const { token, setToken } = useToken();

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
          onChange={(e) => setToken(e.target.value)}
        />
      </div>
    </>
  );
};

export default Developer;
