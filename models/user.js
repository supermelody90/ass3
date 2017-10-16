var mongoose  = require('mongoose');
var BaseModel = require("./baseModel");
var Schema    = mongoose.Schema;
var utility   = require('utility');
var _ = require('lodash');
var bcrypt = require('bcrypt');


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

});

UserSchema.plugin(BaseModel);

UserSchema.virtual('isAdvanced').get(function () {
  // if the score is over 700, then the user is a star
  return this.score > 700 || this.is_star;
});

//authenticate input against record in database
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
      //using bcrypt to compare
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
    });
});

UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.passwordConf, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.passwordConf = hash;
        next();
    });
});


var User = mongoose.model('User', UserSchema);
module.exports = User;
