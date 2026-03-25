module.exports = app => {
	const player = require('../controllers/player.controller.js');
	const router = require("express").Router();
	router.get('/getAllPlayers', player.getAllPlayers);
	router.get('/getPlayerDetails', player.getPlayerById);
	router.post('/createPlayer', player.createPlayer);
	router.post('/updatePlayer', player.updatePlayer);
	router.post('/player/removePlayerFromTeam', player.removePlayerFromTeam)
	app.use('/api', router);
};
