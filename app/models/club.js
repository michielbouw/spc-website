// grab the mongoose module
var mongoose = require('mongoose');

// define our model
// module.exports allows us to pass this to other files when it is called

module.exports = mongoose.model('Club', {
    _slug: { type: String, required: true, lowercase: true, trim: true, unique: true },

    name: { type: String, required: true },
    email: { type: String },
    spc_package: { type: String, default: 'club' },
    logo: { type : String },
    colors: [{
        color: { type: String },
        refcode: { type: String }
    }],
    teams: [{
        team_name: { type: String, required: true },
        team_slug: { type: String, required: true, lowercase: true, trim: true, unique: true },
        teamID: [{
            ID: { type: Number },
            season: { type: String }
        }],
        coach: { type: String },
        divisie: { type: String },
        contact: [{
            email: { type: String }
        }]
    }],

    editor: { type: String },
    date_edited: { type: Date, default: Date.now, required: true }
});