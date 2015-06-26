var mongoose    = require('mongoose');
var ObjectId    = mongoose.Schema.Types.ObjectId;
var TeamData    = require('../models/team_data');

module.exports = TeamDataController = {

    query : function(req, res)
    {
        TeamData.find().sort({club_name: 1}).exec(function(err, data) { if (err) res.send(err); res.json(data); });
    },

    get: function(req, res)
    {
        TeamData.findOne({team_slug: req.params._slug}, function(err, data){
            if (err) res.send(err);
            //if (!data) res.sendStatus(404);
            res.json(data);
        });
    },

    post: function(req, res)
    {
        TeamData.create(req.body, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    },

    put: function(req, res)
    {
        TeamData.update({
            _id: req.params._slug
        }, req.body, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    },

    delete: function(req, res)
    {
        TeamData.remove({
            _id: req.params._slug
        }, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    }
};