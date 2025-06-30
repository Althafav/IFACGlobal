import HeadComponent from "@/components/HeadComponent";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Analytics } from '@vercel/analytics/next';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <HeadComponent />
      </Head>

      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
