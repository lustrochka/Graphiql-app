import { AppProps } from "next/app";
import "../styles/globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <main>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </main>
  );
};

export default MyApp;
