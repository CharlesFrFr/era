import { useFrontend } from "src/state/frontend";
import { useMe } from "src/state/me";
import { useShallow } from "zustand/react/shallow";

const Developer = () => {
  const [token, setToken] = useMe(
    useShallow((state) => [state.auth, state.setAuthInput])
  );

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
