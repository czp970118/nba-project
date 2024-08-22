module.exports = app => {
	const team = require('../controllers/team.controller.js');
	const router = require("express").Router();
	router.get('/getAllteams', team.getAllTeams);
	router.get('/getTeamsWithUserId', team.getTeamsWithUserId);
	router.get('/getTeamDetails', team.getTeamDetails);
	router.get('/getTeamsWithoutUserId', team.getTeamsWithoutUserId);
	router.post('/createTeam', team.createTeam);
	router.post('/favoriteTeams', team.favoriteTeams);
	router.post('/editTeam', team.editTeam)
	app.use('/api', router);
};
