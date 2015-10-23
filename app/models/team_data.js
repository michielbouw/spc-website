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
    club_id: { type: Number },

    // team data selected items
    team_data: [{
        season: { type: String },
        matches: [{
            wedstrijd: { type: String },
            datum: { type: String },

            // input data force/change to number type
            ronde: { type: Number },
            matchID: { type: Number },
            doelpunten_voor: { type: Number },
            doelpunten_tegen: { type: Number },
            punten: { type: Number },
            balbezit: { type: Number },
            tot_passes: { type: Number },
            geslaagde_passes: { type: Number },
            lengte_passes: { type: Number},
            doelpogingen: { type: Number },
            gewonnen_duels: { type: Number },
            geel: { type: Number },
            rood: { type: Number },

            // team leeftijd
            team_leeftijd: {
                leeftijd_basis: {
                    jaar: {type: Number},
                    dagen: {type: Number}
                },
                leeftijd_bank: {
                    jaar: {type: Number},
                    dagen: {type: Number}
                }
            },

            // team match log
            match_log: [{
                pub_date: { type: Date, default: Date.now },
                author: { type: String },
                text: { type: String }
            }]
        }]
    }],

    // player data selected items
    player_data: [{
        playerID: { type: Number },
        spelerNaam: { type: String },
        spelerType: { type: String },
        spelerRugnummer: { type: Number },
        spelerPositie: { type: String },
        spelerGeboortedatum: { type: String },
        spelerNationaliteit: { type: String },
        spelerPhoto: { type: String },
        matches: [{
            season: { type: String },
            match: [{
                wedstrijd: { type: String },
                eindstand: { type: String },
                datum: { type: String },

                // input data force/change to number type
                ronde: { type: Number },
                matchID: { type: Number },

                // fieldplayer and keeper
                minuten: { type: Number },
                pass_percentage: { type: Number },
                pass_lengte: { type: Number },
                geel: { type: Number },
                rood: { type: Number },

                // only fieldplayer
                doelpunten: { type: Number },
                aantal_passes: { type: Number },
                geslaagde_passes: { type: Number },
                voorzetten: { type: Number },
                doelpogingen: { type: Number },
                doelpogingen_opdoel: { type: Number },
                aanvallende_duels: { type: Number },
                verdedigende_duels: { type: Number },
                gewonnen_duels: { type: Number },
                intercepties: { type: Number },
                overtredingen: { type: Number },

                // only keeper
                reddingen: { type: Number },
                geslaagde_reddingen: { type: Number },
                korte_passes: { type: Number },
                middellange_passes: { type: Number },
                lange_passes: { type: Number },
                succesvolle_uittrappen: { type: Number },
                gevangen_ballen: { type: Number },
                weggestompte_ballen: { type: Number },
                doelpunten_tegen: { type: Number },

                // leeftijd tijdens wedstrijd
                spelerLeeftijd : { type: Number },

                // match scores review coach
                scores: {
                    score_from_coach: { type: Number },
                    emi: { type: Number },
                    emh: { type: Number }
                },
                // log
                player_log: [{
                    pub_date: { type: Date, default: Date.now },
                    author: { type: String },
                    text: { type: String }
                }]
            }]
        }]
    }],

    date_edited: { type: Date, default: Date.now, required: true }
});