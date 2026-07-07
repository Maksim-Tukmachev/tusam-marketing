"use client";

import { GRAIN_IMAGE } from "@/lib/constants";

export function GrainOverlay() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div
        className="absolute opacity-[0.05] w-[400%] h-[400%] -left-[200%] -top-[200%]"
        style={{
          backgroundImage: `url(${GRAIN_IMAGE})`,
          backgroundRepeat: "repeat",
        }}
      />
    </div>
  );
}
