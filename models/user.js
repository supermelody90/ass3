var mongoose  = require('mongoose');
var BaseModel = require("./baseModel");
var Schema    = mongoose.Schema;
var utility   = require('utility');
var bcrypt = require('bcrypt');
var _ = require('lodash');

var UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    passwordConf: {
        type: String,
        required: true
    }
    // url: { type: String },
    // profile_image_url: {type: String},
    // location: { type: String },
    // signature: { type: String },
    // profile: { type: String },
    // weibo: { type: String },
    // avatar: { type: String },
    // is_block: {type: Boolean, default: false},
    //
    // score: { type: Number, default: 0 },
    // topic_count: { type: Number, default: 0 },
    // reply_count: { type: Number, default: 0 },
    // follower_count: { type: Number, default: 0 },
    // following_count: { type: Number, default: 0 },
    // collect_tag_count: { type: Number, default: 0 },
    // collect_topic_count: { type: Number, default: 0 },
    // create_at: { type: Date, default: Date.now },
    // update_at: { type: Date, default: Date.now },
    // is_star: { type: Boolean },
    // level: { type: String },
    // active: { type: Boolean, default: false },
    //
    // receive_reply_mail: {type: Boolean, default: false },
    // receive_at_mail: { type: Boolean, default: false },
    // from_wp: { type: Boolean },
    //
    // retrieve_time: {type: Number},
    // retrieve_key: {type: String},
    //
    // accessToken: {type: String}
});

UserSchema.plugin(BaseModel);

UserSchema.virtual('isAdvanced').get(function () {
  // if the score is over 700, then the user is a star
  return this.score > 700 || this.is_star;
});

// UserSchema.index({username: 1}, {unique: true});
// UserSchema.index({email: 1}, {unique: true});
// UserSchema.index({score: -1});
// UserSchema.index({githubId: 1});
// UserSchema.index({accessToken: 1});

//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
