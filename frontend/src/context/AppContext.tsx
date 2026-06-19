/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useState, createContext } from "react";
import Toast from "components/Toast";
// import { useQuery } from "react-query";
// import * as apiClient from "@/api-client";
import { Stripe, loadStripe } from "@stripe/stripe-js";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  stripePromise: Promise<string | null>;
};

const AppContext = createContext<AppContext | undefined>(undefined);

const stripePromise = loadStripe(STRIPE_PUB_KEY) as Promise<string | null>;

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  // FIXME: Complete Stripe and api client
  // const { isError } = useQuery("validateToken", apiClient.validateToken,{});

  <AppContext.Provider
    value={{
      showToast: (toastMessage) => {
        setToast(toastMessage);
      },
      isLoggedIn: false,
      stripePromise,
    }}
  >
    {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(undefined)} />}
    {children}
  </AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
