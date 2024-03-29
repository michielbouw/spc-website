var router = require('express').Router();

// Requires multiparty for uploading
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var ClubController = require('../controllers/ClubController');
var MatchDataController = require('../controllers/MatchDataController');
var MatchesController = require('../controllers/MatchesController');
var PageController = require('../controllers/PageController');
var ScoutingDataController = require('../controllers/ScoutingDataController');
var SpelersController = require('../controllers/SpelersController');
var TeamDataController = require('../controllers/TeamDataController');
var UploadController = require('../controllers/UploadController');
var UserController = require('../controllers/UserController');

// Logging
router.use(function(req, res, next) {
    console.log('[api (v1)]', req.method, req.url);
    next();
});

//router.get('/news',                 NewsController.query);
//router.get('/news/:_slug',          NewsController.get);
//router.post('/news',                UserController.ensureAuthorized, NewsController.post);
//router.put('/news/:_slug',          UserController.ensureAuthorized, NewsController.put);
//router.delete('/news/:_slug',       UserController.ensureAuthorized, NewsController.delete);

router.get('/clubs',                ClubController.query);
router.get('/clubs/:_slug',         UserController.ensureAuthorized, ClubController.get);
router.post('/clubs',               UserController.ensureAuthorized, ClubController.post);
router.put('/clubs/:_slug',         UserController.ensureAuthorized, ClubController.put);
router.delete('/clubs/:_slug',      UserController.ensureAuthorized, ClubController.delete);

router.get('/matches',              UserController.ensureAuthorized, MatchesController.query);
router.get('/matches/:_id',         UserController.ensureAuthorized, MatchesController.query_team);
router.get('/matchesse/:_season',   UserController.ensureAuthorized, MatchesController.query_season);
router.get('/match/:_id',           UserController.ensureAuthorized, MatchesController.get);
router.get('/toeschouwers/:_id',    MatchesController.toeschouwers_get);
router.put('/toeschouwers/:_id',    MatchesController.toeschouwers_put);
router.post('/matches',             UserController.ensureAuthorized, MatchesController.post);
router.put('/match/:_id',           UserController.ensureAuthorized, MatchesController.put);
router.delete('/match/:_id',        UserController.ensureAuthorized, MatchesController.delete);

router.get('/teamdata',             UserController.ensureAuthorized, TeamDataController.query);
router.get('/teamdata/:_slug',      UserController.ensureAuthorized, TeamDataController.get);
router.post('/teamdata',            UserController.ensureAuthorized, TeamDataController.post);
router.put('/teamdata/:_slug',      UserController.ensureAuthorized, TeamDataController.put);
router.delete('/teamdata/:_slug',   UserController.ensureAuthorized, TeamDataController.delete);

router.get('/matchdata',            UserController.ensureAuthorized, MatchDataController.query);
router.get('/matchdata/:_id',       UserController.ensureAuthorized, MatchDataController.get);
router.get('/matchdataid/:_id',     UserController.ensureAuthorized, MatchDataController.get_byid);
router.post('/matchdata',           UserController.ensureAuthorized, MatchDataController.post);
router.put('/matchdata/:_id',       UserController.ensureAuthorized, MatchDataController.put);
router.delete('/matchdata/:_id',    UserController.ensureAuthorized, MatchDataController.delete);
router.delete('/matchdataid/:_id',  UserController.ensureAuthorized, MatchDataController.delete_byid);

router.get('/scoutingdata',         UserController.ensureAuthorized, ScoutingDataController.query);
router.get('/scoutingdata/:_slug',  UserController.ensureAuthorized, ScoutingDataController.get);
router.post('/scoutingdata',        UserController.ensureAuthorized, ScoutingDataController.post);
router.put('/scoutingdata/:_slug',  UserController.ensureAuthorized, ScoutingDataController.put);
router.delete('/scoutingdata/:_slug',UserController.ensureAuthorized, ScoutingDataController.delete);

router.get('/pages',                PageController.query);
router.get('/pages/:_id',           PageController.get);
router.post('/pages',               UserController.ensureAuthorized, PageController.post);
router.put('/pages/:_id',           UserController.ensureAuthorized, PageController.put);
router.delete('/pages/:_id',        UserController.ensureAuthorized, PageController.delete);

router.get('/spelers',              UserController.ensureAuthorized, SpelersController.query);
router.get('/spelersclub/:_id',     UserController.ensureAuthorized, SpelersController.query_club);
router.get('/spelersid/:_id',       UserController.ensureAuthorized, SpelersController.query_id);
router.get('/spelers/:_id',         UserController.ensureAuthorized, SpelersController.get);
router.post('/spelers',             UserController.ensureAuthorized, SpelersController.post);
router.put('/spelers/:_id',         UserController.ensureAuthorized, SpelersController.put);
router.delete('/spelers/:_id',      UserController.ensureAuthorized, SpelersController.delete);

router.post('/media/:slug',         UserController.ensureAuthorized, multipartMiddleware, UploadController.uploadFile);

router.post('/activate/:token',     UserController.activate);
router.post('/login',               UserController.login);
router.post('/signin',              UserController.signin);
router.post('/getaccount',          UserController.get_account);
router.post('/forgot',              UserController.forgot);
router.get('/reset/:token',         UserController.reset);
router.post('/reset/:token',        UserController.reset_password);
router.get('/me',                   UserController.ensureAuthorized, UserController.me);
router.get('/users',                UserController.ensureAuthorized, UserController.query);
router.get('/users/:_id',           UserController.ensureAuthorized, UserController.get);
router.put('/users/:_id',           UserController.ensureAuthorized, UserController.put);
router.delete('/users/:_id',        UserController.ensureAuthorized, UserController.delete);
router.post('/change_password/:_id',UserController.ensureAuthorized, UserController.change_password);

// Global wildcard, catch-all address
router.get('*', function(req,res){
    res.json({error:true, msg:'No way essay'});
});

// Export yo
module.exports = router;