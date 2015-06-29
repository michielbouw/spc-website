var mongoose    = require('mongoose');
var ObjectId    = mongoose.Schema.Types.ObjectId;
var Matches     = require('../models/matches');

module.exports = MatchesController = {

    query : function(req, res)
    {
        Matches.find().sort({ seizoen: -1, datum: -1 }).exec(function(err, data) { if (err) res.send(err); res.json(data); });
    },

    query_team : function(req, res)
    {
        Matches.find().or([{ thuisTeamSlug: req.params._id }, { uitTeamSlug: req.params._id }]).exec(function(err, data) { if (err) res.send(err); res.json(data); });
    },

    get: function(req, res)
    {
        Matches.findOne({matchID: req.params._id}, function(err, data){
            if (err) res.send(err);
            //if (!data) res.sendStatus(404);
            res.json(data);
        });
    },

    toeschouwers_get: function(req, res)
    {
        Matches.findOne({_id: req.params._id}, 'match_info.toeschouwers match_info.stadion', function(err, data){
            if (err) res.send(err);
            //if (!data) res.sendStatus(404);
            res.json(data);
        });
    },

    toeschouwers_put: function(req, res)
    {
        Matches.update({
            _id: req.params._id
        }, req.body, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    },

    post: function(req, res)
    {
        Matches.create(req.body, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    },

    put: function(req, res)
    {
        Matches.update({
            _id: req.params._id
        }, req.body, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    },

    delete: function(req, res)
    {
        Matches.remove({
            _id: req.params._id
        }, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    }
};
