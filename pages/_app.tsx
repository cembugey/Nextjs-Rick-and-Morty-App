import "../styles/globals.scss";
import Layout from "../components/Layout";
import type { AppProps } from "next/app";
import { Poppins } from "@next/font/google";

const roboto = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={roboto.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
