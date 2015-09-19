var mongoose    = require('mongoose');
var ObjectId    = mongoose.Schema.Types.ObjectId;
var Spelers     = require('../models/spelers');

module.exports = SpelersController = {

    query : function(req, res)
    {
        Spelers.find().sort({ clubNaam: 1, spelerNaam: 1, seizoen: 1 }).exec(function(err, data) { if (err) res.send(err); res.json(data); });
    },

    query_club: function(req, res)
    {
        Spelers.find({clubName: req.params._id}, function(err, data){
            if (err) res.send(err);
            //if (!data) res.sendStatus(404);
            res.json(data);
        });
    },

    query_id: function(req, res)
    {
        Spelers.find({spelerID: req.params._id}, function(err, data){
            if (err) res.send(err);
            //if (!data) res.sendStatus(404);
            res.json(data);
        });
    },

    get: function(req, res)
    {
        Spelers.findOne({_id: req.params._id}, function(err, data){
            if (err) res.send(err);
            //if (!data) res.sendStatus(404);
            res.json(data);
        });
    },

    post: function(req, res)
    {
        Spelers.create(req.body, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    },

    put: function(req, res)
    {
        Spelers.update({
            _id: req.params._id
        }, req.body, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    },

    delete: function(req, res)
    {
        Spelers.remove({
            _id: req.params._id
        }, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    }
};
