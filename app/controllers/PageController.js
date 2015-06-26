var mongoose    = require('mongoose');
var ObjectId    = mongoose.Schema.Types.ObjectId;
var Page        = require('../models/page');

module.exports = PagesController = {

    query : function(req, res)
    {
        Page.find(function (err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    },

    get: function(req, res)
    {
        Page.findOne({_id: req.params._id}, function(err, data){
            if (err) res.send(err);
            //if (!data) res.sendStatus(404);
            res.json(data);
        });
    },

    post: function(req, res)
    {
        Page.create(req.body, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    },

    put: function(req, res)
    {
        Page.update({
            _id: req.params._id
        }, req.body, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    },

    delete: function(req, res)
    {
        Page.remove({
            _id: req.params._id
        }, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    }
};
