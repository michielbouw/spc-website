var mongoose    = require('mongoose');
var jwt         = require('jsonwebtoken');
var User        = require('../models/user');

module.exports = UserController = {

    login: function (req, res) {
        var email = req.body.email || '';
        var password = req.body.password || '';

        if (email == '' || password == '') {
            return res.send(401);
        }
        User.findOne({email: email, password: password}, function(err, user) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                if (user) {
                    user.last_login = req.body.datetime;
                    user.save();
                    res.json({
                        type: true,
                        data: user,
                        token: user.token
                    });
                } else {
                    res.json({
                        type: false,
                        data: "Incorrect email/password"
                    });
                }
            }
        });
    },

    signin: function(req, res) {
        User.findOne({email: req.body.email, password: req.body.password}, function (err, user) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                if (user) {
                    res.json({
                        type: false,
                        data: "User already exists!"
                    });
                } else {
                    var userModel = new User();
                    userModel.email = req.body.email;
                    userModel.password = req.body.password;
                    userModel.first_name = req.body.first_name;
                    userModel.middle_name = req.body.middle_name;
                    userModel.last_name = req.body.last_name;
                    userModel.last_login = req.body.datetime;
                    userModel.save(function (err, user) {
                        user.token = jwt.sign(user, 'shhhhh');
                        user.save(function (err, user1) {
                            res.json({
                                type: true,
                                data: user1,
                                token: user1.token
                            });
                        });
                    })
                }
            }
        });
    },

    me: function(req, res)
    {
        User.findOne({token: req.token}, function(err, user) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                user.last_login = new Date();
                user.save();
                res.json({
                    type: true,
                    data: user
                });
            }
        });
    },

    // for control over api requests
    ensureAuthorized: function (req, res, next) {
        var bearerToken;
        var bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(" ");
            bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        } else {
            res.sendStatus(403);
        }
    },

    query: function(req, res)
    {
        User.find(function (err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    },

    get: function(req, res)
    {
        User.findOne({
            _id: req.params._id
        }, function(err, data){
            if (err) res.send(err);
            //if (!data) res.sendStatus(404);
            res.json(data);
        });
    },

    put: function(req, res)
    {
        User.update({
            _id: req.params._id
        }, req.body, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    },

    delete: function(req, res)
    {
        User.remove({
            _id: req.params._id
        }, function(err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    }
};