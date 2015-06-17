var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

// define our model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', {
    is_active: { type: Boolean, default: false },

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    first_name: { type: String, default: null },
    middle_name: { type: String, default: null },
    last_name: { type: String, default: null },
    photo: { type: String },
    role: { type: String, default: "fan", lowercase: true },
    is_superadmin: { type: Boolean, default: false },
    token: { type: String },

    last_login : {type : Date, required: true}
});