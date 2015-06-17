// grab the mongoose module
var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

// define our model
// module.exports allows us to pass this to other files when it is called

//module.exports = mongoose.model('News', {
//    // prefix essentials with an underscore (like _id or _slug)
//    _slug : {type : String, max : 225, lowercase: true, trim: true, unique : true},
//
//    // model definition
//    title : {type : String, max : 225, required: true},
//    subtitle : {type : String, Default : null, max : 225},
//    photo : {type : String, Default : null},
//    content : {type : String, required: true},
//    author_id : {type : String, required: true},
//    author : {type : String, required: true},
//    author_group : {type : String, Default : null, max : 225},
//    editor : {type : String, required: true},
//    members_only: {type : Boolean, default: false},
//    ser_item: {type : Boolean, default: false},
//    pub_date : {type : Date, required: true},
//    date_edited : {type : Date, default: Date.now, required: true},
//    comments : [{
//        comment_text : {type : String},
//        author_id : {type : String},
//        author_photo : {type : String},
//        author : {type : String},
//        pub_date : {type : Date},
//        date_edited : {type : Date, default: Date.now}
//    }]
//});