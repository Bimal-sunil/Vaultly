import React from "react";
import Button from "./Button";

type EmptyStateProps = {
  tagText: string;
  title: React.ReactNode;
  subtitle?: string;
  description: string;
  buttonLabel?: string;
  buttonAction?: () => void;
  is404?: boolean;
};

function EmptyState({
  tagText,
  title,
  subtitle,
  description,
  buttonLabel,
  buttonAction,
  is404 = false,
}: EmptyStateProps) {
  return (
    <div
      className={`relative w-full flex flex-col items-center justify-center text-center gap-6 py-8 mt-2 ${
        is404 ? "max-w-xl mx-auto my-auto py-12" : ""
      }`}
    >
      {/* Glowing Ambient Glow */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none -z-10 animate-pulse ${
          is404
            ? "-top-10 w-72 h-72 bg-accent/15 blur-[100px]"
            : "top-1/2 -translate-y-1/2 w-48 h-48 bg-accent/10 blur-[80px]"
        }`}
      />

      {/* Main Display Card */}
      <div
        className={`w-full border bg-[linear-gradient(145deg,rgba(51,51,51,0.2)_0%,rgba(27,27,27,0.4)_100%)] backdrop-blur-xl rounded-3xl p-8 flex flex-col items-center shadow-xl relative overflow-hidden group ${
          is404 ? "border-light/10 sm:p-12 gap-6" : "border-light/5 gap-5"
        }`}
      >
        {/* Subtle Accent Glow Corner */}
        <div className="absolute -right-16 -top-16 w-32 h-32 bg-accent/5 rounded-full blur-2xl transition-all duration-500 group-hover:bg-accent/10" />

        {/* Tag Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent small font-medium tracking-wide uppercase z-10">
          <span
            className={`w-2 h-2 rounded-full bg-accent ${
              is404 ? "animate-ping" : "animate-pulse"
            }`}
          />
          {tagText}
        </div>

        {/* Title */}
        {is404 ? (
          <h1 className="text-8xl sm:text-9xl font-bold tracking-tighter bg-linear-to-br from-accent via-light to-accent/50 bg-clip-text text-transparent select-none drop-shadow-[0_0_35px_rgba(215,255,0,0.2)] z-10">
            {title}
          </h1>
        ) : (
          <h2 className="text-3xl font-bold tracking-tighter bg-linear-to-br from-accent via-light to-accent/50 bg-clip-text text-transparent select-none drop-shadow-[0_0_20px_rgba(215,255,0,0.15)] z-10">
            {title}
          </h2>
        )}

        {/* Subtitle and Explanation */}
        <div
          className={`flex flex-col gap-2 z-10 ${
            is404 ? "max-w-md" : "max-w-sm"
          }`}
        >
          {subtitle && (
            <h2 className="h3 font-semibold text-light">{subtitle}</h2>
          )}
          <p className="p text-accent-bg opacity-75">{description}</p>
        </div>

        {/* Action Button */}
        {buttonLabel && buttonAction && (
          <div className="pt-2 z-10">
            <Button label={buttonLabel} onClick={buttonAction} />
          </div>
        )}
      </div>
    </div>
  );
}

export default EmptyState;
