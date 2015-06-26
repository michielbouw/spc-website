// grab the mongoose module
var mongoose = require('mongoose');

// define our model
// module.exports allows us to pass this to other files when it is called

module.exports = mongoose.model('TeamData', {
    team_slug: { type: String, required: true, lowercase: true, trim: true, unique: true },
    team_name: { type: String },
    divisie: { type: String },
    club_name: { type: String },
    club_slug: { type: String, lowercase: true, trim: true },

    team_data: [{
        season: { type: String },
        matches: [{
            round: { type: Number },
            matchID: { type: Number }

        }]
    }],
    player_data: [{
        playerID: { type: Number },
        spelerNaam: { type: String },
        spelerType: { type: String },
        matches: [{
            season: { type: String },
            match: [{
                round: { type: Number },
                matchID: { type: Number }

            }]
        }]
    }],

    date_edited: { type: Date, default: Date.now, required: true }
});