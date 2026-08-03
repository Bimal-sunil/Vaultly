import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full max-w-xl mx-auto flex flex-col items-center justify-center text-center gap-8 my-auto py-12">
      {/* Glowing Ambient Glow */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-accent/15 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" />

      {/* Main Error Display Card */}
      <div className="w-full border border-light/10 bg-[linear-gradient(145deg,rgba(51,51,51,0.4)_0%,rgba(27,27,27,0.7)_100%)] backdrop-blur-xl rounded-3xl p-8 sm:p-12 flex flex-col items-center gap-6 shadow-2xl relative overflow-hidden group">
        {/* Subtle Accent Glow Corner */}
        <div className="absolute -right-16 -top-16 w-32 h-32 bg-accent/10 rounded-full blur-2xl transition-all duration-500 group-hover:bg-accent/20" />

        {/* Tag Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent small font-medium tracking-wide uppercase">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
          404 • Page Not Found
        </div>

        {/* Stylized 404 Number */}
        <h1 className="text-8xl sm:text-9xl font-bold tracking-tighter bg-gradient-to-br from-accent via-light to-accent/50 bg-clip-text text-transparent select-none drop-shadow-[0_0_35px_rgba(215,255,0,0.2)]">
          404
        </h1>

        {/* Title and Explanation */}
        <div className="flex flex-col gap-2 max-w-md">
          <h2 className="h3 font-semibold text-light">Lost in the Vault?</h2>
          <p className="p text-accent-bg opacity-75">
            The subscription or page you are looking for has vanished into thin
            air, was deleted, or never existed.
          </p>
        </div>

        {/* Primary Action Button */}
        <div className="pt-2">
          <Button label="Go Home" onClick={() => navigate("/")} />
        </div>
      </div>
    </div>
  );
}

export default NotFound;
