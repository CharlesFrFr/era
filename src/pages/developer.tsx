import { invoke } from "@tauri-apps/api";
import { useQueryClient } from "@tanstack/react-query";
import { useToken } from "src/state/token";

const Developer = () => {
  const { token, setToken, working } = useToken();

  const queryClient = useQueryClient();
  const clearCache = () => {
    queryClient.clear();
  };

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  const downloadFile = async () => {
    const result = await invoke<string>("download", {
      request: {
        url: "https://raw.githubusercontent.com/ectrc/snow/master/readme.md",
        file_path: "readme.md",
        expected_size: 1421,
      },
    });
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

        <button className="button" onClick={downloadFile}>
          download test file
        </button>

        <p>{working ? "TOKEN IS LIVE AND WORKING" : "not working"}</p>
      </div>
    </>
  );
};

export default Developer;
