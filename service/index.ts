import express, { Request, Response } from "express";
import mongoose from "mongoose";
import userRoutes from './src/routes/userRoutes';

const PORT = process.env.PORT || 8000;

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

	app.use('/api/users', userRoutes);

	app.get("/", (req: Request, res: Response) => {
		res.json({ message: "REST service operational" });
	});

	app.listen(PORT, () => console.log("REST service started on port 8000"));
}

start();
