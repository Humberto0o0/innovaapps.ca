// App routes and top-level providers.
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import AppsPage from "./pages/AppsPage";
import AppDetailPage from "./pages/AppDetailPage";
import { MotionSettingsProvider } from "./context/MotionSettings";

function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash, pathname]);

  return null;
}

export default function App() {
  return (
    <MotionSettingsProvider>
      <BrowserRouter>
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apps" element={<AppsPage />} />
          <Route path="/apps/:slug" element={<AppDetailPage />} />
        </Routes>
      </BrowserRouter>
    </MotionSettingsProvider>
  );
}
