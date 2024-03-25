import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Header from "./Components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
    
    <main className={`font-sans ${inter.variable}`}>
    <Header />
      <Component {...pageProps} />
    </main>
    </>
  );
};

export default api.withTRPC(MyApp);
