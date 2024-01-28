import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "@tanstack/react-router";
import router from "./app/router";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient();

import "src/main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
