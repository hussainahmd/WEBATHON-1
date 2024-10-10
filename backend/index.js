import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

import {router} from './routes/index.js'
import { ENV_VARS } from './config/envVars.js'
import { connectDB } from './config/db.js'

const PORT = ENV_VARS.PORT

dotenv.config();

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/", router);

// for deployment
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error";
	res.status(statusCode).json({
		success: false,
		statusCode,
		message,
	});
});

app.listen(PORT, () => {
	connectDB();
	console.log('Server listening on http://localhost:', PORT);
});