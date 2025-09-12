/* eslint-disable no-console */
import app from "./app";
import { Server } from "http";
import mongoose from "mongoose";
import { envVars } from "./app/config/env";

let server: Server;

const startServer = async () => {
  try {
    console.log(envVars.NODE_ENV);
    await mongoose.connect(envVars.DB_URL);
    console.log("Connected to MongoDB");

    server = app.listen(envVars.PORT, () => {
      console.log(`Server running on port ${envVars.PORT} in ${envVars.NODE_ENV} mode`);
    });
  } catch (error) {
    console.error(error);
  }
};
startServer();

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log("❌ Unhandled rejection detected, shutting down...", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("❌ Uncaught exception detected, shutting down...", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});

// Handle termination signals
process.on("SIGTERM", () => {
  console.log("🔴 SIGTERM signal received, shutting down...");
  if (server) {
    server.close(() => {
      process.exit(0);
    });
  }
});

process.on("SIGINT", () => {
  console.log("🔴 SIGINT signal received (Ctrl+C), shutting down...");
  if (server) {
    server.close(() => {
      process.exit(0);
    });
  }
});




/* 
1:Unhandled Promise Rejection: If mongoose.connect fails, the error is caught in the catch block, and an error message is logged to the console. However, since the server start code is inside the try block, if the connection fails, the server will not start.

2:Uncaught Rejection Error: If there is an error during the server startup (e.g., the port is already in use), it will not be caught by the current error handling, and the application may crash. To handle this, you can add an error event listener to the server instance.

3:signal termination (sigterm): If the application receives a termination signal (like SIGTERM), it should close the server and the database connection gracefully. You can handle this by listening for process signals and closing the connections properly.
 */