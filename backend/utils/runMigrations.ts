import { connectToDatabase } from "./db";

const migrate = async () => {
	await connectToDatabase();
	process.exit(0);
};

migrate();
