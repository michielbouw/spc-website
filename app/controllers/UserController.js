var mongoose    = require('mongoose');
var jwt         = require('jsonwebtoken');
var bcrypt      = require('bcrypt');
var _           = require('underscore');
var User        = require('../models/user');

var mailer      = require('express-mailer');

module.exports = UserController = {

    login: function (req, res) {
        var email = req.body.email || '';
        var password = req.body.password || '';

        if (email == '' || password == '') {
            return res.send(401);
        }
        User.findOne({email: email}, function(err, user) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                if (user) {
                    if (user.is_active) {
                        bcrypt.compare(password, user.password, function (err1, res1) {
                            if (err1) {
                                res.json({
                                    type: false,
                                    data: "An error occured"
                                });
                            } else if (res1) {
                                user.last_login = req.body.datetime;

                                if (req.body.ip_info) {
                                    if (_.filter(user.ip_addresses, {ip_address: req.body.ip_info.ip}, true) && _.filter(user.ip_addresses, {ip_address: req.body.ip_info.ip}, true)[0]) {
                                        _.filter(user.ip_addresses, {ip_address: req.body.ip_info.ip}, true)[0].date = new Date();
                                    } else {
                                        var temp = {};
                                        temp.ip_address = req.body.ip_info.ip;
                                        temp.country_code = req.body.ip_info.country_code;
                                        temp.city = req.body.ip_info.city;
                                        temp.browser = req.body.browser;
                                        temp.date = req.body.datetime;
                                        user.ip_addresses.push(temp);
                                    }
                                }

                                user.number_of_logins += 1;
                                user.save();
                                res.json({
                                    type: true,
                                    data: user,
                                    token: user.token
                                });
                            } else {
                                res.json({
                                    type: false,
                                    data: "Incorrect password"
                                });
                            }
                        });
                    } else {
                        res.json({
                            type: false,
                            data: "Account not activated"
                        });
                    }
                } else {
                    res.json({
                        type: false,
                        data: "Incorrect email"
                    });
                }
            }
        });
    },

    signin: function(req, res) {
        User.findOne({email: req.body.email}, function (err, user) {
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
                    userModel.first_name = req.body.first_name;
                    userModel.middle_name = req.body.middle_name;
                    userModel.last_name = req.body.last_name;
                    userModel.last_login = req.body.datetime;

                    if (req.body.ip_info) {
                        if (_.filter(userModel.ip_addresses, {ip_address: req.body.ip_info.ip}, true) && _.filter(userModel.ip_addresses, {ip_address: req.body.ip_info.ip}, true)[0]) {
                            _.filter(userModel.ip_addresses, {ip_address: req.body.ip_info.ip}, true)[0].date = new Date();
                        } else {
                            var temp = {};
                            temp.ip_address = req.body.ip_info.ip;
                            temp.country_code = req.body.ip_info.country_code;
                            temp.city = req.body.ip_info.city;
                            temp.browser = req.body.browser;
                            temp.date = req.body.datetime;
                            userModel.ip_addresses.push(temp);
                        }
                    }

                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(req.body.password, salt, function(err, hash) {
                            userModel.password = hash;

                            userModel.save(function (err, user) {
                                if (user) {
                                    user.token = jwt.sign(user, 'spc-extra-veilig-voetbalperformancecentre', {algorithm: 'HS256'});
                                    user.save(function (err, user1) {
                                        res.json({
                                            type: true,
                                            data: user1,
                                            token: user1.token
                                        });
                                    });
                                } else {
                                    res.json({
                                        type: false,
                                        data: "User cannot be created"
                                    });
                                }
                            })
                        });
                    });
                }
            }
        });
    },

    get_account: function(req, res) {
        User.findOne({email: req.body.email}, function (err, user) {
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
                    userModel.first_name = req.body.first_name;
                    userModel.middle_name = req.body.middle_name;
                    userModel.last_name = req.body.last_name;
                    userModel.last_login = req.body.datetime;
                    userModel.club = req.body.club;
                    userModel.club_slug = req.body.club_slug;
                    userModel.role = 'technische-staff';

                    if (req.body.ip_info) {
                        if (_.filter(userModel.ip_addresses, {ip_address: req.body.ip_info.ip}, true) && _.filter(userModel.ip_addresses, {ip_address: req.body.ip_info.ip}, true)[0]) {
                            _.filter(userModel.ip_addresses, {ip_address: req.body.ip_info.ip}, true)[0].date = new Date();
                        } else {
                            var temp = {};
                            temp.ip_address = req.body.ip_info.ip;
                            temp.country_code = req.body.ip_info.country_code;
                            temp.city = req.body.ip_info.city;
                            temp.browser = req.body.browser;
                            temp.date = req.body.datetime;
                            userModel.ip_addresses.push(temp);
                        }
                    }

                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(req.body.password, salt, function(err, hash) {
                            userModel.password = hash;

                            userModel.save(function (err, user) {
                                if (user) {
                                    user.token = jwt.sign(user, 'spc-extra-veilig-voetbalperformancecentre', {algorithm: 'HS256'});
                                    user.save(function (err, user1) {
                                        res.mailer.send('mailer/account_request', {
                                            to: 'contact@mpbeta.nl', // REQUIRED. This can be a comma delimited string just like a normal email to field.
                                            subject: 'Er is een account aangemaakt op soccerpc.nl/getaccount', // REQUIRED.
                                            // All additional properties are also passed to the template as local variables.
                                            title: 'Er is een account aangemaakt op soccerpc.nl/getaccount',
                                            user: user1
                                        }, function (err1) {
                                            if (err1) {
                                                // handle error
                                                console.log('Error sending error email\n\n' + err1 + '\n');
                                            } else {
                                                console.log('Email send to administrator');
                                            }
                                        });

                                        res.json({
                                            type: true,
                                            data: user1,
                                            token: user1.token
                                        });
                                    });
                                } else {
                                    res.json({
                                        type: false,
                                        data: "User cannot be created"
                                    });
                                }
                            })
                        });
                    });
                }
            }
        });
    },

    me: function(req, res)
    {
        User.findOne({token: req.token}, '_id email first_name middle_name last_name photo fan_club fan_club_slug club club_slug teams speler_id role is_superadmin visits ip_addresses', function(err, user) {
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
            jwt.verify(req.token, 'spc-extra-veilig-voetbalperformancecentre', {algorithm: 'HS256'}, function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    next();
                }
            });
        } else {
            res.sendStatus(403);
        }
    },

    query: function(req, res)
    {
        //User.find(function (err, data) {
        //    if (err) res.send(err);
        //    res.json(data);
        //});
        if (req.query.club) {
            if (req.query.fans == 'true') {
                User.find().where({club_slug: req.query.club}).where({role: 'fan'}).sort({is_active: -1, role: -1, last_name: 1}).exec(function(err, data) { if (err) res.send(err); res.json(data); });
            } else {
                User.find().where({club_slug: req.query.club}).where('role').ne('fan').sort({is_active: -1, role: -1, last_name: 1}).exec(function(err, data) { if (err) res.send(err); res.json(data); });
            }
        } else if (req.query.fans == 'true') {
            User.find().where({role: 'fan'}).sort({is_active: -1, role: -1, last_name: 1}).exec(function(err, data) { if (err) res.send(err); res.json(data); });
        } else {
            User.find().where('role').ne('fan').sort({is_active: -1, role: -1, last_name: 1}).exec(function(err, data) { if (err) res.send(err); res.json(data); });
        }
    },

    get: function(req, res)
    {
        User.findOne({
            _id: req.params._id
        }, '_id is_active email first_name middle_name last_name photo fan_club fan_club_slug club club_slug teams speler_id role is_superadmin last_login number_of_logins visits ip_addresses', function(err, data){
            if (err) {
                res.send(err);
            } else {
                res.json(data);
            }
        });
    },

    put: function(req, res)
    {
        User.update({
            _id: req.params._id
        }, req.body, function(err, data) {
            if (err) {
                res.send(err);
            } else {
                res.json(data);
            }
        });
    },

    delete: function(req, res)
    {
        User.remove({
            _id: req.params._id
        }, function(err, data) {
            if (err) {
                res.send(err);
            } else {
                res.json(data);
            }
        });
    }
};