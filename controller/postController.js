const { users, posts } = require('../db');
let nodemailer = require("nodemailer");
// let aws = require("@aws-sdk/client-ses");
const aws = require("aws-sdk");
let { defaultProvider } = require("@aws-sdk/credential-provider-node");


aws.config.update({
  accessKeyId: "accessKeyId",
  secretAccessKey: "secretAccessKey",
  region: "ap-south-1",
});

// Create SES transporter
const transporter = nodemailer.createTransport({
  SES: new aws.SES({ apiVersion: "2010-12-01" }),
});

class PostController {
  static async addUser(req, res) {
    console.log('req')
    try {
      const { name, mobileNo, email } = req.body;
      console.log('name, mobileNo, email', name, mobileNo, email)
      if (!name || !mobileNo || !email ) {
        throw new Error('Incomplete user data');
      }

      const newUser = new users({
        name,
        mobileNo,
        email,
      });

      const savedUser = await newUser.save();
    //   console.log('savedUser', savedUser)
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async sendEmail(req, res) {
    console.log('req', req)
    try {
      let a = await transporter.sendMail({
        from: "dev@dataspot.ae",
        to: "adhil@dataspot.in",
        subject: "Message",
        text: "I hope this message gets sent!",
      });
      console.log('qqqqqqq', a)

      res.status(201).json(a);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async createPost(req, res) {
    try {
      const { userId, postContent,postTitle } = req.body;
      console.log('userId, postContent', userId, postContent)

      if (!userId || !postContent) {
        throw new Error('Incomplete data for creating a post');
      }
    //   const existingUser = await users.findOne({ userId }); 
    //   if (!existingUser) {
    //     throw new Error('No user found with userId, please enter valid userId');
    //   }

      const newPost = new posts({
        userId,
        postTitle,
        postContent,
      });
      console.log('newPost', newPost)


      const savedPost = await newPost.save();
      console.log('savedPost', savedPost)
      res.status(201).json(savedPost);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  static async getPostDetails(req, res) {
    try {
      const { postTitle, postContent } = req.query;
      console.log('name, email, postContent', postTitle, postContent)
      const query = {};
  
      if (postContent) {
        // Assuming postContent is a field in the 'post' collection
        query.postContent = { $regex: new RegExp(postContent, 'i') };
      }
      if (postTitle) {
        // Assuming postContent is a field in the 'post' collection
        query.postTitle = { $regex: new RegExp(postTitle, 'i') };
      }
  
      const postsWithUserDetails = await posts
        .find(query)
        .populate({
          path: 'userId',
          model: 'users', // Assuming 'users' is the correct model name
          select: 'name email',
        })
        .exec();
  
  
      res.status(200).json(postsWithUserDetails);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

}

module.exports = PostController;
