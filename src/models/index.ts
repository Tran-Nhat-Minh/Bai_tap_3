import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";
import process from "process";

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const configPath = path.join(__dirname, "../config/config.json");
const config = require(configPath)[env];

interface DB {
  [key: string]: any;
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
}

const db: DB = {} as DB;

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable] as string, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Đọc tất cả các file model trong thư mục hiện tại
fs.readdirSync(__dirname)
  .filter((file: string) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      (file.slice(-3) === ".ts" || file.slice(-3) === ".js") &&
      file.indexOf(".test.") === -1 &&
      file !== "index.ts" &&
      file !== "index.js"
    );
  })
  .forEach((file: string) => {
    // Import model
    const modelPath = path.join(__dirname, file);
    const modelModule = require(modelPath);
    
    // Xử lý cả default export và named export
    const modelInitializer = modelModule.default || modelModule;
    
    if (typeof modelInitializer === 'function') {
      const model = modelInitializer(sequelize, DataTypes);
      db[model.name] = model;
    }
  });

// Thiết lập associations
Object.keys(db).forEach((modelName: string) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;