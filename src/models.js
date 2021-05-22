const Sequelize = require('sequelize');
const dbConfig = require('./config/database');
const userModel = require('./models/users-model');
const newsModel = require('./models/news-model');
const donatepackagesModel = require('./models/donatepackages-model');
const donateitemsModel = require('./models/donateitems-model');
const paymentGatewayModel = require('./models/paymentgateway-model');

const conn = new Sequelize(dbConfig);

userModel.init(conn);
newsModel.init(conn);
donatepackagesModel.init(conn);
donateitemsModel.init(conn);
paymentGatewayModel.init(conn);

/**
 * FOREIGN KEYS
 */

donatepackagesModel.hasMany(donateitemsModel, { foreignKey: 'id_package' });
donateitemsModel.belongsTo(donatepackagesModel, { foreignKey: 'id_package' });

userModel.hasMany(newsModel, { foreignKey: 'id_user' });
newsModel.belongsTo(userModel, { foreignKey: 'id_user' });

module.exports = conn;