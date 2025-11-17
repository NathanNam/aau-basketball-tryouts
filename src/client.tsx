import { StartClient } from "@tanstack/react-start/client";
import React, { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { initOtel } from "./lib/otel-client";

// Only run in browser environment
if (typeof window !== "undefined") {
  initOtel();
}

hydrateRoot(
  document,
  <StrictMode>
    <StartClient />
  </StrictMode>
);
