const Sequelize = require('sequelize');
const dbConfig = require('./config/database');
const userModel = require('./models/users-model');
const newsModel = require('./models/news-model');
const donatepackagesModel = require('./models/donatepackages-model');
const donateitemsModel = require('./models/donateitems-model');
const guidesModel = require('./models/guides-model');
const guideArticlesModel = require('./models/guidearticles-model');
const donatesModel = require('./models/donates-model');
const picpayGatewayModel = require('./models/picpaygateway-model');
const mercadoPagoGatewayModel = require('./models/mercadopago-model');
const newsCommentsModel = require('./models/newscomments-model');

const conn = new Sequelize(dbConfig);

userModel.init(conn);
newsModel.init(conn);
donatepackagesModel.init(conn);
donateitemsModel.init(conn);
picpayGatewayModel.init(conn);
guidesModel.init(conn);
guideArticlesModel.init(conn);
donatesModel.init(conn);
mercadoPagoGatewayModel.init(conn);
newsCommentsModel.init(conn);

/**
 * FOREIGN KEYS
 */

userModel.hasMany(newsModel, { foreignKey: 'id_user' });
userModel.hasMany(guidesModel, { foreignKey: 'id_user' });
userModel.hasMany(donatesModel, { foreignKey: 'id_user' });
userModel.hasMany(newsCommentsModel, { foreignKey: 'id_user' });

donatepackagesModel.hasMany(donateitemsModel, { foreignKey: 'id_package' });
donatepackagesModel.hasMany(donatesModel, { foreignKey: 'id_package' });

donateitemsModel.belongsTo(donatepackagesModel, { foreignKey: 'id_package' });

donatesModel.belongsTo(userModel, { foreignKey: 'id_user' });
donatesModel.belongsTo(donatepackagesModel, { foreignKey: 'id_package' });

newsModel.belongsTo(userModel, { foreignKey: 'id_user' });
newsModel.hasMany(newsCommentsModel, { foreignKey: 'id_news' });

newsCommentsModel.belongsTo(newsModel, { foreignKey: 'id_news' });
newsCommentsModel.belongsTo(userModel, { foreignKey: 'id_user' });

guidesModel.belongsTo(userModel, { foreignKey: 'id_user' });
guidesModel.hasMany(guideArticlesModel, { foreignKey: 'id_guide' });

guideArticlesModel.belongsTo(guidesModel, { foreignKey: 'id_guide' });
guideArticlesModel.belongsTo(userModel, { foreignKey: 'id_user' });


module.exports = conn;