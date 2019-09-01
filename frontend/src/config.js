export default {
  backend_url: process.env.BACKEND_URL || "http://localhost:3001",
  backend_api_endpoint: process.env.BACKEND_API_ENDPOINT || "/api",
  websocket_url:  process.env.WEBSOCKET_URL || "ws://localhost:3001"
};