/* eslint-disable no-console */
import http from "http";
import express from "express";
import fs from "fs";
import cors from "cors";
import ERROR_RESPONSES from "./errorReponses";
import {
  handleBadMethod,
  handleBadRequest,
  handleInvalidEndpoint,
  handleUnknownError,
} from "./exceptions";

const app = express();
const SERVER_PORT = 3051;
const dbPath = "src/devServer/db/";

app.use(cors());

//--- Exceptions
app.post("/*", async (req, res, next) => {
  handleBadMethod(req, res, next);
});
app.put("/*", async (req, res, next) => {
  handleBadMethod(req, res, next);
});
app.patch("/*", async (req, res, next) => {
  handleBadMethod(req, res, next);
});
app.delete("/*", async (req, res, next) => {
  handleBadMethod(req, res, next);
});
app.get("/", async (req, res, next) => {
  handleBadRequest(req, res, next);
});

//--- Diagnostic
app.get("/health", async (req, res) => {
  res.sendStatus(204);
  console.debug(`[HEALTH] ${new Date()}`);
});

//--- Regular calls
app.get("/normal-range", async (req, res, next) => {
  fs.readFile(dbPath + "normal-response.json", "utf8", (error, jsonFile) => {
    if (error) {
      handleUnknownError(error, req, res, next);
    } else {
      const feedbackMessage = `JSON file "normal-response" sent to host.`;
      res
        .setHeader("Content-Type", "application/json")
        .status(200)
        .json({
          success: true,
          data: JSON.parse(jsonFile),
        });
      console.debug(`[SUCCESS] ${feedbackMessage} ${new Date()}`);
    }
  });
});

app.get("/fixed-range", async (req, res) => {
  res.status(501).json({
    success: false,
    error_code: 501,
  });
  console.debug(
    `[INFO] The requested endpoint has not yet been implemented. ${new Date()}`
  );
});

//--- Other endpoints
app.get("/*", async (req, res, next) => {
  handleInvalidEndpoint(req, res, next);
});

//--- Error handler
app.use((error, req, res, next) => {
  const errorResponse = ERROR_RESPONSES[`error${error.cause}`];
  return res.status(error.cause).json(errorResponse);
});

http.createServer(app).listen(SERVER_PORT, () => {
  console.debug(
    `[INFO] Development server started at ${SERVER_PORT} | ${new Date()}`
  );
});
