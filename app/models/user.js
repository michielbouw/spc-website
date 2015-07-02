var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

// define our model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', {
    is_active: { type: Boolean, default: false },

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    first_name: { type: String },
    middle_name: { type: String },
    last_name: { type: String },
    photo: { type: String },

    fan_club: { type: String },
    fan_club_slug: { type: String, lowercase: true, trim: true},

    club: { type: String },
    club_slug: {type : String, lowercase: true, trim: true},
    teams: [{
        team: { type: String},
        team_slug: {type : String, lowercase: true, trim: true}
    }],
    speler_id: { type: Number },

    role: { type: String, default: "fan", lowercase: true },
    is_superadmin: { type: Boolean, default: false },
    token: { type: String },

    last_login: { type: Date, required: true },
    number_of_logins: { type: Number, default: 0 },

    visits: [{
        page_url: { type: String },
        count: { type: Number, default: 0 },
        last_visit: { type: Date, default: Date.now }
    }]
});