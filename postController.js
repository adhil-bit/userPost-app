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
      const { userId, postContent } = req.body;
      console.log('userId, postContent', userId, postContent)

      if (!userId || !postContent) {
        throw new Error('Incomplete data for creating a post');
      }
      const existingUser = await users.findOne({ userId }); 
      if (!existingUser) {
        throw new Error('No user found with userId, please enter valid userId');
      }

      const newPost = new posts({
        userId,
        postContent,
      });

      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

}

module.exports = PostController;
