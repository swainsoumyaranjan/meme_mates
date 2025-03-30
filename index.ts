import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const BOT_TOKEN = process.env.BOT_TOKEN;

// Validate Telegram bot token
if (!BOT_TOKEN) {
  console.error("❌ Telegram bot token not provided. Check your .env file.");
  process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware for logging API requests
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  });

  next();
});

// Async function to start the server
(async () => {
  const server = await registerRoutes(app);

  // Global error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    console.error(err);
  });

  // Development mode: Setup Vite for hot module replacement
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Start the server on the specified port
  const port = PORT; // Uses .env or default to 5000
  server.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`✅ Server running on port ${port}`);
    }
  );
})();

