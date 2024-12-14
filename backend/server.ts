import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

import { getVetById, newVet } from "./controllers/vetController";
import { signup, getProfileById } from "./controllers/userController";
import {
	deletePetById,
	editPet,
	getPetById,
	getPets,
	newPet,
} from "./controllers/petController";

const app: Application = express();

app.use(express.json());

app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization"
	);
	next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
	const contentLength = req.headers["content-length"];
	console.log(`\x1b[36m${req.method} ${req.url}\x1b[0m`);
	console.log(
		`Payload Size: ${contentLength ? contentLength + " bytes" : "unknown"}`
	);
	next();
});

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI!);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("MongoDB connection failed:", error);
		process.exit(1);
	}
};

app.get("/api/vets/:id", getVetById);
app.post("/api/vets", newVet);
app.post("/api/users", signup);
app.get("/api/users/:id", getProfileById);
app.get("/api/pets/:id", getPetById);
app.post("/api/mypets", getPets);
app.post("/api/pets", newPet);
app.put("/api/pets", editPet);
app.delete("/api/pets/:id", deletePetById);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
	await connectDB();
	console.log(`Server running on port ${PORT}`);
});
