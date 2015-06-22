var mongoose = require('mongoose')
    , User = mongoose.model('User')
    , Matches = mongoose.model('Matches');

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

    Matches.remove(function (err) {});
    var match1 = new Matches(
        {
            matchID: 16379,
            thuisTeamID: 1525,
            uitTeamID: 1524,
            thuisTeamSlug: "degraafschap",
            uitTeamSlug: "almerecityfc",
            seizoen: "2014-2015 Play-offs",
            divisie: "Jupiler League",
            match_info: {
                wedstrijd: "De Graafschap - Almere City FC",
                eindstand: "2 - 1",
                ruststand: "0 - 0",
                speeldag: "vrijdag",
                datum: "15-05-2015",
                tijd: "20:45",
                ronde: 2,
                thuis: "De Graafschap",
                uit: "Almere City FC",
                logo_thuis: "De Graafschap.jpg",
                logo_uit: "Almere City FC.jpg",
                scheids: "Martin van den Kerkhof",
                stadion: "Stadion De Vijverberg",
                toeschouwers: 5109
            },
            extra_uploads: [],
            editor: "Michiel Bouw"
        });
    match1.save();

    console.log('fixtures loaded successfully');
};