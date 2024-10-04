import type { AppProps } from "next/app";
import { LayoutProvider } from "@/layout/context/layoutcontext";
import { wrapper } from "../store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Layout from "@/layout/layout";
import AuthLayout from "@/layout/AuthLayout";
import "@/styles/globals.css";
import "@/styles/layout/layout.scss";

import { Poppins } from "next/font/google";

const popp = Poppins({
  display: "swap",
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// const raleway = Raleway({
//   display: "swap",
//   variable: "--font-raleway",
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
// });

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AuthLayout>
          <LayoutProvider>
            <main className={`${popp.variable}`}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </main>
          </LayoutProvider>
        </AuthLayout>
      </PersistGate>
    </Provider>
  );
}

export default App;
