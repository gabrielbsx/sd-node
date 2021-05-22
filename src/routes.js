const { Router } = require('express');
const routes = Router();

const wydController = require('./controllers/wyd-controller');

const homeController = require('./controllers/home-controller');
const userController = require('./controllers/user-controller');
const newsController = require('./controllers/news-controller');
const dashboardController = require('./controllers/dashboard-controller');
const apiController = require('./controllers/api-controller');
const errorController = require('./controllers/error-controller');
const adminController = require('./controllers/admin-controller');

const isLoggedMiddleware = require('./middlewares/isLogged-middleware');
const isAdminMiddleware = require('./middlewares/isAdmin-middleware');
const envMiddleware = require('./middlewares/environment-middleware');
const recaptchaMiddleware = require('./middlewares/recaptcha-middleware');

routes.use(envMiddleware);

/**
 * USER
 */

//NOT LOGGED
routes.all('/serverlist/:server', wydController.serverlist);
routes.use(userController.maintenance);
routes.get('/', isLoggedMiddleware.notLogged, userController.index);


routes.get('/login', isLoggedMiddleware.notLogged, userController.login);
routes.get('/recovery', isLoggedMiddleware.notLogged, userController.recovery);
routes.get('/register', isLoggedMiddleware.notLogged, userController.register);

//LOGGED
routes.get('/home', isLoggedMiddleware.logged, dashboardController.home);
routes.get('/change-password', isLoggedMiddleware.logged, dashboardController.changepassword);
routes.get('/recovery-numeric-password', isLoggedMiddleware.logged, dashboardController.recoverynumericpassword);
routes.get('/guildmark', isLoggedMiddleware.logged, dashboardController.guildmark);
routes.get('/ranking-players', isLoggedMiddleware.logged, dashboardController.rankingplayers);
routes.get('/ranking-cities', isLoggedMiddleware.logged, dashboardController.rankingcities);
routes.get('/donate', isLoggedMiddleware.logged, dashboardController.donate);
routes.get('/donate-rules', isLoggedMiddleware.logged, dashboardController.donaterules);
routes.get('/logout', isLoggedMiddleware.logged, userController.logout);


/**
 * API
 */

routes.post('/recovery', recaptchaMiddleware, isLoggedMiddleware.notLogged, apiController.recovery);
routes.post('/register', recaptchaMiddleware, isLoggedMiddleware.notLogged, apiController.register);
routes.post('/login', recaptchaMiddleware, isLoggedMiddleware.notLogged, apiController.login);
routes.post('/guildmark', recaptchaMiddleware, isLoggedMiddleware.logged, apiController.guildmark);
routes.post('/change-password', recaptchaMiddleware, isLoggedMiddleware.logged, apiController.changepassword);



/**
 * ADMIN
 */

//routes.get('/donate-items', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.donateitems);
routes.get('/donate-packages', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.donatepackages);
routes.get('/update-donate-packages/:id', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.changedonatepackage);
routes.get('/list-donate-items/:id', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.listdonateitems);
routes.get('/update-donate-items/:id', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.changedonateitem);
routes.get('/payment-gateway', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.paymentgateway);
routes.get('/update-payment-gateway/:id', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.updatepaymentgateway);

/**
 * API
 */
routes.post('/donate-packages', recaptchaMiddleware, isLoggedMiddleware.logged, isAdminMiddleware, apiController.createdonatepackage);
routes.post('/update-donate-packages/:id', recaptchaMiddleware, isLoggedMiddleware.logged, isAdminMiddleware, apiController.updatedonatepackage);
routes.get('/delete-donate-packages/:id', isLoggedMiddleware.logged, isAdminMiddleware, apiController.deletedonatepackage);
routes.post('/donate-items', recaptchaMiddleware, isLoggedMiddleware.logged, isAdminMiddleware, apiController.createdonateitem);
routes.post('/update-donate-items', recaptchaMiddleware, isLoggedMiddleware.logged, isAdminMiddleware, apiController.updatedonateitems);
routes.get('/delete-donate-items/:id', isLoggedMiddleware.logged, isAdminMiddleware, apiController.deletedonateitem);
routes.post('/payment-gateway', recaptchaMiddleware, isLoggedMiddleware.logged, isAdminMiddleware, apiController.creategateway);
routes.post('/update-payment-gateway/:id', recaptchaMiddleware, isLoggedMiddleware.logged, isAdminMiddleware, apiController.creategateway);

routes.use(errorController.error404);

module.exports = routes;