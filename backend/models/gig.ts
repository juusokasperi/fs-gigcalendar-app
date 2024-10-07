import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../utils/db';

class Gig extends Model {}

Gig.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  icalId: {
    type: DataTypes.TEXT
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  startTime: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  endTime: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  location: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  source: {
    type: DataTypes.TEXT,
    allowNull: false
  },
}, {
  sequelize,
  underscored: true,
  modelName: 'gig'
});

export default Gig;
