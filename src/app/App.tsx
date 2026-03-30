import { useCallback, useState } from "react";
import { RouterProvider } from "react-router";
import SplashScreen from "./components/SplashScreen";
import { FeedProvider } from "./context/FeedContext";
import { router } from "./routes";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const handleSplashFinish = useCallback(() => setShowSplash(false), []);

  return (
    <FeedProvider>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      <RouterProvider router={router} />
    </FeedProvider>
  );
}
