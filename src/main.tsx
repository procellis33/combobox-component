import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@/index.css";
import { ThemeContextProvider } from "@providers/ThemeContextProvider.tsx";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Toaster } from "@components/ui/Sonner.tsx";
import { ThemeSwitch } from "@components/ThemeSwitch.tsx";
import { toast } from "sonner";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  }),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <App />
        <Toaster position={"bottom-left"} />
        <ThemeSwitch />
      </ThemeContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
