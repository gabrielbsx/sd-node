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
routes.get('/noticia/:slug', portalController.onenews);

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
routes.get('/painel-de-controle/sair', isLoggedMiddleware.logged, dashboardController.logout);


routes.post('/painel-de-controle/alterar-senha', isLoggedMiddleware.logged, apiController.changepassword);
routes.post('/painel-de-controle/guildmark', isLoggedMiddleware.logged, apiController.guildmark);

routes.post('/painel-de-controle/criar-noticia', isLoggedMiddleware.logged, isAdminMiddleware, apiController.createnews);
routes.post('/painel-de-controle/editar-noticia/:slug', isLoggedMiddleware.logged, isAdminMiddleware, apiController.updatenews);

routes.post('/painel-de-controle/criar-guia-do-jogo', isLoggedMiddleware.logged, isAdminMiddleware, apiController.createguide);
routes.post('/painel-de-controle/editar-guia-do-jogo/:slug', isLoggedMiddleware.logged, isAdminMiddleware, apiController.updateguide);

routes.post('/painel-de-controle/criar-pacote-de-doacoes', isLoggedMiddleware.logged, isAdminMiddleware, apiController.createdonatepackage);
routes.post('/painel-de-controle/editar-pacote-de-doacoes/:slug', isLoggedMiddleware.logged, isAdminMiddleware, apiController.updatedonatepackage);

routes.post('/painel-de-controle/adicionar-itens-de-doacoes', isLoggedMiddleware.logged, isAdminMiddleware, apiController.createdonateitems);
routes.post('/painel-de-controle/editar-item-de-doacoes/:slug', isLoggedMiddleware.logged, isAdminMiddleware, apiController.updatedonateitems);

routes.post('/painel-de-controle/efetuar-doacao/:method', isLoggedMiddleware.logged, apiController.createdonate);

routes.post('/painel-de-controle/sistema-de-pagamentos/:method', isLoggedMiddleware.logged, apiController.paymentsystem);

routes.get('/painel-de-controle/noticias', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.listnews);
routes.get('/painel-de-controle/criar-noticia', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.news);
routes.get('/painel-de-controle/editar-noticia/:slug', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.updatenews);
routes.get('/painel-de-controle/deletar-noticia/:slug', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.deletenews);

routes.get('/painel-de-controle/guia-do-jogo', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.guides);
routes.get('/painel-de-controle/criar-guia-do-jogo', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.createguide);
routes.get('/painel-de-controle/editar-guia-do-jogo/:slug', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.updateguide);
routes.get('/painel-de-controle/deletar-guia-do-jogo/:slug', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.deleteguide);

routes.get('/painel-de-controle/pacote-de-doacoes', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.donatepackages);
routes.get('/painel-de-controle/criar-pacote-de-doacoes', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.createdonatepackages);
routes.get('/painel-de-controle/editar-pacote-de-doacoes/:slug', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.updatedonatepackages);
routes.get('/painel-de-controle/deletar-pacote-de-doacoes/:slug', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.deletedonatepackages);

routes.get('/painel-de-controle/adicionar-itens-de-doacoes', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.createdonateitems);
routes.get('/painel-de-controle/editar-item-de-doacoes/:slug', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.updatedonateitems);
routes.get('/painel-de-controle/lista-itens-de-doacoes/:slug', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.listdonateitems);
routes.get('/painel-de-controle/deletar-item-de-doacoes/:slug', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.deletedonateitems);

routes.get('/painel-de-controle/doar/:method/:slug', isLoggedMiddleware.logged, dashboardController.purchase);
routes.get('/painel-de-controle/historico-doacoes', isLoggedMiddleware.logged, dashboardController.historydonate);
routes.get('/painel-de-controle/finalizar-doacao/:id', isLoggedMiddleware.logged, dashboardController.donatedone);

routes.get('/painel-de-controle/sistema-de-pagamentos', isLoggedMiddleware.logged, dashboardController.paymentsystem);
routes.get('/likes/:slug', apiController.likes);

routes.use(errorController.error404);

module.exports = routes;