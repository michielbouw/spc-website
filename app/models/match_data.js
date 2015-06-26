// grab the mongoose module
var mongoose = require('mongoose');

// define our model
// module.exports allows us to pass this to other files when it is called

module.exports = mongoose.model('MatchData', {
    matchID: { type: Number, required: true, unique: true },
    thuisTeamID: { type: Number },
    uitTeamID: { type: Number },
    divisie: { type: String },
    season: { type: String },
    ronde: { type: Number },
    datum: { type: String, required: true },
    wedstrijd: { type: String },
    eindstand: { type: String },

    spelers_thuisteam: [{
        personID: { type: Number },
        spelerNaam: { type: String }
    }],
    spelers_uitteam: [{
        personID: { type: Number },
        spelerNaam: { type: String }
    }],
    spelersthuisteam: [{
        personID: { type: Number },
        spelerNaam: { type: String },
        rugnummer: { type: Number }
    }],
    spelersuitteam: [{
        personID: { type: Number },
        spelerNaam: { type: String },
        rugnummer: { type: Number }
    }],

    opstelling: {
        thuis: [{
            personID: { type: Number },
            spelerNaam: { type: String },
            positieID: { type: Number },
            positieNaam: { type: String },
            shirtNummer: { type: Number }
        }],
        thuis_formatie: { type: String },
        uit: [{
            personID: { type: Number },
            spelerNaam: { type: String },
            positieID: { type: Number },
            positieNaam: { type: String },
            shirtNummer: { type: Number }
        }],
        uit_formatie: { type: String }
    },
    overzicht_linup: [{
        V1: { type: String },
        V2: { type: String },
        V3: { type: String },
        V4: { type: String }
    }],
    overzicht_wedstrijd: {
        overzicht: [{
            V1: { type: String },
            V2: { type: String },
            V3: { type: String },
            V4: { type: String },
            V5: { type: String }
        }],
        overzicht_eerste_helft: [{
            V1: { type: String },
            V2: { type: String },
            V3: { type: String },
            V4: { type: String },
            V5: { type: String }
        }],
        overzicht_tweede_helft: [{
            V1: { type: String },
            V2: { type: String },
            V3: { type: String },
            V4: { type: String },
            V5: { type: String }
        }]
    },
    overzicht_wedstrijdstatistieken: [{
        V1: { type: String },
        V2: { type: String },
        V3: { type: String }
    }],
    balbezit: {
        hele_wedstrijd: { type: Number },
        helft_1: { type: Number },
        helft_2: { type: Number },
        kwartier_1: { type: Number },
        kwartier_2: { type: Number },
        kwartier_3: { type: Number },
        kwartier_4: { type: Number },
        kwartier_5: { type: Number },
        kwartier_6: { type: Number }
    },
    overzicht_doelpogingen: [{
        V1: { type: String },
        V2: { type: String },
        V3: { type: String }
    }],
    duel_overzicht: [{
        V1: { type: String },
        V2: { type: String },
        V3: { type: String }
    }],
    overtredingen: [{
        V1: { type: String },
        V2: { type: String },
        V3: { type: String }
    }],
    spelhervattingen: [{
        V1: { type: String },
        V2: { type: String },
        V3: { type: String }
    }],
    passes: [{
        V1: { type: String },
        V2: { type: String },
        V3: { type: String }
    }],

    gemiddelde_posities_helft1: [{
        personID: { type: Number },
        spelerNaam: { type: String },
        rugnummer: { type: Number },
        lengte: { type: Number },
        breedte: { type: Number },
        teamNaam: { type: String }
    }],
    gemiddelde_posities_helft2: [{
        personID: { type: Number },
        spelerNaam: { type: String },
        rugnummer: { type: Number },
        lengte: { type: Number },
        breedte: { type: Number },
        teamNaam: { type: String }
    }],
    gemiddelde_posities_kwartier1: [{
        personID: { type: Number },
        spelerNaam: { type: String },
        rugnummer: { type: Number },
        lengte: { type: Number },
        breedte: { type: Number },
        teamNaam: { type: String }
    }],
    gemiddelde_posities_kwartier2: [{
        personID: { type: Number },
        spelerNaam: { type: String },
        rugnummer: { type: Number },
        lengte: { type: Number },
        breedte: { type: Number },
        teamNaam: { type: String }
    }],
    gemiddelde_posities_kwartier3: [{
        personID: { type: Number },
        spelerNaam: { type: String },
        rugnummer: { type: Number },
        lengte: { type: Number },
        breedte: { type: Number },
        teamNaam: { type: String }
    }],
    gemiddelde_posities_kwartier4: [{
        personID: { type: Number },
        spelerNaam: { type: String },
        rugnummer: { type: Number },
        lengte: { type: Number },
        breedte: { type: Number },
        teamNaam: { type: String }
    }],
    gemiddelde_posities_kwartier5: [{
        personID: { type: Number },
        spelerNaam: { type: String },
        rugnummer: { type: Number },
        lengte: { type: Number },
        breedte: { type: Number },
        teamNaam: { type: String }
    }],
    gemiddelde_posities_kwartier6: [{
        personID: { type: Number },
        spelerNaam: { type: String },
        rugnummer: { type: Number },
        lengte: { type: Number },
        breedte: { type: Number },
        teamNaam: { type: String }
    }],
    duel_matrix_hele_wedstrijd: [{
        thuis: [{
            1: { type: String },
            
            TOTAAL: { type: Number },
            _row: { type: String }
        }],
        uit: [{
            1: { type: String },

            TOTAAL: { type: Number },
            _row: { type: String }
        }]
    }],
    duel_matrix_hele_wedstrijd_thuis_spelers_uitteam: [{
        personID: { type: Number },
        spelerNaam: { type: String }
    }],
    duel_matrix_hele_wedstrijd_uit_spelers_thuisteam: [{
        personID: { type: Number },
        spelerNaam: { type: String }
    }],
    duel_matrix_eerste_helft: [{

    }],
    duel_matrix_eerste_helft_thuis_spelers_uitteam: [{
        personID: { type: Number },
        spelerNaam: { type: String }
    }],
    duel_matrix_eerste_helft_uit_spelers_thuisteam: [{
        personID: { type: Number },
        spelerNaam: { type: String }
    }],
    duel_matrix_tweede_helft: [{

    }],
    duel_matrix_tweede_helft_thuis_spelers_uitteam: [{
        personID: { type: Number },
        spelerNaam: { type: String }
    }],
    duel_matrix_tweede_helft_uit_spelers_thuisteam: [{
        personID: { type: Number },
        spelerNaam: { type: String }
    }],
    passes_per_zone: [{

    }],
    locaties_doelpogingen: [{

    }],
    pass_matrix_helft1: [{

    }],
    pass_matrix_helft1_thuis_spelers: [{

    }],
    pass_matrix_helft1_uit_spelers: [{

    }],
    pass_matrix_helft2: [{

    }],
    pass_matrix_helft2_thuis_spelers: [{

    }],
    pass_matrix_helft2_uit_spelers: [{

    }],
    penalty_visualisatie: [{

    }],
    overzicht_overtredingen_per_speler: {
        thuis: [{

        }],
        uit: [{

        }]
    },
    locatie_overtredingen: {
        thuisTeam: [],
        uitTeam: []
    },

    player_stats_full_thuis: [{
        personID: { type: Number },
        type: { type: String }

    }],
    player_stats_full_uit: [{
        personID: { type: Number },
        type: { type: String }

    }],

    date_edited: { type: Date, default: Date.now, required: true }
});