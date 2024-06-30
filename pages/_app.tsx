/* eslint-disable no-console */
import { AppProps } from "next/app";
import React, { createContext, useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";
import { io } from "socket.io-client";

import { BASE_URL } from "../lib/constants";

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";

const MyCartContext = createContext({});

const MyProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = React.useState([]);
  const [isReRenderRequired, setIsReRenderRequired] = React.useState(false);
  const socket = io(`${BASE_URL}`);

  useEffect(() => {
    socket.on("newOrder", (data) => {
      console.log("New order placed:", data);
      setIsReRenderRequired(true);
    });

    return () => {
      socket.off("newOrder");
    };
  }, []);

  return (
    <MyCartContext.Provider
      value={{ cart, setCart, isReRenderRequired, setIsReRenderRequired }}
    >
      {children}
    </MyCartContext.Provider>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider>
        <MyProvider>
          {" "}
          <Component {...pageProps} />
        </MyProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};

export { MyCartContext };
