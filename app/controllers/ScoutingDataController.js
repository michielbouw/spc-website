var mongoose        = require('mongoose');
var ScoutingData    = require('../models/scouting_data');

module.exports = ScoutingDataController = {

    query : function(req, res)
    {
        ScoutingData.find().sort({club_name: 1}).exec(function(err, data) { if (err) res.send(err); res.json(data); });
    },

    get: function(req, res)
    {
        ScoutingData.findOne({club_slug: req.params._slug}, function(err, data){
            if (err) res.send(err);
            //if (!data) res.sendStatus(404);
            res.json(data);
        });
    },

    post: function(req, res)
    {
        ScoutingData.create(req.body, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    },

    put: function(req, res)
    {
        ScoutingData.update({
            _id: req.params._slug
        }, req.body, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    },

    delete: function(req, res)
    {
        ScoutingData.remove({
            _id: req.params._slug
        }, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    }
};