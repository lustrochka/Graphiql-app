import { AppProps } from "next/app";
import "../styles/globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="container">
      <Header />
      <main className="content">
        <Component {...pageProps} />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default MyApp;
