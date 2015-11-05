// grab the mongoose module
var mongoose = require('mongoose');

// define our model
// module.exports allows us to pass this to other files when it is called

module.exports = mongoose.model('MatchData', {
    matchID: { type: Number, required: true, unique: true },
    thuisTeamID: { type: Number },
    thuisTeamSlug: {type : String, lowercase: true, trim: true},
    uitTeamID: {type : Number},
    uitTeamSlug: {type : String, lowercase: true, trim: true},
    divisie: { type: String },
    seizoen: { type: String },
    ronde: { type: Number },
    datum: { type: String, required: true },
    wedstrijd: { type: String },
    eindstand: { type: String },

    // players
    spelers_thuisteam: [{
        personID: { type: Number },
        spelerNaam: { type: String },
        spelerGeboortedatum: { type: String },
        spelerNationaliteit: { type: String }
    }],
    spelers_uitteam: [{
        personID: { type: Number },
        spelerNaam: { type: String },
        spelerGeboortedatum: { type: String },
        spelerNationaliteit: { type: String }
    }],
    spelersthuisteam: [{
        personID: { type: Number },
        spelerNaam: { type: String },
        rugnummer: { type: Number },
        spelerPhoto: { type: String },
        spelerGeboortedatum: { type: String },
        spelerNationaliteit: { type: String },
        vervangen: { type: Boolean },
        ingevallen: { type: Boolean }
    }],
    spelersuitteam: [{
        personID: { type: Number },
        spelerNaam: { type: String },
        rugnummer: { type: Number },
        spelerPhoto: { type: String },
        spelerGeboortedatum: { type: String },
        spelerNationaliteit: { type: String },
        vervangen: { type: Boolean },
        ingevallen: { type: Boolean }
    }],
    alle_spelers: [{
        personID: {type: Number},
        teamID: {type: Number},
        geboorteDatum: {type: String},
        nationaliteit: {type: String}
    }],
    thuis_team_leeftijd: {
        leeftijd_basis: {
            jaar: {type: Number},
            dagen: {type: Number}
        },
        leeftijd_bank: {
            jaar: {type: Number},
            dagen: {type: Number}
        }
    },
    uit_team_leeftijd: {
        leeftijd_basis: {
            jaar: {type: Number},
            dagen: {type: Number}
        },
        leeftijd_bank: {
            jaar: {type: Number},
            dagen: {type: Number}
        }
    },

    // main match data
    opstelling: {
        thuis: [{
            personID: { type: Number },
            spelerNaam: { type: String },
            positieID: { type: Number },
            positieNaam: { type: String },
            shirtNummer: { type: Number },
            spelerPhoto: { type: String }
        }],
        thuis_formatie: { type: String },
        uit: [{
            personID: { type: Number },
            spelerNaam: { type: String },
            positieID: { type: Number },
            positieNaam: { type: String },
            shirtNummer: { type: Number },
            spelerPhoto: { type: String }
        }],
        uit_formatie: { type: String }
    },
    overzicht_lineup: [{
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
        }],
        overzicht_eerste_helft_verlenging: [{
            V1: { type: String },
            V2: { type: String },
            V3: { type: String },
            V4: { type: String },
            V5: { type: String }
        }],
        overzicht_tweede_helft_verlenging: [{
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
        thuis: {
            hele_wedstrijd: {type: Number},
            helft_1: {type: Number},
            helft_2: {type: Number},
            kwartier_1: {type: Number},
            kwartier_2: {type: Number},
            kwartier_3: {type: Number},
            kwartier_4: {type: Number},
            kwartier_5: {type: Number},
            kwartier_6: {type: Number}
        },
        uit: {
            hele_wedstrijd: {type: Number},
            helft_1: {type: Number},
            helft_2: {type: Number},
            kwartier_1: {type: Number},
            kwartier_2: {type: Number},
            kwartier_3: {type: Number},
            kwartier_4: {type: Number},
            kwartier_5: {type: Number},
            kwartier_6: {type: Number}
        }
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

    // duel_matrix array setup:
    // 1: { type: String },
    // ..
    // TOTAAL: { type: Number },
    // _row: { type: String }
    //
    // solution is a mixed schema type, just an empty array [{}]

    duel_matrix_hele_wedstrijd: {
        thuis: [{}],
        uit: [{}]
    },
    duel_matrix_hele_wedstrijd_thuis_spelers_uitteam: [{
        personID: { type: Number },
        spelerNaam: { type: String }
    }],
    duel_matrix_hele_wedstrijd_uit_spelers_thuisteam: [{
        personID: { type: Number },
        spelerNaam: { type: String }
    }],
    duel_matrix_eerste_helft: {
        thuis: [{}],
        uit: [{}]
    },
    duel_matrix_eerste_helft_thuis_spelers_uitteam: [{
        personID: { type: Number },
        spelerNaam: { type: String }
    }],
    duel_matrix_eerste_helft_uit_spelers_thuisteam: [{
        personID: { type: Number },
        spelerNaam: { type: String }
    }],
    duel_matrix_tweede_helft: {
        thuis: [{}],
        uit: [{}]
    },
    duel_matrix_tweede_helft_thuis_spelers_uitteam: [{
        personID: { type: Number },
        spelerNaam: { type: String }
    }],
    duel_matrix_tweede_helft_uit_spelers_thuisteam: [{
        personID: { type: Number },
        spelerNaam: { type: String }
    }],
    passes_per_zone: {
        thuis: {
            kort: [{
                zend_zone: { type: Number },
                TOTAAL: { type: Number },
                geslaagd: { type: Number },
                perc: { type: String }
            }],
            middellang: [{
                zend_zone: { type: Number },
                TOTAAL: { type: Number },
                geslaagd: { type: Number },
                perc: { type: String }
            }],
            lang: [{
                zend_zone: { type: Number },
                TOTAAL: { type: Number },
                geslaagd: { type: Number },
                perc: { type: String }
            }]
        },
        uit: {
            kort: [{
                zend_zone: { type: Number },
                TOTAAL: { type: Number },
                geslaagd: { type: Number },
                perc: { type: String }
            }],
            middellang: [{
                zend_zone: { type: Number },
                TOTAAL: { type: Number },
                geslaagd: { type: Number },
                perc: { type: String }
            }],
            lang: [{
                zend_zone: { type: Number },
                TOTAAL: { type: Number },
                geslaagd: { type: Number },
                perc: { type: String }
            }]
        }
    },
    locatie_doelpogingen: {
        thuisTeam: [{
            teamID: { type: Number },
            personID: { type: Number },
            spelerNaam: { type: String },
            rugnummer: { type: Number },
            locationInFieldLength: { type: Number },
            locationInFieldWidth: { type: Number },
            lichaamsdeel: { type: String },
            minuut_tot_string: { type: String },
            type: { type: String }
        }],
        uitTeam: [{
            teamID: { type: Number },
            personID: { type: Number },
            spelerNaam: { type: String },
            rugnummer: { type: Number },
            locationInFieldLength: { type: Number },
            locationInFieldWidth: { type: Number },
            lichaamsdeel: { type: String },
            minuut_tot_string: { type: String },
            type: { type: String }
        }]
    },

    // pass_matrix array setup:
    // ..
    // TOTAAL: { type: Number },
    // _row: { type: String }
    //
    // solution is a mixed schema type, just an empty array [{}]

    pass_matrix_helft1: {
        thuis: {
            passMatrix: [{}],
            passMatrix2: [{
                kort: { type: Number },
                kort_succes: { type: Number },
                kort_perc: { type: String },
                middellang: { type: Number },
                middellang_succes: { type: Number },
                middellang_perc: { type: String },
                lang: { type: Number },
                lang_succes: { type: Number },
                lang_perc: { type: String },
                TOTAAL: { type: Number },
                TOTAAL_succes: { type: Number },
                TOTAAL_perc: { type: String },
                gem_len: { type: String },
                _row: { type: String }
            }]
        },
        uit: {
            passMatrix: [{}],
            passMatrix2: [{
                kort: { type: Number },
                kort_succes: { type: Number },
                kort_perc: { type: String },
                middellang: { type: Number },
                middellang_succes: { type: Number },
                middellang_perc: { type: String },
                lang: { type: Number },
                lang_succes: { type: Number },
                lang_perc: { type: String },
                TOTAAL: { type: Number },
                TOTAAL_succes: { type: Number },
                TOTAAL_perc: { type: String },
                gem_len: { type: String },
                _row: { type: String }
            }]
        }
    },
    pass_matrix_helft1_thuis_spelers: [{
        personID: { type: Number },
        spelerNaam: { type: String }
    }],
    pass_matrix_helft1_uit_spelers: [{
        personID: { type: Number },
        spelerNaam: { type: String }
    }],
    pass_matrix_helft2: {
        thuis: {
            passMatrix: [{}],
            passMatrix2: [{
                kort: { type: Number },
                kort_succes: { type: Number },
                kort_perc: { type: String },
                middellang: { type: Number },
                middellang_succes: { type: Number },
                middellang_perc: { type: String },
                lang: { type: Number },
                lang_succes: { type: Number },
                lang_perc: { type: String },
                TOTAAL: { type: Number },
                TOTAAL_succes: { type: Number },
                TOTAAL_perc: { type: String },
                gem_len: { type: String },
                _row: { type: String }
            }]
        },
        uit: {
            passMatrix: [{}],
            passMatrix2: [{
                kort: { type: Number },
                kort_succes: { type: Number },
                kort_perc: { type: String },
                middellang: { type: Number },
                middellang_succes: { type: Number },
                middellang_perc: { type: String },
                lang: { type: Number },
                lang_succes: { type: Number },
                lang_perc: { type: String },
                TOTAAL: { type: Number },
                TOTAAL_succes: { type: Number },
                TOTAAL_perc: { type: String },
                gem_len: { type: String },
                _row: { type: String }
            }]
        }
    },
    pass_matrix_helft2_thuis_spelers: [{
        personID: { type: Number },
        spelerNaam: { type: String }
    }],
    pass_matrix_helft2_uit_spelers: [{
        personID: { type: Number },
        spelerNaam: { type: String }
    }],
    pass_matrix_kwartier1: {
        thuis: {
            passMatrix: [{}],
            passMatrix2: [{
                kort: { type: Number },
                kort_succes: { type: Number },
                kort_perc: { type: String },
                middellang: { type: Number },
                middellang_succes: { type: Number },
                middellang_perc: { type: String },
                lang: { type: Number },
                lang_succes: { type: Number },
                lang_perc: { type: String },
                TOTAAL: { type: Number },
                TOTAAL_succes: { type: Number },
                TOTAAL_perc: { type: String },
                gem_len: { type: String },
                _row: { type: String }
            }]
        },
        uit: {
            passMatrix: [{}],
            passMatrix2: [{
                kort: { type: Number },
                kort_succes: { type: Number },
                kort_perc: { type: String },
                middellang: { type: Number },
                middellang_succes: { type: Number },
                middellang_perc: { type: String },
                lang: { type: Number },
                lang_succes: { type: Number },
                lang_perc: { type: String },
                TOTAAL: { type: Number },
                TOTAAL_succes: { type: Number },
                TOTAAL_perc: { type: String },
                gem_len: { type: String },
                _row: { type: String }
            }]
        }
    },
    pass_matrix_kwartier1_thuis_spelers: [{
        personID: { type: Number },
        spelerNaam: { type: String }
    }],
    pass_matrix_kwartier1_uit_spelers: [{
        personID: { type: Number },
        spelerNaam: { type: String }
    }],
    pass_matrix_kwartier2: {
        thuis: {
            passMatrix: [{}],
            passMatrix2: [{
                kort: { type: Number },
                kort_succes: { type: Number },
                kort_perc: { type: String },
                middellang: { type: Number },
                middellang_succes: { type: Number },
                middellang_perc: { type: String },
                lang: { type: Number },
                lang_succes: { type: Number },
                lang_perc: { type: String },
                TOTAAL: { type: Number },
                TOTAAL_succes: { type: Number },
                TOTAAL_perc: { type: String },
                gem_len: { type: String },
                _row: { type: String }
            }]
        },
        uit: {
            passMatrix: [{}],
            passMatrix2: [{
                kort: { type: Number },
                kort_succes: { type: Number },
                kort_perc: { type: String },
                middellang: { type: Number },
                middellang_succes: { type: Number },
                middellang_perc: { type: String },
                lang: { type: Number },
                lang_succes: { type: Number },
                lang_perc: { type: String },
                TOTAAL: { type: Number },
                TOTAAL_succes: { type: Number },
                TOTAAL_perc: { type: String },
                gem_len: { type: String },
                _row: { type: String }
            }]
        }
    },
    pass_matrix_kwartier2_thuis_spelers: [{
        personID: { type: Number },
        spelerNaam: { type: String }
    }],
    pass_matrix_kwartier2_uit_spelers: [{
        personID: { type: Number },
        spelerNaam: { type: String }
    }],
    pass_matrix_kwartier3: {
        thuis: {
            passMatrix: [{}],
            passMatrix2: [{
                kort: { type: Number },
                kort_succes: { type: Number },
                kort_perc: { type: String },
                middellang: { type: Number },
                middellang_succes: { type: Number },
                middellang_perc: { type: String },
                lang: { type: Number },
                lang_succes: { type: Number },
                lang_perc: { type: String },
                TOTAAL: { type: Number },
                TOTAAL_succes: { type: Number },
                TOTAAL_perc: { type: String },
                gem_len: { type: String },
                _row: { type: String }
            }]
        },
        uit: {
            passMatrix: [{}],
            passMatrix2: [{
                kort: { type: Number },
                kort_succes: { type: Number },
                kort_perc: { type: String },
                middellang: { type: Number },
                middellang_succes: { type: Number },
                middellang_perc: { type: String },
                lang: { type: Number },
                lang_succes: { type: Number },
                lang_perc: { type: String },
                TOTAAL: { type: Number },
                TOTAAL_succes: { type: Number },
                TOTAAL_perc: { type: String },
                gem_len: { type: String },
                _row: { type: String }
            }]
        }
    },
    pass_matrix_kwartier3_thuis_spelers: [{
        personID: { type: Number },
        spelerNaam: { type: String }
    }],
    pass_matrix_kwartier3_uit_spelers: [{
        personID: { type: Number },
        spelerNaam: { type: String }
    }],
    pass_matrix_kwartier4: {
        thuis: {
            passMatrix: [{}],
            passMatrix2: [{
                kort: { type: Number },
                kort_succes: { type: Number },
                kort_perc: { type: String },
                middellang: { type: Number },
                middellang_succes: { type: Number },
                middellang_perc: { type: String },
                lang: { type: Number },
                lang_succes: { type: Number },
                lang_perc: { type: String },
                TOTAAL: { type: Number },
                TOTAAL_succes: { type: Number },
                TOTAAL_perc: { type: String },
                gem_len: { type: String },
                _row: { type: String }
            }]
        },
        uit: {
            passMatrix: [{}],
            passMatrix2: [{
                kort: { type: Number },
                kort_succes: { type: Number },
                kort_perc: { type: String },
                middellang: { type: Number },
                middellang_succes: { type: Number },
                middellang_perc: { type: String },
                lang: { type: Number },
                lang_succes: { type: Number },
                lang_perc: { type: String },
                TOTAAL: { type: Number },
                TOTAAL_succes: { type: Number },
                TOTAAL_perc: { type: String },
                gem_len: { type: String },
                _row: { type: String }
            }]
        }
    },
    pass_matrix_kwartier4_thuis_spelers: [{
        personID: { type: Number },
        spelerNaam: { type: String }
    }],
    pass_matrix_kwartier4_uit_spelers: [{
        personID: { type: Number },
        spelerNaam: { type: String }
    }],
    pass_matrix_kwartier5: {
        thuis: {
            passMatrix: [{}],
            passMatrix2: [{
                kort: { type: Number },
                kort_succes: { type: Number },
                kort_perc: { type: String },
                middellang: { type: Number },
                middellang_succes: { type: Number },
                middellang_perc: { type: String },
                lang: { type: Number },
                lang_succes: { type: Number },
                lang_perc: { type: String },
                TOTAAL: { type: Number },
                TOTAAL_succes: { type: Number },
                TOTAAL_perc: { type: String },
                gem_len: { type: String },
                _row: { type: String }
            }]
        },
        uit: {
            passMatrix: [{}],
            passMatrix2: [{
                kort: { type: Number },
                kort_succes: { type: Number },
                kort_perc: { type: String },
                middellang: { type: Number },
                middellang_succes: { type: Number },
                middellang_perc: { type: String },
                lang: { type: Number },
                lang_succes: { type: Number },
                lang_perc: { type: String },
                TOTAAL: { type: Number },
                TOTAAL_succes: { type: Number },
                TOTAAL_perc: { type: String },
                gem_len: { type: String },
                _row: { type: String }
            }]
        }
    },
    pass_matrix_kwartier5_thuis_spelers: [{
        personID: { type: Number },
        spelerNaam: { type: String }
    }],
    pass_matrix_kwartier5_uit_spelers: [{
        personID: { type: Number },
        spelerNaam: { type: String }
    }],
    pass_matrix_kwartier6: {
        thuis: {
            passMatrix: [{}],
            passMatrix2: [{
                kort: { type: Number },
                kort_succes: { type: Number },
                kort_perc: { type: String },
                middellang: { type: Number },
                middellang_succes: { type: Number },
                middellang_perc: { type: String },
                lang: { type: Number },
                lang_succes: { type: Number },
                lang_perc: { type: String },
                TOTAAL: { type: Number },
                TOTAAL_succes: { type: Number },
                TOTAAL_perc: { type: String },
                gem_len: { type: String },
                _row: { type: String }
            }]
        },
        uit: {
            passMatrix: [{}],
            passMatrix2: [{
                kort: { type: Number },
                kort_succes: { type: Number },
                kort_perc: { type: String },
                middellang: { type: Number },
                middellang_succes: { type: Number },
                middellang_perc: { type: String },
                lang: { type: Number },
                lang_succes: { type: Number },
                lang_perc: { type: String },
                TOTAAL: { type: Number },
                TOTAAL_succes: { type: Number },
                TOTAAL_perc: { type: String },
                gem_len: { type: String },
                _row: { type: String }
            }]
        }
    },
    pass_matrix_kwartier6_thuis_spelers: [{
        personID: { type: Number },
        spelerNaam: { type: String }
    }],
    pass_matrix_kwartier6_uit_spelers: [{
        personID: { type: Number },
        spelerNaam: { type: String }
    }],

    penalty_visualisatie: [{}],
    overzicht_overtredingen_per_speler: {
        thuis: [{
            personID: { type: Number },
            spelerNaam: { type: String },
            gemaakt: { type: Number },
            ondergaan: { type: Number },
            buitenspel: { type: Number }
        }],
        uit: [{
            personID: { type: Number },
            spelerNaam: { type: String },
            gemaakt: { type: Number },
            ondergaan: { type: Number },
            buitenspel: { type: Number }
        }]
    },
    locatie_overtredingen: {
        thuisTeam: [{
            teamID: { type: Number },
            personID: { type: Number },
            spelerNaam: { type: String },
            rugnummer: { type: Number },
            locationInFieldLength: { type: Number },
            locationInFieldWidth: { type: Number },
            minuut: { type: String }
        }],
        uitTeam: [{
            teamID: { type: Number },
            personID: { type: Number },
            spelerNaam: { type: String },
            rugnummer: { type: Number },
            locationInFieldLength: { type: Number },
            locationInFieldWidth: { type: Number },
            minuut: { type: String }
        }]
    },

    // players stats full
    player_stats_full_thuis: [{
        personID: { type: Number },
        spelerNaam: { type: String },
        spelerType: { type: String },
        spelerRugnummer: { type: Number },
        spelerGeboortedatum: { type: String },
        spelerLeeftijd : { type: Number },
        spelerNationaliteit: { type: String },
        spelerPhoto: { type: String },

        // input data force/change to number type
        // -------------------
        // summary data items:

        // fieldplayer and keeper
        minuten: { type: Number },
        pass_percentage: { type: Number },
        pass_lengte: { type: Number },
        geel: { type: Number },
        rood: { type: Number },
        tweede_geel: { type: Number },
        eigen_doelpunten: { type: Number },
        aantal_acties: { type: Number },
        aantal_aanvallende_duels: { type: Number },
        aantal_aanvallende_duels_gewonnen: { type: Number },
        aantal_verdedigende_duels: { type: Number },
        aantal_verdedigende_duels_gewonnen: { type: Number },
        assists: { type: Number },
        penalties_gescoord: { type: Number },
        penalties_gemist: { type: Number },
        aantal_buitenspel: { type: Number },
        overtredingen_tegen: { type: Number },
        overtredingen_mee: { type: Number },

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

        // ----------------
        // full data items:

        // fieldplayer and keeper
        verdedigende_acties_helft1: {
            verdedigende_duels: { type: Number },
            verdedigende_duels_gewonnen: { type: Number },
            intercepties: { type: Number },
            luchtduels: { type: Number },
            slidingduels: { type: Number },
            staande_duels: { type: Number },
            wegwerken: { type: Number },
            blokkeren_schot: { type: Number }
        },
        verdedigende_acties_helft2: {
            verdedigende_duels: { type: Number },
            verdedigende_duels_gewonnen: { type: Number },
            intercepties: { type: Number },
            luchtduels: { type: Number },
            slidingduels: { type: Number },
            staande_duels: { type: Number },
            wegwerken: { type: Number },
            blokkeren_schot: { type: Number }
        },
        passes_helft1: [{
            aan: { type: Number },
            van: { type: Number },
            personID: { type: Number },
            _row: { type: String }
        }],
        passes_helft2: [{
            aan: { type: Number },
            van: { type: Number },
            personID: { type: Number },
            _row: { type: String }
        }],
        pass_soorten_helft1: {
            kort: { type: Number },
            kort_succes: { type: Number },
            kort_perc: { type: String },
            middellang: { type: Number },
            middellang_succes: { type: Number },
            middellang_perc: { type: String },
            lang: { type: Number },
            lang_succes: { type: Number },
            lang_perc: { type: String },
            TOTAAL: { type: Number },
            TOTAAL_succes: { type: Number },
            TOTAAL_perc: { type: String },
            gem_len: { type: String }
        },
        pass_soorten_helft2: {
            kort: { type: Number },
            kort_succes: { type: Number },
            kort_perc: { type: String },
            middellang: { type: Number },
            middellang_succes: { type: Number },
            middellang_perc: { type: String },
            lang: { type: Number },
            lang_succes: { type: Number },
            lang_perc: { type: String },
            TOTAAL: { type: Number },
            TOTAAL_succes: { type: Number },
            TOTAAL_perc: { type: String },
            gem_len: { type: String }
        },
        locatie_verdedigende_duels: [{
            locationInFieldLength: { type: Number },
            locationInFieldWidth: { type: Number },
            gewonnen: { type: Number },
            duel_type: { type: String }
        }],

        // only fieldplayer
        aanvallende_acties_helft1: {
            aanvallende_duels: { type: Number },
            aanvallende_duels_gewonnen: { type: Number },
            dribbels: { type: Number },
            schoten: { type: Number },
            schoten_doel: { type: Number },
            schoten_ijzer: { type: Number },
            schoten_naast: { type: Number },
            schoten_over: { type: Number },
            schoten_geblokkeerd: { type: Number },
            schoten_binnen16: { type: Number },
            schoten_buiten16: { type: Number },
            sleutel_acties: { type: Number },
            sleutel_passes: { type: Number },
            kruisballen: { type: Number }
        },
        aanvallende_acties_helft2: {
            aanvallende_duels: { type: Number },
            aanvallende_duels_gewonnen: { type: Number },
            dribbels: { type: Number },
            schoten: { type: Number },
            schoten_doel: { type: Number },
            schoten_ijzer: { type: Number },
            schoten_naast: { type: Number },
            schoten_over: { type: Number },
            schoten_geblokkeerd: { type: Number },
            schoten_binnen16: { type: Number },
            schoten_buiten16: { type: Number },
            sleutel_acties: { type: Number },
            sleutel_passes: { type: Number },
            kruisballen: { type: Number }
        },
        dode_spel_momenten: {
            ingooien: { type: Number },
            hoekschoppen: { type: Number },
            vrije_trappen: { type: Number },
            vrije_trappen_direct: { type: Number },
            vrije_trappen_indirect: { type: Number }
        },
        locatie_voorzetten: [{
            doelpoging_na_3: { type: Boolean },
            zend_lengte: { type: Number },
            zend_breedte: { type: Number }
        }],
        locatie_aanvallende_duels: [{
            locationInFieldLength: { type: Number },
            locationInFieldWidth: { type: Number },
            gewonnen: { type: Number },
            duel_type: { type: String }
        }],
        locatie_doelpogingen: [{
            locationInFieldLength: { type: Number },
            locationInFieldWidth: { type: Number },
            lichaamsdeel: { type: String },
            minuut_tot_string: { type: String },
            type: { type: String }
        }],

        // only keeper
        locatie_reddingen: [{
            zend_length: { type: Number },
            zend_width: { type: Number },
            ontvang_length: { type: Number },
            ontvang_width: { type: Number },
            actie: { type: String }
        }],
        locatie_uittrappen: [{
            zend_length: { type: Number },
            zend_width: { type: Number },
            ontvang_length: { type: Number },
            ontvang_width: { type: Number },
            teamgenootID: { type: Number },
            teamgenoot: { type: String }
        }]
    }],
    player_stats_full_uit: [{
        personID: { type: Number },
        spelerNaam: { type: String },
        spelerType: { type: String },
        spelerRugnummer: { type: Number },
        spelerGeboortedatum: { type: String },
        spelerLeeftijd : { type: Number },
        spelerNationaliteit: { type: String },
        spelerPhoto: { type: String },

        // input data force/change to number type
        // -------------------
        // summary data items:

        // fieldplayer and keeper
        minuten: { type: Number },
        pass_percentage: { type: Number },
        pass_lengte: { type: Number },
        geel: { type: Number },
        rood: { type: Number },
        tweede_geel: { type: Number },
        eigen_doelpunten: { type: Number },
        aantal_acties: { type: Number },
        aantal_aanvallende_duels: { type: Number },
        aantal_aanvallende_duels_gewonnen: { type: Number },
        aantal_verdedigende_duels: { type: Number },
        aantal_verdedigende_duels_gewonnen: { type: Number },
        assists: { type: Number },
        penalties_gescoord: { type: Number },
        penalties_gemist: { type: Number },
        aantal_buitenspel: { type: Number },
        overtredingen_tegen: { type: Number },
        overtredingen_mee: { type: Number },

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

        // ----------------
        // full data items:

        // fieldplayer and keeper
        verdedigende_acties_helft1: {
            verdedigende_duels: { type: Number },
            verdedigende_duels_gewonnen: { type: Number },
            intercepties: { type: Number },
            luchtduels: { type: Number },
            slidingduels: { type: Number },
            staande_duels: { type: Number },
            wegwerken: { type: Number },
            blokkeren_schot: { type: Number }
        },
        verdedigende_acties_helft2: {
            verdedigende_duels: { type: Number },
            verdedigende_duels_gewonnen: { type: Number },
            intercepties: { type: Number },
            luchtduels: { type: Number },
            slidingduels: { type: Number },
            staande_duels: { type: Number },
            wegwerken: { type: Number },
            blokkeren_schot: { type: Number }
        },
        passes_helft1: [{
            aan: { type: Number },
            van: { type: Number },
            personID: { type: Number },
            _row: { type: String }
        }],
        passes_helft2: [{
            aan: { type: Number },
            van: { type: Number },
            personID: { type: Number },
            _row: { type: String }
        }],
        pass_soorten_helft1: {
            kort: { type: Number },
            kort_succes: { type: Number },
            kort_perc: { type: String },
            middellang: { type: Number },
            middellang_succes: { type: Number },
            middellang_perc: { type: String },
            lang: { type: Number },
            lang_succes: { type: Number },
            lang_perc: { type: String },
            TOTAAL: { type: Number },
            TOTAAL_succes: { type: Number },
            TOTAAL_perc: { type: String },
            gem_len: { type: String }
        },
        pass_soorten_helft2: {
            kort: { type: Number },
            kort_succes: { type: Number },
            kort_perc: { type: String },
            middellang: { type: Number },
            middellang_succes: { type: Number },
            middellang_perc: { type: String },
            lang: { type: Number },
            lang_succes: { type: Number },
            lang_perc: { type: String },
            TOTAAL: { type: Number },
            TOTAAL_succes: { type: Number },
            TOTAAL_perc: { type: String },
            gem_len: { type: String }
        },
        locatie_verdedigende_duels: [{
            locationInFieldLength: { type: Number },
            locationInFieldWidth: { type: Number },
            gewonnen: { type: Number },
            duel_type: { type: String }
        }],

        // only fieldplayer
        aanvallende_acties_helft1: {
            aanvallende_duels: { type: Number },
            aanvallende_duels_gewonnen: { type: Number },
            dribbels: { type: Number },
            schoten: { type: Number },
            schoten_doel: { type: Number },
            schoten_ijzer: { type: Number },
            schoten_naast: { type: Number },
            schoten_over: { type: Number },
            schoten_geblokkeerd: { type: Number },
            schoten_binnen16: { type: Number },
            schoten_buiten16: { type: Number },
            sleutel_acties: { type: Number },
            sleutel_passes: { type: Number },
            kruisballen: { type: Number }
        },
        aanvallende_acties_helft2: {
            aanvallende_duels: { type: Number },
            aanvallende_duels_gewonnen: { type: Number },
            dribbels: { type: Number },
            schoten: { type: Number },
            schoten_doel: { type: Number },
            schoten_ijzer: { type: Number },
            schoten_naast: { type: Number },
            schoten_over: { type: Number },
            schoten_geblokkeerd: { type: Number },
            schoten_binnen16: { type: Number },
            schoten_buiten16: { type: Number },
            sleutel_acties: { type: Number },
            sleutel_passes: { type: Number },
            kruisballen: { type: Number }
        },
        dode_spel_momenten: {
            ingooien: { type: Number },
            hoekschoppen: { type: Number },
            vrije_trappen: { type: Number },
            vrije_trappen_direct: { type: Number },
            vrije_trappen_indirect: { type: Number }
        },
        locatie_voorzetten: [{
            doelpoging_na_3: { type: Boolean },
            zend_lengte: { type: Number },
            zend_breedte: { type: Number }
        }],
        locatie_aanvallende_duels: [{
            locationInFieldLength: { type: Number },
            locationInFieldWidth: { type: Number },
            gewonnen: { type: Number },
            duel_type: { type: String }
        }],
        locatie_doelpogingen: [{
            locationInFieldLength: { type: Number },
            locationInFieldWidth: { type: Number },
            lichaamsdeel: { type: String },
            minuut_tot_string: { type: String },
            type: { type: String }
        }],

        // only keeper
        locatie_reddingen: [{
            zend_length: { type: Number },
            zend_width: { type: Number },
            ontvang_length: { type: Number },
            ontvang_width: { type: Number },
            actie: { type: String }
        }],
        locatie_uittrappen: [{
            zend_length: { type: Number },
            zend_width: { type: Number },
            ontvang_length: { type: Number },
            ontvang_width: { type: Number },
            teamgenootID: { type: Number },
            teamgenoot: { type: String }
        }]
    }],

    date_edited: { type: Date, default: Date.now, required: true }
});