var mongoose    = require('mongoose');
var ObjectId    = mongoose.Schema.Types.ObjectId;
var Pages        = require('../models/pages');

module.exports = PagesController = {

    query : function(req, res)
    {
        Pages.find(function (err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    },

    get: function(req, res)
    {
        Pages.findOne({_id: req.params._id}, function(err, data){
            if (err) res.send(err);
            //if (!data) res.sendStatus(404);
            res.json(data);
        });
    },

    post: function(req, res)
    {
        Pages.create(req.body, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    },

    put: function(req, res)
    {
        Pages.update({
            _id: req.params._id
        }, req.body, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    },

    delete: function(req, res)
    {
        Pages.remove({
            _id: req.params._id
        }, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    }
};
