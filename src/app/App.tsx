import { useCallback, useState } from "react";
import { RouterProvider } from "react-router";
import SplashScreen from "./components/SplashScreen";
import { FeedProvider } from "./context/FeedContext";
import { router } from "./routes";
import { useAppBadge } from "../hooks/useAppBadge";
import { BadgeContext } from "./context/BadgeContext";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const handleSplashFinish = useCallback(() => setShowSplash(false), []);
  const badge = useAppBadge();

  return (
    <BadgeContext.Provider value={badge}>
      <FeedProvider>
        {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
        <RouterProvider router={router} />
      </FeedProvider>
    </BadgeContext.Provider>
  );
}
