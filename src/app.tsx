import React, { useEffect } from "react";

import { RouterProvider } from "@tanstack/react-router";
import router from "src/app/router";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "src/main";

const App = () => {
  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    window.addEventListener("contextmenu", handleContextMenu);
    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
