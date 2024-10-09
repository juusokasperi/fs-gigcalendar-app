import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../utils/db';

interface GigAttributes {
  id?: number,
  icalId: string,
  title: string,
  startTime: string,
  endTime?: string,
  location: string,
  description?: string,
  source: string,
  important?: boolean
};

class Gig extends Model<GigAttributes> implements GigAttributes {
  public id!: number;
  public icalId!: string;
  public title!: string;
  public startTime!: string;
  public endTime?: string;
  public location!: string;
  public description?: string;
  public source!: string;
  public important?: boolean;
}

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
  important: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
}, {
  sequelize,
  underscored: true,
  modelName: 'gig'
});

export default Gig;
