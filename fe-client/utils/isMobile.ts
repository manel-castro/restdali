"use client";

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

// export const getIsMobile = () => window.innerWidth < 600;
export const getIsMobile = () => isMobile;
