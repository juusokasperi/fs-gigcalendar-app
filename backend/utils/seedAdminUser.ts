import bcrypt from 'bcrypt';
import { User } from '../models';

const seedAdminUser = async () => {
	if (!process.env.PASSWORD) {
		console.error('Env variable PASSWORD missing.');
		process.exit(1);
	};

	const passwordHash = await bcrypt.hash(process.env.PASSWORD, 10);
	const adminUser = {
		username: 'admin',
		passwordHash
	};

	const existingUser = await User.findOne({ where: { username: 'admin' } });
	if (existingUser) {
		console.log('Admin user already exists.');
		process.exit(1);
	} else {
		await User.create(adminUser);
		console.log('Admin user succesfully created.');
		process.exit(0);
	};
};

seedAdminUser().catch(err => console.error(err));
