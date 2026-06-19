import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContextProvider as AppContextProviderRaw } from "./context/AppContext.tsx";
import { SearchContextProvider } from "./context/SearchContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 0 },
  },
});

const AppContextProvider = AppContextProviderRaw as React.ComponentType<{
  children: React.ReactNode;
}>;

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContextProvider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </AppContextProvider>
  </React.StrictMode>,
);
