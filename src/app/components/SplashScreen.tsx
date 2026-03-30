import React, { useEffect, useState } from "react";
import logo from "@/assets/foodie.jpeg";

interface SplashScreenProps {
  onFinish: () => void;
  duration?: number;
}

export default function SplashScreen({
  onFinish,
  duration = 2200,
}: SplashScreenProps) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), duration - 500);
    const doneTimer = setTimeout(() => onFinish(), duration);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [duration, onFinish]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
        transition: "opacity 0.5s ease",
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "all",
      }}
    >
      <style>{`
        @keyframes splash-pop {
          0%   { opacity: 0; transform: scale(0.72); }
          60%  { opacity: 1; transform: scale(1.06); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes splash-slide-up {
          0%   { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .splash-logo {
          animation: splash-pop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .splash-text {
          animation: splash-slide-up 0.4s ease 0.45s both;
        }
        .splash-tagline {
          animation: splash-slide-up 0.4s ease 0.6s both;
        }
      `}</style>

      <img
        className="splash-logo"
        src={logo}
        alt="FoodSocial"
        style={{
          width: 96,
          height: 96,
          borderRadius: 24,
          objectFit: "cover",
          marginBottom: 20,
        }}
      />

      <span
        className="splash-text"
        style={{
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: "-0.5px",
          color: "#030213",
        }}
      >
        FoodSocial
      </span>

      <span
        className="splash-tagline"
        style={{
          fontSize: 13,
          color: "#717182",
          marginTop: 6,
          letterSpacing: "0.2px",
        }}
      >
        Discover · Share · Connect
      </span>
    </div>
  );
}
