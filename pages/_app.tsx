import { AppProps } from "next/app";
import React, { createContext } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";

const MyCartContext = createContext({});

const MyProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = React.useState([]);

  return (
    <MyCartContext.Provider value={{ cart, setCart }}>
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
