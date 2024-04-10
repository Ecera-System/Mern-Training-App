import React, { Suspense, lazy } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./Context/ContextProvider.jsx";
import WebsiteLoader from "./Pages/Shared/Spinner/WebsiteLoader.jsx";

const App = lazy(() => import("./App.jsx"))


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ContextProvider>
          <Suspense fallback={<WebsiteLoader />}>
            <App />
          </Suspense>
        </ContextProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
