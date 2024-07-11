import { DataTypes, Model } from "sequelize";
import util from "util";
import connectToDB from "./db.js";

const db = await connectToDB("postgresql://postgres:postgres@/animals");

export class Human extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }

  getFullName() {
    return [this.fname, this.lname].join(" ");
  }
}

Human.init(
  {
    human_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    fname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "human",
    sequelize: db,
  }
);

export class Animal extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Animal.init(
  {
    animal_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth_year: {
      type: DataTypes.INTEGER,
    },
  },
  {
    modelName: "animal",
    sequelize: db,
  }
);

Human.hasMany(Animal, { foreignKey: "human_id" });
Animal.belongsTo(Human, { foreignKey: "human_id" });

export default db;
