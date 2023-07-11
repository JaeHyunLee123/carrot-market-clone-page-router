import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SWRConfig value={{ fetcher }}>
      <div className="w-full max-w-lg mx-auto text-gray-900">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
};

export default MyApp;
