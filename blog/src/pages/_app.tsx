import type { AppProps } from "next/app";
import "./globals.css";

export default function IndexRouter({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Component {...pageProps} />
    </main>
  );
}
