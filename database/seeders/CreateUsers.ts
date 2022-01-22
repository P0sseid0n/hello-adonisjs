import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import User from 'App/Models/User'

export default class CreateUsersSeeder extends BaseSeeder {
	public static developmentOnly = true

	public async run() {
		// Write your database queries inside the run method
		await User.createMany([
			{ email: 'matheuspossidoniom@outlook.com', password: '123', role: 'admin' },
			{ email: 'usuario@outlook.com', password: '123' },
		])
	}
}
