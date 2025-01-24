import express from "express";
import client from "@repo/db/client";

const app = express();

import router from "./routes";

app.use("/api/v1", router);

export default app;
