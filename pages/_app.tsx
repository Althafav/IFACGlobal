import HeadComponent from "@/components/HeadComponent";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Analytics } from '@vercel/analytics/next';
import LayoutComponent from "@/components/Layout/LayoutComponent";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LayoutComponent>
      <Head>
        <HeadComponent />
      </Head>

      <Component {...pageProps} />
      <Analytics />
    </LayoutComponent>
  );
}
