// grab the mongoose module
var mongoose = require('mongoose');

// define our model
// module.exports allows us to pass this to other files when it is called

module.exports = mongoose.model('Spelers', {
    divisie: { type: String, default: 'Jupiler League' },
    spelerID: { type: Number },
    spelerNaam: { type: String },
    spelerGeboorteland: { type: String },
    spelerGeboortedatum: { type: String },

    spelerType: { type: String },
    spelerRugnummer: { type: Number },
    spelerPositie: { type: String },
    spelerPhoto: { type: String },

    seizoen: { type: String },

    clubNaam: { type: String },
    clubID: { type: Number },
    aanvangsdatum: { type: String },
    afmelddatum: { type: String },

    editor : {type : String},
    date_edited: { type: Date, default: Date.now, required: true }
});