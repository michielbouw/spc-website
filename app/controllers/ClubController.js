var mongoose    = require('mongoose');
var ObjectId    = mongoose.Schema.Types.ObjectId;
var Club        = require('../models/club');

module.exports = ClubController = {

    query : function(req, res)
    {
        Club.find().sort({name: 1}).exec(function(err, data) { if (err) res.send(err); res.json(data); });
    },

    get: function(req, res)
    {
        Club.findOne({_slug: req.params._slug}, function(err, data){
            if (err) res.send(err);
            //if (!data) res.sendStatus(404);
            res.json(data);
        });
    },

    post: function(req, res)
    {
        Club.create(req.body, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    },

    put: function(req, res)
    {
        Club.update({
            _id: req.params._slug
        }, req.body, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    },

    delete: function(req, res)
    {
        Club.remove({
            _slug: req.params._slug
        }, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    }
};
