const { users, posts } = require('./db');

class PostController {
  static async addUser(req, res) {
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

      const savedPost = await newPost.save();
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
