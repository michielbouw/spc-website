var mongoose = require('mongoose')
    , User = mongoose.model('User');

module.exports = function () {

    User.remove(function (err) {});
    var user1 = new User(
        {
            is_active: true,
            email: 'contact@mpbeta.nl',
            password: 'admin',
            role: 'admin',
            is_superadmin: true,
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfX3YiOjAsInBhc3N3b3JkIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFkbWluIiwiX2lkIjoiNTRlZTA0ZTI0NWUzNTdiODE0MmIyYWExIn0.wNuBKFgt_cEeyYs1YFqeKJxZZCTT1aCOSv3RKhLtaAA',
            last_login : '2015-02-04T16:46:18.000Z'
        });
    user1.save();

    console.log('fixtures loaded successfully');
};