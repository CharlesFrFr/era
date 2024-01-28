import { useQueryClient } from "@tanstack/react-query";
import { useToken } from "src/state/me";

const Developer = () => {
  const { token, setToken } = useToken();

  const queryClient = useQueryClient();
  const clearCache = () => {
    queryClient.clear();
  };

  const clearLocalStorage = () => {
    localStorage.clear();
  };

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

        <button className="button" onClick={clearCache}>
          clear cache
        </button>

        <button className="button" onClick={clearLocalStorage}>
          clear local storage
        </button>
      </div>
    </>
  );
};

export default Developer;
