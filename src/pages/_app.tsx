import { AppProps } from "next/app";
import "../styles/globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="container">
      <Header />
      <main className="content">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
};

export default MyApp;
