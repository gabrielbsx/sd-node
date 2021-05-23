const { Router } = require('express');
const routes = Router();

const portalController = require('./controllers/portal-controller');
const dashboardController = require('./controllers/dashboard-controller');
const errorController = require('./controllers/error-controller');
const apiController = require('./controllers/api-controller');

const isLoggedMiddleware = require('./middlewares/isLogged-middleware');
const isAdminMiddleware = require('./middlewares/isAdmin-middleware');
const envMiddleware = require('./middlewares/environment-middleware');
const recaptchaMiddleware = require('./middlewares/recaptcha-middleware');

routes.use(envMiddleware);

/**
 * USER
 */

//NOT LOGGED
routes.all('/serverlist/:server', portalController.serverlist);

routes.get('/', portalController.index);
routes.get('/inicio', portalController.index);

routes.get('/guia-do-jogo', portalController.guides);
routes.get('/ranking', portalController.ranking);
routes.get('/ranking-de-jogadores', portalController.rankingplayers);
routes.get('/ranking-de-cidades', portalController.rankingcities);

routes.get('/entrar', isLoggedMiddleware.notLogged, portalController.login);
routes.get('/cadastrar', isLoggedMiddleware.notLogged, portalController.register);
routes.get('/recuperar-conta', isLoggedMiddleware.notLogged, portalController.recovery);

routes.get('/suporte', isLoggedMiddleware.logged, dashboardController.support);
routes.get('/doacoes', isLoggedMiddleware.logged, dashboardController.donate);


routes.post('/login', isLoggedMiddleware.notLogged, recaptchaMiddleware, apiController.login);
routes.post('/register', isLoggedMiddleware.notLogged, recaptchaMiddleware, apiController.register);
routes.post('/recovery', isLoggedMiddleware.notLogged, recaptchaMiddleware, apiController.recovery);

routes.get('/painel-de-controle', isLoggedMiddleware.logged, dashboardController.index);

routes.get('/painel-de-controle/guildmark', isLoggedMiddleware.logged, dashboardController.guildmark);
routes.get('/painel-de-controle/alterar-senha', isLoggedMiddleware.logged, dashboardController.changepassword);
routes.get('/painel-de-controle/suporte', isLoggedMiddleware.logged, dashboardController.support);
routes.get('/painel-de-controle/doacoes', isLoggedMiddleware.logged, dashboardController.donate);


routes.get('/painel-de-controle/noticias', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.news);

routes.get('/painel-de-controle/sair', isLoggedMiddleware.logged, dashboardController.logout);

//routes.get('/painel-de-controle', isLoggedMiddleware.notLogged, dashboardController.index);



//routes.get('/dashboard/login', isLoggedMiddleware.notLogged, userController.login);
//routes.get('/dashboard/recovery', isLoggedMiddleware.notLogged, userController.recovery);
//routes.get('/dashboard/register', isLoggedMiddleware.notLogged, userController.register);

//LOGGED
//routes.get('/dashboard/home', isLoggedMiddleware.logged, dashboardController.home);
//routes.get('/dashboard/change-password', isLoggedMiddleware.logged, dashboardController.changepassword);
//routes.get('/dashboard/recovery-numeric-password', isLoggedMiddleware.logged, dashboardController.recoverynumericpassword);
//routes.get('/dashboard/guildmark', isLoggedMiddleware.logged, dashboardController.guildmark);
//routes.get('/dashboard/ranking-players', isLoggedMiddleware.logged, dashboardController.rankingplayers);
//routes.get('/dashboard/ranking-cities', isLoggedMiddleware.logged, dashboardController.rankingcities);
//routes.get('/dashboard/donate', isLoggedMiddleware.logged, dashboardController.donate);
//routes.get('/dashboard/donate-rules', isLoggedMiddleware.logged, dashboardController.donaterules);
//routes.get('/dashboard/logout', isLoggedMiddleware.logged, userController.logout);


/**
 * API
 */

//routes.post('/dashboard/recovery', recaptchaMiddleware, isLoggedMiddleware.notLogged, apiController.recovery);
//routes.post('/dashboard/register', recaptchaMiddleware, isLoggedMiddleware.notLogged, apiController.register);
//routes.post('/dashboard/login', recaptchaMiddleware, isLoggedMiddleware.notLogged, apiController.login);
//routes.post('/dashboard/guildmark', recaptchaMiddleware, isLoggedMiddleware.logged, apiController.guildmark);
//routes.post('/dashboard/change-password', recaptchaMiddleware, isLoggedMiddleware.logged, apiController.changepassword);



/**
 * ADMIN
 */

//routes.get('/donate-items', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.donateitems);
//routes.get('/dashboard/donate-packages', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.donatepackages);
//routes.get('/dashboard/update-donate-packages/:id', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.changedonatepackage);
//routes.get('/dashboard/list-donate-items/:id', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.listdonateitems);
//routes.get('/dashboard/update-donate-items/:id', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.changedonateitem);
//routes.get('/dashboard/payment-gateway', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.paymentgateway);
//routes.get('/dashboard/update-payment-gateway/:id', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.updatepaymentgateway);

/**
 * API
 */
//routes.post('/dashboard/donate-packages', recaptchaMiddleware, isLoggedMiddleware.logged, isAdminMiddleware, apiController.createdonatepackage);
//routes.post('/dashboard/update-donate-packages/:id', recaptchaMiddleware, isLoggedMiddleware.logged, isAdminMiddleware, apiController.updatedonatepackage);
//routes.post('/dashboard/donate-items', recaptchaMiddleware, isLoggedMiddleware.logged, isAdminMiddleware, apiController.createdonateitem);
//routes.post('/dashboard/update-donate-items', recaptchaMiddleware, isLoggedMiddleware.logged, isAdminMiddleware, apiController.updatedonateitems);
//routes.post('/dashboard/payment-gateway', recaptchaMiddleware, isLoggedMiddleware.logged, isAdminMiddleware, apiController.creategateway);
//routes.post('/dashboard/update-payment-gateway/:id', recaptchaMiddleware, isLoggedMiddleware.logged, isAdminMiddleware, apiController.creategateway);

//routes.get('/dashboard/delete-donate-packages/:id', isLoggedMiddleware.logged, isAdminMiddleware, apiController.deletedonatepackage);
//routes.get('/dashboard/delete-donate-items/:id', isLoggedMiddleware.logged, isAdminMiddleware, apiController.deletedonateitem);


routes.use(errorController.error404);

module.exports = routes;