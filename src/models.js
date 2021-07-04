const Sequelize = require('sequelize');
const dbConfig = require('./config/database');
const usersModel = require('./models/users-model');
const newsModel = require('./models/news-model');
const donatepackagesModel = require('./models/donatepackages-model');
const donateitemsModel = require('./models/donateitems-model');
const guidesModel = require('./models/guides-model');
const guideArticlesModel = require('./models/guidearticles-model');
const donatesModel = require('./models/donates-model');
const picpayGatewayModel = require('./models/picpaygateway-model');
const mercadoPagoGatewayModel = require('./models/mercadopago-model');
const newsCommentsModel = require('./models/newscomments-model');
const forumBoardsModel = require('./models/forumboards-model');
const forumTopicsModel = require('./models/forumtopics-model');
const forumSubtopicsModel = require('./models/forumsubtopics-model');
const forumPostsModel = require('./models/forumposts-model');
const forumCommentsModel = require('./models/forumcomments-model');
const droplistModel = require('./models/droplist-model');
const droplistItemsModel = require('./models/droplistitems-model');

const conn = new Sequelize(dbConfig);

usersModel.init(conn);
newsModel.init(conn);
donatepackagesModel.init(conn);
donateitemsModel.init(conn);
picpayGatewayModel.init(conn);
guidesModel.init(conn);
guideArticlesModel.init(conn);
donatesModel.init(conn);
mercadoPagoGatewayModel.init(conn);
newsCommentsModel.init(conn);
forumBoardsModel.init(conn);
forumTopicsModel.init(conn);
forumSubtopicsModel.init(conn);
forumPostsModel.init(conn);
forumCommentsModel.init(conn);
droplistModel.init(conn);
droplistItemsModel.init(conn);

/**
 * FOREIGN KEYS
 */

usersModel.hasMany(newsModel, { foreignKey: 'id_user' });
usersModel.hasMany(guidesModel, { foreignKey: 'id_user' });
usersModel.hasMany(donatesModel, { foreignKey: 'id_user' });
usersModel.hasMany(newsCommentsModel, { foreignKey: 'id_user' });
usersModel.hasMany(forumBoardsModel, { foreignKey: 'id_user' });
usersModel.hasMany(forumTopicsModel, { foreignKey: 'id_user' });
usersModel.hasMany(forumSubtopicsModel, { foreignKey: 'id_user' });
usersModel.hasMany(forumPostsModel, { foreignKey: 'id_user' });
usersModel.hasMany(forumCommentsModel, { foreignKey: 'id_user' });

forumBoardsModel.belongsTo(usersModel, { foreignKey: 'id_user' });
forumBoardsModel.hasMany(forumTopicsModel, { foreignKey: 'id_board' });

forumTopicsModel.belongsTo(forumBoardsModel, { foreignKey: 'id_board' });
forumTopicsModel.belongsTo(usersModel, { foreignKey: 'id_user' });
forumTopicsModel.hasMany(forumSubtopicsModel, { foreignKey: 'id_topic' });

forumSubtopicsModel.belongsTo(forumTopicsModel, { foreignKey: 'id_topic' });
forumSubtopicsModel.belongsTo(usersModel, { foreignKey: 'id_user' });

forumPostsModel.belongsTo(forumSubtopicsModel, { foreignKey: 'id_subtopic' });
forumPostsModel.belongsTo(usersModel, { foreignKey: 'id_user' });

forumCommentsModel.belongsTo(forumPostsModel, { foreignKey: 'id_post' });
forumCommentsModel.belongsTo(usersModel, { foreignKey: 'id_user' });

donatepackagesModel.hasMany(donateitemsModel, { foreignKey: 'id_package' });
donatepackagesModel.hasMany(donatesModel, { foreignKey: 'id_package' });

donateitemsModel.belongsTo(donatepackagesModel, { foreignKey: 'id_package' });

donatesModel.belongsTo(usersModel, { foreignKey: 'id_user' });
donatesModel.belongsTo(donatepackagesModel, { foreignKey: 'id_package' });

newsModel.belongsTo(usersModel, { foreignKey: 'id_user' });
newsModel.hasMany(newsCommentsModel, { foreignKey: 'id_news' });

newsCommentsModel.belongsTo(newsModel, { foreignKey: 'id_news' });
newsCommentsModel.belongsTo(usersModel, { foreignKey: 'id_user' });

guidesModel.belongsTo(usersModel, { foreignKey: 'id_user' });
guidesModel.hasMany(guideArticlesModel, { foreignKey: 'id_guide' });

guideArticlesModel.belongsTo(guidesModel, { foreignKey: 'id_guide' });
guideArticlesModel.belongsTo(usersModel, { foreignKey: 'id_user' });

droplistModel.hasMany(droplistItemsModel, { foreignKey: 'droplist_id' });
droplistItemsModel.belongsTo(droplistModel, { foreignKey: 'droplist_id' });


module.exports = conn;