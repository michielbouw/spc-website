// grab the mongoose module
var mongoose = require('mongoose');

// define our model
// module.exports allows us to pass this to other files when it is called

module.exports = mongoose.model('Pages', {
    home : {
        title : {type : String},
        description : {type : String},
        buttons : [{
            title : {type : String},
            icon : {type : String},
            link : {type : String}
        }]
    },
    over : {
        title : {type : String},
        subtitle : {type : String},
        blocks : [{
            title : {type : String},
            content : {type : String},
            photo : {type : String},
            photo_align : {type : String},
            photo_width : {type : Number}
        }]
    },
    jupiler : {
        title : {type : String},
        subtitle : {type : String},
        blocks : [{
            title : {type : String},
            content : {type : String},
            photo : {type : String},
            photo_align : {type : String},
            photo_width : {type : Number}
        }]
    },
    editor : {type : String},
    date_edited : {type : Date, default: Date.now, required: true}
});