import express, { Request, Response } from "express";
import mongoose from "mongoose";

async function start() {
	try {
		await mongoose.connect("mongodb://localhost:27017/serviceReservation");
		console.log("Database ready");
	} catch (err) {
		console.error("Database connection failed");
		process.exit(1);
	}

	const app = express();
	app.use(express.json());

	app.get("/", (req: Request, res: Response) => {
		res.json({ message: "REST service operational" });
	});

	app.listen(8000, () => console.log("REST service started on port 8000"));
}

start();
