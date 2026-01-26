import { createEdgeSpark } from "@edgespark/client";
import "@edgespark/client/styles.css";

// Use relative URL in production (same origin), localhost in development
const getBaseUrl = () => {
  // In production, use relative URL so Nginx proxies to backend
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return ''; // Empty means same origin
  }
  // In development, use localhost:3000
  return "http://localhost:3000";
};

export const client = createEdgeSpark({
  baseUrl: getBaseUrl()
});
