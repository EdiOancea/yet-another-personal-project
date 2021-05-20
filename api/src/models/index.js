import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

export default () => {
  const basename = path.basename(__filename);
  const db = {};
  const env = process.env.NODE_ENV || 'development';
  let sequelize;

  if (env === 'production') {
    sequelize = new Sequelize(process.env.DATABASE_URL);
  } else {
    const config = require(`${__dirname}/../config/config.js`)[env];
    sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config
    );
  }

  fs
    .readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0
      && file !== basename
      && file.slice(-3) === '.js'
    )
    .forEach(file => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });

  Object.values(db).forEach(model => {
    if (model.associate) {
      model.associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
};
