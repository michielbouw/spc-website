// grab the mongoose module
var mongoose = require('mongoose');

// define our model
// module.exports allows us to pass this to other files when it is called

module.exports = mongoose.model('ScoutingData', {
    divisie: { type: String },
    club_name: { type: String },
    club_slug: { type: String, lowercase: true, trim: true },
    //club_id: { type: Number },

    // team data selected items
    team_data: [{
        season: { type: String },
        matches: [{
            wedstrijd_slug: { type: String, lowercase: true, trim: true },
            datum: { type: String },
            thuis: { type: String },
            uit: { type: String },
            eindstand: { type: String },

            opstellingThuisNaam: { type: String },
            opstellingThuisType: { type: String },
            opstellingThuis: {
                1: { type: String }, 2: { type: String }, 3: { type: String }, 4: { type: String }, 5: { type: String },
                6: { type: String }, 7: { type: String }, 8: { type: String }, 9: { type: String }, 10: { type: String },
                11: { type: String }, 12: { type: String }, 13: { type: String }, 14: { type: String }, 15: { type: String },
                16: { type: String }, 17: { type: String }, 18: { type: String }, 19: { type: String }, 20: { type: String },
                21: { type: String }, 22: { type: String }, 23: { type: String }, 24: { type: String }, 25: { type: String },
                26: { type: String }, 27: { type: String }, 28: { type: String }
            },
            opstellingUitNaam: { type: String },
            opstellingUitType: { type: String },
            opstellingUit: {
                1: { type: String }, 2: { type: String }, 3: { type: String }, 4: { type: String }, 5: { type: String },
                6: { type: String }, 7: { type: String }, 8: { type: String }, 9: { type: String }, 10: { type: String },
                11: { type: String }, 12: { type: String }, 13: { type: String }, 14: { type: String }, 15: { type: String },
                16: { type: String }, 17: { type: String }, 18: { type: String }, 19: { type: String }, 20: { type: String },
                21: { type: String }, 22: { type: String }, 23: { type: String }, 24: { type: String }, 25: { type: String },
                26: { type: String }, 27: { type: String }, 28: { type: String }
            },

            opmerking: { type: String },

            date_added: { type: Date, required: true }
        }]
    }],

    // player data selected items
    player_data: [{
        spelerNaam: { type: String },
        spelerNaam_slug: { type: String, lowercase: true, trim: true },
        spelerType: { type: String },
        spelerRugnummer: { type: Number },
        spelerPositie: { type: String },
        spelerGeboortedatum: { type: String },
        spelerNationaliteit: { type: String },
        spelerPhoto: { type: String },
        matches: [{
            season: { type: String },
            match: [{
                wedstrijd_slug: { type: String, lowercase: true, trim: true },
                datum: { type: String },
                thuis: { type: String },
                uit: { type: String },
                eindstand: { type: String },

                positie1: { type: String },
                positie2: { type: String },
                lengte: { type: String },
                snelheid: { type: String },
                explosiviteit: { type: String },
                handelingssnelheid: { type: String },
                atletischVermogen: { type: String },
                wendbaarheid: { type: String },
                duelkracht: { type: String },
                passing: { type: String },
                afronding: { type: String },

                opmerking: { type: String },

                date_added: { type: Date, required: true }
            }]
        }]
    }],

    editor : {type : String},
    date_edited: { type: Date, default: Date.now, required: true }
});