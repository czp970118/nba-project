/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/news', controller.news.list);
  router.get('/user/getUserInfo', controller.user.getUserInfo);
  router.post('/user/login', controller.user.userLogin);
  router.post('/user/edit', controller.user.userEdit);
  router.get('/user/getUserFavorTeams', controller.user.getUserFavorTeams);
  router.post('/user/favoriteTeams', controller.user.favoriteTeams);
};
