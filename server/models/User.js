const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

// import schema from Book.js
// const bookSchema = require('./Book');

const userSchema = new Schema(
  {
    // Holds the username for the account.
    username: {
      type: String,
      required: true,
      unique: true,
    },
    // Holds the email, and checks to make sure it is a valid email address format.
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    // Holds the password
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: false,
    },
    
  },
);


// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
// userSchema.virtual('bookCount').get(function () {
//   return this.savedBooks.length;
// });

const User = model('User', userSchema);

module.exports = User;