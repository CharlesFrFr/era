import { QueryClient } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";

import App from "src/app";
import "src/main.css";

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
