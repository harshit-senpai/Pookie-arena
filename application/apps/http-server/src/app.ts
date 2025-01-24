import express from "express";
import { router } from "./routes";
import { adminRoutes } from "./routes/admin.routes";
import { spaceRoutes } from "./routes/space.routes";


app.use('/api/v1', router);

export default app;
