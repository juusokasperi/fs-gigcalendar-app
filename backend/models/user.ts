import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../utils/db';

interface UserAttributes {
	id?: number,
	username: string,
	passwordHash: string,
  };

class User extends Model<UserAttributes> implements UserAttributes {
	public id!: number;
	public username!: string;
	public passwordHash!: string;
};

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.TEXT,
	unique: true,
	allowNull: false
  },
  passwordHash: {
    type: DataTypes.TEXT,
    allowNull: false
  },
}, {
  sequelize,
  underscored: true,
  modelName: 'user'
});

export default User;
