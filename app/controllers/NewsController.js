//var mongoose    = require('mongoose');
//var ObjectId    = mongoose.Schema.Types.ObjectId;
//var News        = require('../models/news');
//
//module.exports = NewsController = {
//
//    query : function(req, res)
//    {
//        if (req.query.logged_in == 'true') {
//            if (req.query.n_items > 0) {
//                if (req.query.ser_only == 'true') {
//                    News.find({ser_item: true}, null, {sort: {pub_date: -1}}).limit(req.query.n_items).exec(function(err, data) { if (err) res.send(err); res.json(data); } );
//                } else {
//                    News.find({}, null, {sort: {pub_date: -1}}).limit(req.query.n_items).exec(function(err, data) { if (err) res.send(err); res.json(data); } );
//                }
//            } else if (req.query.ser_only == 'true') {
//                News.find({ser_item: true}, null, {sort: {pub_date: -1}}, function (err, data) { if (err) res.send(err); res.json(data); });
//            } else {
//                News.find({}, null, {sort: {pub_date: -1}}, function (err, data) { if (err) res.send(err); res.json(data); });
//            }
//        } else if (req.query.n_items > 0) {
//            if (req.query.ser_only == 'true') {
//                News.find({members_only: false, ser_item: true}, null, {sort: {pub_date: -1}}).limit(req.query.n_items).exec(function(err, data) { if (err) res.send(err); res.json(data); } );
//            } else {
//                News.find({members_only: false}, null, {sort: {pub_date: -1}}).limit(req.query.n_items).exec(function(err, data) { if (err) res.send(err); res.json(data); } );
//            }
//        } else {
//            if (req.query.ser_only == 'true') {
//                News.find({members_only: false, ser_item: true}, null, {sort: {pub_date: -1}}, function (err, data) { if (err) res.send(err); res.json(data); });
//            } else {
//                News.find({members_only: false}, null, {sort: {pub_date: -1}}, function (err, data) { if (err) res.send(err); res.json(data); });
//            }
//        }
//    },
//
//    get: function(req, res)
//    {
//        News.findOne({_slug: req.params._slug}, function(err, data){
//            if (err) res.send(err);
//            //if (!data) res.sendStatus(404);
//            res.json(data);
//        });
//    },
//
//    post: function(req, res)
//    {
//        News.create(req.body, function(err, data) {
//            if (err) res.send(err);
//            res.json(data);
//        });
//    },
//
//    put: function(req, res)
//    {
//        News.update({
//            _slug: req.params._slug
//        }, req.body, function(err, data) {
//            if (err) res.send(err);
//            res.json(data);
//        });
//    },
//
//    delete: function(req, res)
//    {
//        News.remove({
//            _slug: req.params._slug
//        }, function(err, data) {
//            if (err) res.send(err);
//            res.json(data);
//        });
//    }
//};
