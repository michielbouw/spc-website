// grab the mongoose module
var mongoose = require('mongoose');

// define our model
// module.exports allows us to pass this to other files when it is called

module.exports = mongoose.model('Matches', {
    matchID: {type: Number, required: true, unique: true},
    thuisTeamID: {type : Number},
    thuisTeamSlug: {type : String, lowercase: true, trim: true},
    uitTeamID: {type : Number},
    uitTeamSlug: {type : String, lowercase: true, trim: true},
    seizoen: {type : String},
    divisie: {type : String},
    match_info: {
        wedstrijd: {type : String},
        eindstand: {type : String},
        ruststand: {type : String},
        speeldag: {type : String},
        datum: {type : String},
        tijd: {type : String},
        ronde: {type : Number},
        coach_thuis: {type : String},
        coach_uit: {type : String},
        thuis: {type : String},
        uit: {type : String},
        logo_thuis: {type : String},
        logo_uit: {type : String},
        scheids: {type : String},
        blessure_tijd: {
            sec_1ehelft: {type : Number},
            sec_2ehelft: {type : Number},
            blessuretijd_1ehelft: {type : String},
            blessuretijd_2ehelft: {type : String}
        },
        stadion: {type : String},
        toeschouwers: {type : Number}
    },
    extra_uploads: [{
        file: {type : String},
        title: {type : String},
        description: {type : String}
    }],
    editor : {type : String},
    date_edited : {type : Date, default: Date.now, required: true}
});