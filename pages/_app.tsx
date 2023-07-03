import "../styles/globals.css";
import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="w-full max-w-lg mx-auto text-gray-900">
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
