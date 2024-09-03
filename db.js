const mongoose = require('mongoose');
const validator = require('validator');

const MONGO_URI = 'mongodb://127.0.0.1:27017/userPosts';
// const MONGO_URI = 'mongodb+srv://adhildspot:Adhil@123cluster0.z81xrfj.mongodb.net/?retryWrites=true&w=majority';
//'mongodb://127.0.0.1:27017/adhildspot/userPostApp';

mongoose.connect(MONGO_URI, {

})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: 'Invalid email address',
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const postSchema = new mongoose.Schema({
    postTitle: {
      type: String,
      required: true,
    },
    postContent: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
  });  
  const users = mongoose.model("users", userSchema);
  const posts = mongoose.model("userPosts", postSchema);

  module.exports = { users, posts };