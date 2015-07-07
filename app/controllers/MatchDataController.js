var mongoose    = require('mongoose');
var ObjectId    = mongoose.Schema.Types.ObjectId;
var MatchData   = require('../models/match_data');

module.exports = MatchDataController = {

    query : function(req, res)
    {
        MatchData.find().sort({datum: -1}).exec(function(err, data) { if (err) res.send(err); res.json(data); });
    },

    get: function(req, res)
    {
        MatchData.findOne({_id: req.params._id}, function(err, data){
            if (err) res.send(err);
            //if (!data) res.sendStatus(404);
            res.json(data);
        });
    },

    get_byid: function(req, res)
    {
        MatchData.findOne({matchID: req.params._id}, function(err, data){
            if (err) res.send(err);
            //if (!data) res.sendStatus(404);
            res.json(data);
        });
    },

    post: function(req, res)
    {
        MatchData.create(req.body, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    },

    put: function(req, res)
    {
        MatchData.update({
            _id: req.params._id
        }, req.body, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    },

    delete: function(req, res)
    {
        MatchData.remove({
            _id: req.params._id
        }, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    }
};